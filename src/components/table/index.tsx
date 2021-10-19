import { forwardRef } from 'react';
import type { ReactElement } from 'react';

import type { LevelWithTotal } from '../../types/orderbook';
import { formatNumber, formatPrice } from '../../utils/number';
import { GraphLine } from '../../components/graph-line';
import './table.css';

interface Props {
  levelsWithTotals: LevelWithTotal[];
  theme: 'red' | 'green';
  hideHeader?: boolean;
  totalSize: number;
}

// Adding this multiplies so the graph lines are more visible
// Tick size is not described in the spec, so it was not implemented.
const MULTIPLIER = 100;

export const Table = forwardRef<HTMLTableSectionElement, Props>(
  ({ levelsWithTotals, theme, hideHeader, totalSize }, ref): ReactElement => {
    return (
      <div className={`table-container ${theme}`} ref={ref}>
        <table className="table">
          {!hideHeader ? (
            <thead className="table-head">
              <tr>
                <th>PRICE</th>
                <th>SIZE</th>
                <th>TOTAL</th>
              </tr>
            </thead>
          ) : null}
          <tbody>
            {levelsWithTotals.map(([price, size, total]) => (
              <tr key={price} className="graph-line-container">
                <td className="apply-them-color">
                  <GraphLine width={((total * 100) / totalSize) * MULTIPLIER} theme={theme} />
                  {formatPrice(price)}
                </td>
                <td>{formatNumber(size)}</td>
                <td>{formatNumber(total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);
