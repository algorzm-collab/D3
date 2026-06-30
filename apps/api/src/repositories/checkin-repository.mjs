export function createInMemoryCheckinRepository() {
  const checkins = [];

  return {
    async create(input) {
      const checkin = {
        id: `checkin_${checkins.length + 1}`,
        ...input,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      checkins.push(checkin);
      return checkin;
    },

    async findSubmittedByOrganization({ tenantId, organizationId }) {
      return checkins.filter(
        (checkin) =>
          checkin.tenantId === tenantId &&
          checkin.organizationId === organizationId &&
          checkin.workflowState === "submitted"
      );
    },

    async clearForTest() {
      checkins.length = 0;
    }
  };
}

export const checkinRepository = createInMemoryCheckinRepository();

