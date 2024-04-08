/**
 * Venue App Admin Areas Repository.
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
   * Create an Area.
   *
   * OperationId: CreateArea
   *
   * @param areaToCreate {{name: string}}
   * @return {Promise<any>}
   */
  async createArea (areaToCreate) {
    return await client.$post(`${baseUrl}`, areaToCreate);
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
   * Update the Component with the specified AreaId.
   *
   * @param componentId {string}
   * @param areaId {string}
   * @param update {{tagIds: [string], }}
   * @return {Promise<any>}
   */
  async updateComponentWithComponentId (componentId, areaId, update) {
    return await client.$patch(`${baseUrl}/${encodeURIComponent(areaId)}/components/${encodeURIComponent(componentId)}`, update);
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

  /**
   * Return the Component with the specified ComponentId.
   *
   * OperationId: GetComponentWithComponentId
   *
   * @return {Promise<void>}
   */
  async getComponentWithComponentId (componentId, areaId) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(areaId)}/components/${encodeURIComponent(componentId)}`);
  },
});
