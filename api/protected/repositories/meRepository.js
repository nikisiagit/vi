const baseUrl = '/me'

export const meRepository = (api) => ({
  /**
   * @return {Promise<any>}
   */
  async getMe() {
    const me = await api.$get(`${baseUrl}`);
    return me
  },

  /**
   * Return a ProfileChatsList for the Me.
   *
   * @returns {Promise<{profileChats, token}>}
   */
  async listProfileChats () {
    const {profileChats, token} = await api.$get(`${baseUrl}/chats`);
    return {profileChats, token}
  },

  /**
   * Return a TicketsList for the Me.
   * @returns {Promise<{tickets: *, token: *}>}
   */
  async listTickets () {
    const {tickets, token} = await api.$get(`${baseUrl}/tickets`);
    return {tickets, token}
  },

  /**
   * Return a LibraryList for the Me.
   * @returns {Promise<{library: *, token: *}>}
   */
  async listLibrary () {
    const {library, token} = await api.$get(`${baseUrl}/library`);
    return {library, token}
  },


  /**
   ** Me - BOOKMARKS
   */
  /**
   * Return a BookmarksList for the Me.
   * @returns {Promise<{bookmarks: *, token: *}>}
   */
  async listBookmarks () {
    const {bookmarks, token} = await api.$get(`${baseUrl}/bookmarks`);
    return {bookmarks, token}
  },

  /**
   * Return a BookmarksList by type for the Me.
   * @param bookmarkType {string}
   * @returns {Promise<any>}
   */
  async listBookmarksWithType (bookmarkType) {
    let qParams = ''

    if ( bookmarkType ) {
      qParams += `?itemType=${bookmarkType}`
    }
    //  const response = await api.$get(`${baseUrl}/bookmarks?itemType=user`);

    const {bookmarks, token} = await api.$get(`${baseUrl}/bookmarks` + qParams);
    return {bookmarks, token}
  },

  /**
   * Return the Bookmark identified by the supplied BookmarkId.
   *
   * OperationId: GetBookmarkWithBookmarkId
   *
   * @param bookmarkId {string}
   * @returns {Promise<any>}
   */
  async getBookmarkWithBookmarkId (bookmarkId) {
    return await api.$get(`${baseUrl}/bookmarks/${bookmarkId}`);
  },

  /**
   * Create an Bookmark.
   *
   * @param bookmarkToCreate
   * @return {Promise<any>}
   */
  async createBookmark (bookmarkToCreate) {
    return await api.$post(`${baseUrl}/bookmarks`, bookmarkToCreate);
  },

  /**
   * Remove the Bookmark identified by the supplied BookmarkId.
   *
   * @param bookmarkId {string}
   * @return {Promise<void>}
   */
  async removeBookmarkWithBookmarkId (bookmarkId) {
    return await api.$delete(`${baseUrl}/bookmarks/${encodeURIComponent(bookmarkId)}`);
  },

  /**
   * Update the Bookmark identified by the supplied Name.
   *
   * @param bookmarkId {string}
   * @param update {{status: string, }}
   * @return {Promise<any>}
   */
  async updateBookmarkWithBookmarkId (bookmarkId, update) {
    return await api.$patch(`${baseUrl}/${encodeURIComponent(bookmarkId)}`, update);
  },



  /**
   * Create a ProfileChat - join a Chat.
   *
   * @param profileChatToCreate {{chatId: string}}
   * @returns {Promise<void>}
   */
  async createProfileChat (profileChatToCreate) {
    return await api.$post(`${baseUrl}/chats`, profileChatToCreate);
  },

  /**
   * Update Me.
   *
   * @param update {{}}
   * @returns {Promise<any>}
   */
  async updateMe(update) {
    return await api.$patch(`${baseUrl}`, update);
  },

})
