import type { VFC } from 'react';

import './graph-line.css';

interface Props {
  width: number;
  theme: 'green' | 'red';
}

export const GraphLine: VFC<Props> = ({ width, theme }) => {
  return (
    <svg className="graph-line">
      <rect x="0" y="0" width={`${width}%`} height="100%" fill={theme} fill-opacity="0.2"></rect>
    </svg>
  );
};
