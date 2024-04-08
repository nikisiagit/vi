/**
 * Admin Api - Resources Repository.
 */
const baseUrl = '/resources';

import axios from 'axios';

export const resourcesRepository = (client) => ({

  /**
   * Return a list of the Resources that belong to the Venue.
   *
   * OperationId: ListResources
   *
   * @return {Promise<{themes, token}>}
   */
  async listResources () {
    const {resources, token} = await client.$get(`${baseUrl}`);
    return {resources, token};
  },

  /**
   * Return the Resource with the specified name.
   *
   * OperationId: GetResourceWithResourceId
   *
   * @return {Promise<void>}
   */
  async getResourceWithResourceId (resourceId) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(resourceId)}`);
  },

  /**
   * Get the SignedUrl for putting the Resource file into S3.
   *
   * @param resourceId {string}
   * @return {Promise<any>}
   */
  async getPutUrlWithResourceId (resourceId) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(resourceId)}/put-url`);
  },

  /**
   * Return the SignedUrl for getting the Resource file from S3.
   *
   * @param resourceId {string}
   * @return {Promise<any>}
   */
  async getGetUrlWithResourceId (resourceId) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(resourceId)}/get-url`);
  },

  /**
   * Create a Resource.
   *
   * OperationId: CreateResource
   *
   * @param resource {{name: string}}
   * @return {Promise<any>}
   */
  async createResource (resource) {
    return await client.$post(`${baseUrl}`, resource);
  },

  /**
   * Put/Upload the File into the specified url.
   *
   * @param url {string}
   * @param file {File}
   * @return {Promise<void>}
   */
  async putFile (url, file) {
    const response = await axios.put(
      url,
      file, // a File object
      {
        headers: {'Content-Type': file.type},
        timeout: 10000
      }
    );

    console.log(`## RESPONSE`);
    console.log(response);

    return response;
  },
});
