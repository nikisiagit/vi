/**
 * User Plugin
 *
 * @param store
 * @param redirect
 * @param $venueConfig
 * @returns {Promise<*>}
 */

export default async function ({ store, redirect, $venueConfig }) {
  console.log('## USER PLUGIN');

  const user = store.getters['auth/user'];

  if (! user) {
    await store.dispatch('auth/load');
  }
};
