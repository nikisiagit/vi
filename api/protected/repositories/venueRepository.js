/**
 * @type {string}
 */
const baseUrl = '/venue';

export const venueRepository = (client) => ({
  /**
   * @param name {string} 'eventheads'
   * @return {Promise<any>}
   */
  async getVenue() {
    return await client.$get(`${baseUrl}`);
  },
});
