/**
 * Public                                                                                                                Api - Themes Repository.
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
   * Return the Theme with the specified themeId.
   *
   * OperationId: GetThemeWithThemeId
   *
   * @return {Promise<void>}
   */
  async getThemeWithThemeId(themeId) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(themeId)}`);
  },
});
