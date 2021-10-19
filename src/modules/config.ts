const asString = (value: string | undefined): string => (typeof value !== 'undefined' ? `${value}`.trim() : '');

export const getConfig = () => {
  const config = {
    realtimeFeedSource: asString(process.env.REACT_APP_REALTIME_FEED_SOURCE_URL),
  };

  if (!config.realtimeFeedSource) {
    throw new Error('Not all envs are set. check your .env file');
  }

  return config;
};
