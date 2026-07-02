export function createInMemoryWorkEvidenceRepository() {
  const evidences = [];

  return {
    async createManyFromCheckin({
      tenantId,
      userId,
      dailyCheckinId,
      atomicTaskId,
      evidenceItems,
      sensitivity
    }) {
      const created = evidenceItems.map((item) => {
        const evidence = {
          id: `work_evidence_${evidences.length + 1}`,
          tenantId,
          userId,
          dailyCheckinId,
          atomicTaskId,
          title: item.title,
          evidenceType: item.evidenceType,
          externalRef: item.externalRef ?? null,
          sensitivity,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        evidences.push(evidence);
        return evidence;
      });

      return created;
    },

    async findAll() {
      return [...evidences];
    },

    async findAllForTest() {
      return [...evidences];
    },

    async clearForTest() {
      evidences.length = 0;
    }
  };
}

export const workEvidenceRepository = createInMemoryWorkEvidenceRepository();
