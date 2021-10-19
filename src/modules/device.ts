const POWERFUL_CPU_CONCURRENCY = 32;

export const getDevicePerformanceRank = () => {
  if (navigator.hardwareConcurrency) {
    return POWERFUL_CPU_CONCURRENCY / navigator.hardwareConcurrency ?? 8;
  }

  return 2;
};

export const getUpdatesIntervalInMsBasedOnDevicePerformance = (): number => {
  const performanceRank = getDevicePerformanceRank();

  return performanceRank * 1000;
};
