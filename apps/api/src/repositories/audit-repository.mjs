export function createInMemoryAuditRepository() {
  const auditEvents = [];

  return {
    async append(event) {
      auditEvents.push(event);
      return event;
    },

    async appendMany(events) {
      for (const event of events) {
        auditEvents.push(event);
      }
      return events;
    },

    async findAllForTest() {
      return [...auditEvents];
    },

    async clearForTest() {
      auditEvents.length = 0;
    }
  };
}

export const auditRepository = createInMemoryAuditRepository();

