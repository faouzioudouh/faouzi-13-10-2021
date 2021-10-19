import type { VFC } from 'react';

import './graph-line.css';

interface Props {
  width: number;
  theme: 'green' | 'red';
}

export const GraphLine: VFC<Props> = ({ width, theme }) => {
  return (
    <span className="graph-line">
      <i style={{ width: `${width}%`, backgroundColor: theme }} />
    </span>
  );
};
