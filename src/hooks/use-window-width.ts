import { useCallback, useEffect, useState } from 'react';

const MOBILE_MAX_WITH_PX = 768;

export const useWindowWidth = () => {
  const [windowWith, setWindowWith] = useState<number>(0);

  const updateWindowWith = useCallback(() => {
    setWindowWith(window.innerWidth);
  }, []);

  useEffect(() => {
    updateWindowWith();
    window.addEventListener('resize', updateWindowWith);

    return () => window.removeEventListener('resize', updateWindowWith);
  }, [updateWindowWith]);

  return { windowWith, isMobile: windowWith <= MOBILE_MAX_WITH_PX };
};
