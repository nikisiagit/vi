/**
 * Venue App Admin Tags Repository.
 */
const baseUrl = '/tags';

export const tagsRepository = (client) => ({

  /**
   * Return a list of the Tags that belong to the Venue.
   *
   * OperationId: ListTags
   *
   * @return {Promise<{tags, token}>}
   */
  async listTags () {
    const {tags, token} = await client.$get(`${baseUrl}`);
    return {tags, token};
  },

  /**
   * Create a Tag.
   *
   * OperationId: CreateTag
   *
   * @param tagToCreate {{name: string}}
   * @return {Promise<any>}
   */
  async createTag (tagToCreate) {
    return await client.$post(`${baseUrl}`, tagToCreate);
  },

  /**
   * Return the Tag with the specified TagId.
   *
   * OperationId: GetTagWithTagId
   *
   * @return {Promise<void>}
   */
  async getTagWithTagId (tagId) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(tagId)}`);
  },

  /**
   * Remove the Tags identified by the supplied Name.
   *
   * @param name {string}
   * @return {Promise<void>}
   */
  // async removeTagWithName (name) {
  //   return await client.$delete(`${baseUrl}/${encodeURIComponent(name)}`);
  // },

  /**
   * Update the Tags identified by the supplied Name.
   *
   * @param name {string}
   * @param update {{apiKey (string|undefined) }}
   * @return {Promise<any>}
   */
  // async updateTagsWithName (name, update) {
  //   return await client.$patch(`${baseUrl}/${encodeURIComponent(name)}`, update);
  // },
});
