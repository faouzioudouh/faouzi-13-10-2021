import { useState, useEffect, useCallback } from 'react';

export const useTabVisibility = (): { tabVisible: boolean } => {
  const [tabVisible, setVisibility] = useState(document.visibilityState === 'visible');

  const updateVisibility = useCallback(() => {
    setVisibility(document.visibilityState === 'visible');
  }, []);

  useEffect(() => {
    document.addEventListener('visibilitychange', updateVisibility);

    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, [updateVisibility]);

  return { tabVisible };
};
