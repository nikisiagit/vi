/**
 * Admin Api - Themes Repository.
 */
const baseUrl = '/themes';

export const themesRepository = (client) => ({

  /**
   * Return a list of the Themes that belong to the Venue.
   *
   * OperationId: ListThemes
   *
   * @return {Promise<{themes, token}>}
   */
  async listThemes () {
    const {themes, token} = await client.$get(`${baseUrl}`);
    return {themes, token};
  },

  /**
   * Create a Theme.
   *
   * OperationId: CreateTheme
   *
   * @param themeToCreate {{name: string}}
   * @return {Promise<any>}
   */
  async createTheme (themeToCreate) {
    return await client.$post(`${baseUrl}`, themeToCreate);
  },

  /**
   * Return the Theme with the specified name.
   *
   * OperationId: GetThemeWithName
   *
   * @return {Promise<void>}
   */
  async getThemeWithName (name) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(name)}`);
  },

  /**
   * Remove the Theme identified by the supplied Name.
   *
   * @param name {string}
   * @return {Promise<void>}
   */
  async removeThemeWithName (name) {
    return await client.$delete(`${baseUrl}/${encodeURIComponent(name)}`);
  },

  /**
   * Update the Theme identified by the supplied Name.
   *
   * @param name {string}
   * @param update {{apiKey (string|undefined) }}
   * @return {Promise<any>}
   */
  async updateThemeWithName (name, update) {
    return await client.$patch(`${baseUrl}/${encodeURIComponent(name)}`, update);
  },
});
