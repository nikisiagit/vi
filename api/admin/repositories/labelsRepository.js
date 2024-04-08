/**
 * Venue App Admin Tags Repository.
 */
const baseUrl = '/labels';

export const labelsRepository = (client) => ({
  /**
   * Return the Label with the specified LabelId.
   *
   * OperationId: GetLabelWithLabelId
   *
   * @return {Promise<void>}
   */
  async getLabelWithLabelId (labelId) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(labelId)}`);
  },

  /**
   * Update the Label.
   *
   * OperationId: UpdateLabelWithLabelId
   *
   * @param labelId {string}
   * @param update {{ text: string, languageId: string}}
   * @returns {Promise<any>}
   */
  async updateLabelWithLabelId(labelId, update) {
    return await client.$patch(`${baseUrl}/${encodeURIComponent(labelId)}`, update);
  },


});
