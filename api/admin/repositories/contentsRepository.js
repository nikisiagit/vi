/**
 * Admin Api - Contents Repository
 */
const baseUrl = '/contents';

export const contentsRepository = (client) => ({

  /**
   * Return a list of the Contents.
   *
   * @returns {Promise<{contents, token}>}
   */
  async listContents () {
    const {contents, token} = await client.$get(`${baseUrl}`);
    return {contents, token};
  },

  /**
   * Create a new Content.
   *
   * @param contentToCreate
   * @returns {Promise<any>}
   */
  async createContent (contentToCreate) {
    return await client.$post(`${baseUrl}`, contentToCreate);
  },

  /**
   * Return the Content identified by the supplied ContentId.
   *
   * @param contentId {string}
   * @returns {Promise<any>}
   */
  async getContentWithContentId (contentId) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(contentId)}`);
  },
});
