/**
 * @type {string}
 */
const baseUrl = '/regions';

export const regionsRepository = (client) => ({
  /**
   * @returns {Promise<any>}
   */
  async listRegions() {
    return await client.$get(`${baseUrl}`);
  },
});
