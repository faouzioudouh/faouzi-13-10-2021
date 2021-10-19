type Price = number;
type Size = number;
type Total = number;
export type Level = [Price, Size];
export type LevelWithTotal = [Price, Size, Total];
export type ProductsIds = 'PI_XBTUSD' | 'PI_ETHUSD';

export interface OrderbookMessage {
  asks: Level[];
  bids: Level[];
  feed: 'book_ui_1_snapshot' | 'book_ui_1';
  product_id: ProductsIds;
}

export interface Orderbook {
  asks: LevelWithTotal[];
  bids: LevelWithTotal[];
  feed: 'book_ui_1_snapshot' | 'book_ui_1';
  product_id: ProductsIds;
}

export interface SubscriptionMessage {
  event: 'unsubscribe' | 'subscribe';
  feed: 'book_ui_1_snapshot' | 'book_ui_1';
  product_ids: ProductsIds[];
}

export type SortMap = Record<'bid' | 'ask', 'asc' | 'desc'>;
