import { Level, OrderbookMessage, ProductsIds, SubscriptionMessage } from '../types/orderbook';
import { ReceiveMessageBody } from '../types/worker';

const updateOrRemoveOrderbookLevels = (levels: Level[], patch: Level[]): Level[] =>
  levels.reduce((acc, incoming) => {
    const [incomingPrice, incomingSize] = incoming;

    const matched = acc.find(([price]) => price === incomingPrice);

    // if price level size is Zero remove from it orderbook
    if (matched && incomingSize === 0) {
      return acc.filter((item) => item !== matched);
    }

    // if price level greater than zero remove update the price level size
    if (matched && incomingSize > 0) {
      return acc.map((item) => (item === matched ? incoming : item));
    }

    // if incoming level price is not part of orderbook, add it.
    if (!matched && incomingSize > 0) {
      return [...acc, incoming];
    }

    return acc;
  }, patch);

class RealtimeFeed {
  websocket: WebSocket | null = null;
  updateInterval: number = 2000;
  ready: boolean = false;
  currentProductsIds: ProductsIds[] = [];
  rawOrderbook: OrderbookMessage | null = null;
  realtimeFeedSource: string = '';
  _queue: string[] = [];

  set queue(items: string[]) {
    this._queue = [...this._queue, ...items];
    this.executeQueue();
  }

  get queue() {
    return this._queue;
  }

  init = () => {
    this.websocket = new WebSocket(this.realtimeFeedSource);

    this.websocket.onopen = () => {
      this.ready = true;

      postMessage({ type: 'READY', data: true });
      this.executeQueue();
      this.sendOrderbook();
    };

    this.websocket.onclose = () => {
      this.ready = false;
      postMessage({ type: 'READY', data: false });

      // Reconnect to websocket
      setTimeout(this.init, 1000);
    };

    this.websocket.onerror = () => {
      this.ready = false;
      postMessage({ type: 'READY', data: false });
    };

    this.websocket.onmessage = this.onMessage;
  };

  onMessage = (event: MessageEvent<string>) => {
    const parsedMessage = JSON.parse(event.data);

    if (
      ['book_ui_1', 'book_ui_1_snapshot'].includes(parsedMessage.feed) &&
      this.currentProductsIds.includes(parsedMessage.product_id)
    ) {
      const validOrderbookMessage = parsedMessage as OrderbookMessage;

      // Snapshot message represents the existing state of the entire orderbook.
      if (validOrderbookMessage.feed === 'book_ui_1_snapshot') {
        this.rawOrderbook = validOrderbookMessage;
        postMessage({ type: 'ORDERBOOK_UPDATE', data: this.rawOrderbook });
      } else if (validOrderbookMessage.feed === 'book_ui_1' && this.rawOrderbook) {
        const updatedAsks = updateOrRemoveOrderbookLevels(this.rawOrderbook.asks, validOrderbookMessage.asks);
        const updatedBids = updateOrRemoveOrderbookLevels(this.rawOrderbook.bids, validOrderbookMessage.bids);

        this.rawOrderbook = {
          ...this.rawOrderbook,
          asks: updatedAsks,
          bids: updatedBids,
        };
      }
    }
  };

  subscribeToFeed = (productsIds: ProductsIds[]) => {
    this.unsubscribe();

    const subscribeToFeed: SubscriptionMessage = {
      event: 'subscribe',
      feed: 'book_ui_1',
      product_ids: productsIds,
    };

    this.currentProductsIds = productsIds;
    this.queue = [JSON.stringify(subscribeToFeed)];
  };

  unsubscribe = () => {
    if (this.currentProductsIds.length > 0) {
      const unsubscribeFromFeed: SubscriptionMessage | null = {
        event: 'unsubscribe',
        feed: 'book_ui_1',
        product_ids: this.currentProductsIds,
      };

      this.currentProductsIds = [];
      this.queue = [JSON.stringify(unsubscribeFromFeed)];
    }
  };

  executeQueue = () => {
    if (!this.ready || this.queue.length === 0) {
      return;
    }

    this.queue.forEach((message) => {
      this.websocket?.send(message);
    });

    this._queue = [];
  };

  sendOrderbook = () => {
    setInterval(() => {
      postMessage({ type: 'ORDERBOOK_UPDATE', data: this.rawOrderbook });
    }, this.updateInterval) as unknown as number;
  };
}

const instance = new RealtimeFeed();

onmessage = (event: MessageEvent<ReceiveMessageBody>) => {
  switch (event.data.type) {
    case 'INIT': {
      instance.realtimeFeedSource = event.data.data.realtimeFeedSource;
      instance.updateInterval = event.data.data.updateInterval;

      instance.init();
      break;
    }
    case 'SUBSCRIBE': {
      instance.subscribeToFeed(event.data.data.productsIds);
      break;
    }
    case 'UNSUBSCRIBE': {
      instance.unsubscribe();
      break;
    }
    default: {
      console.error('Unknown event:', event);
    }
  }
};
