import { useEffect, useState } from 'react';

import type { Orderbook, OrderbookMessage } from '../types/orderbook';
import {
  calculateOrderbookLevelsTotals,
  calculateSpread,
  getTotalSize,
  sortOrderbook,
  trimOrderbook,
} from '../utils/orderbook';

export const useOrderbook = (rawOrderbook: OrderbookMessage | null, maxLength: number) => {
  const [orderbookData, setOrderbookData] = useState<{
    orderbook: Orderbook | null;
    spread: number | null;
    totalSize: number;
  }>({
    orderbook: null,
    spread: null,
    totalSize: 0,
  });

  useEffect(() => {
    if (rawOrderbook) {
      const totalSize = getTotalSize(rawOrderbook);
      const sortedOrderbook = sortOrderbook(rawOrderbook);
      const trimmedOrderbook = trimOrderbook(sortedOrderbook, maxLength);
      const orderbook = calculateOrderbookLevelsTotals(trimmedOrderbook);
      const spread = calculateSpread(orderbook);

      setOrderbookData({ orderbook, spread, totalSize });
    }
  }, [rawOrderbook, maxLength]);

  return orderbookData;
};
