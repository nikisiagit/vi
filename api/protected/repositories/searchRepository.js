/**
 * Venue App Admin Search Repository.
 */
const baseUrl = '/search';

export const searchRepository = (client) => ({
  /**
   * Return a list of Results that match the search term.
   *
   * OperationId: ListSearchResults
   *
   * @return {Promise<{results, token}>}
   */
  async listResults(searchTerm) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(searchTerm)}`);
  }
});
