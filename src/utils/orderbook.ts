import { Orderbook, OrderbookMessage, LevelWithTotal, Level } from '../types/orderbook';

export const calculateTotal = (levels: Level[]): LevelWithTotal[] =>
  levels.reduce<LevelWithTotal[]>((accumulator, [currentLevelPrice, currentLevelSize]) => {
    const total = accumulator.reduce((acc, [_, currentSize]) => acc + currentSize, currentLevelSize);

    return [...accumulator, [currentLevelPrice, currentLevelSize, total]];
  }, []);

/**
 * To avoid re-sorting the orderbook, make sure you only pass the
 * sorted orderbook to this function.
 */
export const calculateOrderbookLevelsTotals = (orderbook: OrderbookMessage): Orderbook => {
  const askLevels = calculateTotal(orderbook.asks);
  const bidLevels = calculateTotal(orderbook.bids);

  return {
    ...orderbook,
    asks: askLevels,
    bids: bidLevels,
  };
};

export const updateOrRemoveOrderbookLevels = (levels: Level[], patch: Level[]): Level[] =>
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

export const sortOrderbookLevels = (levels: Level[], order: 'asc' | 'desc'): Level[] =>
  levels.sort(([aPrice], [bPrice]) => (order === 'desc' ? bPrice - aPrice : aPrice - bPrice));

export const sortOrderbook = (orderbook: OrderbookMessage): OrderbookMessage => {
  return {
    ...orderbook,
    // lowest ask prices first
    asks: sortOrderbookLevels(orderbook.asks, 'asc'),
    // highest bid prices first
    bids: sortOrderbookLevels(orderbook.bids, 'desc'),
  };
};

/**
 * To avoid re-sorting the orderbook, make sure you only pass the
 * sorted orderbook to this function.
 */
export const calculateSpread = (sortedOrderbook: Orderbook): number => {
  const [highestBid] = sortedOrderbook.bids;
  const [lowestAsk] = sortedOrderbook.asks;

  if (lowestAsk && highestBid) {
    const [highestBidPrice] = highestBid;
    const [lowestAskBidPrice] = lowestAsk;

    return lowestAskBidPrice - highestBidPrice;
  }

  return 0;
};

export const trimOrderbook = (orderbook: OrderbookMessage, limit: number): OrderbookMessage => {
  const trimmedBids = orderbook.bids.slice(0, limit);
  const trimmedAsks = orderbook.asks.slice(0, limit);

  return { ...orderbook, asks: trimmedAsks, bids: trimmedBids };
};

export const getTotalSize = (orderbook: OrderbookMessage): number => {
  const totalSizeBids = orderbook.bids.reduce((acc, [_, size]) => acc + size, 0);
  const totalSizeAsks = orderbook.asks.reduce((acc, [_, size]) => acc + size, 0);

  return totalSizeBids + totalSizeAsks;
};
