import { OrderbookMessage, ProductsIds } from './orderbook';

export interface InitMessageBody {
  type: 'INIT';
  data: {
    realtimeFeedSource: string;
    updateInterval: number;
  };
}

export interface SubscribeMessageBody {
  type: 'SUBSCRIBE';
  data: {
    productsIds: ProductsIds[];
  };
}

export interface UnsubscribeMessageBody {
  type: 'UNSUBSCRIBE';
}

export type ReceiveMessageBody = InitMessageBody | SubscribeMessageBody | UnsubscribeMessageBody;

export interface OrderbookUpdateMessageBody {
  type: 'ORDERBOOK_UPDATE';
  data: OrderbookMessage;
}

export interface ReadyMessageBody {
  type: 'READY';
  data: boolean;
}

export type SendMessageBody = OrderbookUpdateMessageBody | ReadyMessageBody;
