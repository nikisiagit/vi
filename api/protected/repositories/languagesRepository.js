/**
 *  Api [Partition]/ Languages Repository.
 */
/**
 * @type {string}
 */
const baseUrl = '/languages';

export const languagesRepository = (api) => ({

  /**
   * Return a list of the Languages that belong to the Venue/Partition.
   *
   * @param token {undefined|string}
   * @return {Promise<any>}
   */
  async listLanguages (token = undefined) {
    return await api.$get(`${baseUrl}`);
  },
})
