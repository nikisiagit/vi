/**
 * @type {string}
 */
const baseUrl = '/events';

export const eventsRepository = (client) => ({
  /**
   * List the Events inside the Venue (Organisers)
   *
   * @return {Promise<any>}
   */
  async listEvents() {
    return await client.$get(`${baseUrl}`);
  },

  /**
   * Create an Event.
   *
   * @param eventToCreate
   * @return {Promise<any>}
   */
  async createEvent (eventToCreate) {
    return await client.$post(`${baseUrl}`, eventToCreate);
  },

  /**
   * Return the Event with the specified event id.
   *
   * @param eventId {string}
   * @return {Promise<any>}
   */
  async getEventWithEventId (eventId) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(eventId)}`);
  },

  /**
   * Remove the Event identified by the supplied EventId.
   *
   * @param eventId {string}
   * @return {Promise<void>}
   */
  async removeEventWithEventId (eventId) {
    return await client.$delete(`${baseUrl}/${encodeURIComponent(eventId)}`);
  },

  /**
   * Update the Event identified by the supplied Name.
   *
   * @param eventId {string}
   * @param update {{tagIds: [string], }}
   * @return {Promise<any>}
   */
  async updateEventWithEventId (eventId, update) {
    return await client.$patch(`${baseUrl}/${encodeURIComponent(eventId)}`, update);
  },
});
