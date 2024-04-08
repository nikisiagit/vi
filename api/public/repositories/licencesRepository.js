/**
 * @type {string}
 */
const baseUrl = '/licences';

export const licencesRepository = (client) => ({
  /**
   * @return {Promise<any>}
   */
  async listLicences() {
    return await client.$get(`${baseUrl}`);
  },
});
