export function createInMemoryMetricRepository() {
  const events = [];

  return {
    async append(event) {
      events.push(event);
      return event;
    },

    async findAllForTest() {
      return [...events];
    },

    async clearForTest() {
      events.length = 0;
    }
  };
}

export const metricRepository = createInMemoryMetricRepository();

