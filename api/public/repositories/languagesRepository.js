/**
 *  Api [Partition]/ Languages Repository.
 */
/**
 * @type {string}
 */
const baseUrl = '/languages';

export const languagesRepository = (client) => ({

  /**
   * Return a list of the Languages that belong to the Venue/Partition.
   *
   * OperationId: ListLanguages
   *
   * @param token {undefined|string}
   * @return {Promise<any>}
   */
  async listLanguages (token = undefined) {
    return await client.$get(`${baseUrl}`);
  },

  /**
   * @param languageId {string} 'language:eventheads:en'
   * @return {Promise<any>}
   */
  async getLanguageWithLanguageId(languageId) {
    return await client.$get(`${baseUrl}/${languageId}`);
  },
})
