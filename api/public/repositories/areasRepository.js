/**
 * Venue Public Areas Repository.
 */
const baseUrl = '/areas';

export const areasRepository = (client) => ({

  /**
   * Return a list of the Areas that belong to the Venue.
   *
   * OperationId: ListAreas
   *
   * @return {Promise<{tags, token}>}
   */
  async listAreas () {
    const {areas, token} = await client.$get(`${baseUrl}`);
    return {areas, token};
  },

  /**
   * Return the Area with the specified AreaId.
   *
   * OperationId: GetAreaWithAreaId
   *
   * @return {Promise<void>}
   */
  async getAreaWithAreaId (areaId) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(areaId)}`);
  },

  /**
   * Return a list of the Components that belong to the Area.
   *
   * OperationId: ListComponentsWithAreaId
   * @param areaId {string}
   * @return {Promise<{tags, token}>}
   */
  async listComponentsWithAreaId (areaId) {
    const {components, token} = await client.$get(`${baseUrl}/${encodeURIComponent(areaId)}/components`);
    return {components, token};
  },
});
