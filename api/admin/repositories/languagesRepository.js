/**
 * Admin Api Languages Repository.
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

  /**
   * Return the Language identified by the supplied LanguageId value.
   *
   * @param languageId {string} 'language:eventheads:en'
   * @return {Promise<any>}
   */
  async getLanguageWithLanguageId (languageId) {
    return await api.$get(`${baseUrl}/${encodeURIComponent(languageId)}`);
  },

  /**
   * Create a Language.
   *
   * OperationId: CreateLanguage
   *
   * @param languageToCreate {{ name: string }}
   * @return {Promise<any>}
   */
  async createLanguage (languageToCreate) {
    return await api.$post(`${baseUrl}`, languageToCreate);
  },
})
