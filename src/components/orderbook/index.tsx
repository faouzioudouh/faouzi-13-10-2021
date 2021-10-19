import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useOrderbook } from '../../hooks/use-orderbook';
import { useRealtimeFeed } from '../../hooks/use-realtime-feed';
import { formatNumber } from '../../utils/number';
import { useElementClientRect } from '../../hooks/use-element-client-rect';
import { useTabVisibility } from '../../hooks/use-tab-visibility';
import { useWindowWidth } from '../../hooks/use-window-width';
import { getConfig } from '../../modules/config';
import { getUpdatesIntervalInMsBasedOnDevicePerformance } from '../../modules/device';
import type { Orderbook as OrderbookType } from '../../types/orderbook';
import { Table } from '../table';
import { Button } from '../button';
import { Inactivity } from '../Inactivity';

import './orderbook.css';

const { realtimeFeedSource } = getConfig();
const UPDATES_INTERVAL_MS = getUpdatesIntervalInMsBasedOnDevicePerformance();

// Used to calculate the available space in the screen
// to know how many rows we can render.
const TABLE_ROW_HEIGHT_PX = 34;

export const Orderbook = () => {
  const tableRef = useRef<HTMLTableSectionElement | null>(null);
  const { height } = useElementClientRect(tableRef);
  const { tabVisible } = useTabVisibility();
  const { isMobile } = useWindowWidth();

  const { rawOrderbook, subscribeToFeed, unsubscribe, ready, currentProductsIds, lastProductsIds } = useRealtimeFeed(
    realtimeFeedSource,
    UPDATES_INTERVAL_MS
  );

  const rowsCount = height / TABLE_ROW_HEIGHT_PX - 1;
  const { spread, orderbook, totalSize } = useOrderbook(rawOrderbook, rowsCount);

  const orderbookToDisplay: OrderbookType | null = useMemo(() => {
    if (isMobile && orderbook) {
      return { ...orderbook, asks: [...orderbook.asks].reverse() };
    }

    return orderbook;
  }, [isMobile, orderbook]);

  const toggleFeed = useCallback(() => {
    if (!currentProductsIds.includes('PI_XBTUSD')) {
      subscribeToFeed(['PI_XBTUSD']);
    } else {
      subscribeToFeed(['PI_ETHUSD']);
    }
  }, [subscribeToFeed, currentProductsIds]);

  const reconnect = useCallback(() => {
    subscribeToFeed(lastProductsIds);
  }, [subscribeToFeed, lastProductsIds]);

  useEffect(() => {
    subscribeToFeed(['PI_XBTUSD']);
  }, [subscribeToFeed]);

  useEffect(() => {
    if (!tabVisible) {
      unsubscribe();
    }
  }, [unsubscribe, tabVisible]);

  return (
    <div className="orderbook">
      <h1 className="title">Order book ({currentProductsIds?.join(', ')})</h1>
      <p className="spread">Spread: {spread !== null ? formatNumber(spread) : null}</p>
      <Table
        ref={tableRef}
        levelsWithTotals={orderbookToDisplay?.bids ?? []}
        totalSize={totalSize}
        hideHeader={isMobile}
        theme="green"
      />
      <Table levelsWithTotals={orderbookToDisplay?.asks ?? []} totalSize={totalSize} theme="red" />
      <footer className="footer">
        <Button onClick={toggleFeed} disabled={!ready}>
          Toggle Feed
        </Button>
      </footer>

      {currentProductsIds.length === 0 ? <Inactivity onReconnect={reconnect} /> : null}
    </div>
  );
};
