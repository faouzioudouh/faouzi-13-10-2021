import { useCallback, useEffect, useRef, useState } from 'react';

import type { OrderbookMessage, ProductsIds } from '../types/orderbook';
import { InitMessageBody, SendMessageBody, SubscribeMessageBody, UnsubscribeMessageBody } from '../types/worker';
/* eslint-disable-next-line import/no-webpack-loader-syntax */
import workerPath from 'file-loader?name=[name].js!../workers/feed-worker';

export const useRealtimeFeed = (realtimeFeedSource: string, updateInterval: number) => {
  const [ready, setIsReady] = useState(false);
  const [rawOrderbook, setRawOrderbook] = useState<OrderbookMessage | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const currentProductsIdsRef = useRef<ProductsIds[]>([]);
  const lastProductsIdsRef = useRef<ProductsIds[]>([]);

  useEffect(() => {
    workerRef.current = new Worker(workerPath);

    workerRef.current.onmessage = (event: MessageEvent<SendMessageBody>) => {
      if (event.data.type === 'ORDERBOOK_UPDATE') {
        setRawOrderbook(event.data.data);
      }

      if (event.data.type === 'READY') {
        setIsReady(event.data.data);
      }
    };

    const message: InitMessageBody = {
      type: 'INIT',
      data: {
        realtimeFeedSource,
        updateInterval,
      },
    };

    workerRef.current.postMessage(message);
  }, [realtimeFeedSource, updateInterval]);

  const subscribeToFeed = useCallback((productsIds: ProductsIds[]) => {
    if (productsIds === currentProductsIdsRef.current) {
      return;
    }

    currentProductsIdsRef.current = productsIds;
    lastProductsIdsRef.current = productsIds;

    const message: SubscribeMessageBody = {
      type: 'SUBSCRIBE',
      data: {
        productsIds,
      },
    };

    workerRef.current?.postMessage(message);
  }, []);

  const unsubscribe = useCallback(() => {
    currentProductsIdsRef.current = [];

    const message: UnsubscribeMessageBody = {
      type: 'UNSUBSCRIBE',
    };

    workerRef.current?.postMessage(message);
  }, []);

  return {
    subscribeToFeed,
    unsubscribe,
    ready,
    rawOrderbook,
    currentProductsIds: currentProductsIdsRef.current,
    lastProductsIds: lastProductsIdsRef.current,
  };
};
