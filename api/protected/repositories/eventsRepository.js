/**
 * Venue Protected Events Repository
 */

const baseUrl = '/events';

export const eventsRepository = (client) => ({

  /**
   * Return a list  of the Events in the Venue/Partition.
   *
   * OperationId: ListEvents
   *
   * @returns {Promise<any>}
   */
  async listEvents () {
    return await client.$get(`${baseUrl}`);
  },

  /**
   * Return the Event identified by the supplied EventId.
   *
   * OperationId: GetEventWithEventId
   *
   * @param eventId {string}
   * @returns {Promise<any>}
   */
  async getEventWithEventId (eventId) {
    return await client.$get(`${baseUrl}/${eventId}`);
  },
});
