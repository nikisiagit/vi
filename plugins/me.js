/**
 * Me Plugin
 *
 * This plugin adds a Store Listener that will load or unload the Me Profile
 * when the User is updated.
 *
 * @param store
 * @param $venueConfig
 * @return {Promise<void>}
 */
export default async function ({store, $venueConfig }) {
  console.log(`## ME PLUGIN`);

  store.subscribe(async (mutation, state) => {
    if (mutation.type === 'auth/setUser') {
      const user = store.getters['auth/user'];

      if (! user) {
        console.log(`## ME PLUGIN - UNLOAD`);
        await store.dispatch('me/unload');
      } else {
        console.log(`## ME PLUGIN - LOAD`);
        await store.dispatch('me/load');
      }
    }
  });
};
