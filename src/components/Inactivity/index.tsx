import { memo, VFC } from 'react';
import { Button } from '../button';

import './inactivity.css';

interface Props {
  onReconnect: () => void;
}

export const Inactivity: VFC<Props> = memo(({ onReconnect }) => {
  return (
    <div className="inactivity">
      <p>
        When the tab is not visible we stop the feed to to reduce data usage. Click Reconnect to connect again to the
        same products.
      </p>
      <Button onClick={onReconnect}>Reconnect</Button>
    </div>
  );
});
