/**
 * @type {string}
 */
const baseUrl = '/venue';

export const venueRepository = (client) => ({
  /**
   * @return {Promise<any>}
   */
  async getVenue() {
    return await client.$get(`${baseUrl}`);
  },

  /**
   * Update the Venue with the specified attributes.
   *
   * @param update {{ languageId: (undefined|string) }}
   * @return {Promise<any>}
   */
  async updateVenue (update) {
    return await client.$patch(`${baseUrl}`, update);
  },

  /**
   * Get the Description.
   *
   * @return {Promise<any>}
   */
  async getDescription () {
    return await client.$get(`${baseUrl}/description`);
  },

  /**
   * Update the description.
   *
   * @param update
   * @return {Promise<any>}
   */
  async updateDescription (update) {
    return await client.$put(`${baseUrl}/description`, update);
  }
});
