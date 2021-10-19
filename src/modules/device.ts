const POWERFUL_CPU_CONCURRENCY = 32;

export const getDevicePerformanceRank = () => {
  return POWERFUL_CPU_CONCURRENCY / navigator.hardwareConcurrency;
};

export const getUpdatesIntervalInMsBasedOnDevicePerformance = (): number => {
  const performanceRank = getDevicePerformanceRank();

  return performanceRank * 500;
};
