/**
 * @type {string}
 */
const baseUrl = '/i18n-language';

export const i18nRepository = (client) => ({
  /**
   * @param languageId {string} 'language:eventheads:en'
   * @return {Promise<any>}
   */
  async getI18nLanguageFileWithLanguageId(languageId) {
    return await client.$get(`${baseUrl}/${languageId}`);
  },
});
