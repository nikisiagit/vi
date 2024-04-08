/**
 * Venue App Admin Components Repository.
 */
const baseUrl = '/components';

export const componentsRepository = (client) => ({

  /**
   * Return a list of the Components that belong to the Venue.
   *
   * OperationId: ListComponents
   *
   * @return {Promise<{tags, token}>}
   */
  async listComponents () {
    const {components, token} = await client.$get(`${baseUrl}`);
    return {components, token};
  },

  /**
   * Create an Component.
   *
   * OperationId: CreateComponent
   *
   * @param componentToCreate {{name: string}}
   * @return {Promise<any>}
   */
  async createComponent (componentToCreate) {
    return await client.$post(`${baseUrl}`, componentToCreate);
  },

  // /**
  //  * Return the Component with the specified ComponentId.
  //  *
  //  * OperationId: GetComponentWithComponentId
  //  *
  //  * @return {Promise<void>}
  //  */
  // async getComponentWithComponentId (componentId) {
  //   return await client.$get(`${baseUrl}/${encodeURIComponent(componentId)}`);
  // },
  //
  // /**
  //  * Update the Component with the specified ComponentId.
  //  *
  //  * @param componentId {string}
  //  * @param update {{tagIds: [string], }}
  //  * @return {Promise<any>}
  //  */
  // async updateComponentWithComponentId (componentId, update) {
  //   return await client.$patch(`${baseUrl}/${encodeURIComponent(componentId)}`, update);
  // },
});
