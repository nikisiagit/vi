/**
 * Initialise the Partition modules (stores).
 *
 * @todo - rename to "initialise" plugin
 *
 * @param context
 * @return {Promise<void>}
 */
export default async function ({store}) {
  console.log(`## INIT PLUGIN`)

  store.subscribe(async (mutation) => {

    if (mutation.type === 'me/setMe') {

      const me = store.getters['me/me'];

      /**
       * If the Me/User has been unset (signed out) - initialise the stores in the "public" mode
       */
      if (! me) {
        console.log(`## INITIALISE PLUGIN - PUBLIC MODE`);

        store.dispatch('venue/initialise', 'public');

        // locale
        store.dispatch('languages/initialise', 'public');
        store.dispatch('timezones/initialise', 'public');

        store.dispatch('areas/initialise', 'public');
        store.dispatch('themes/initialise', 'public');
        store.dispatch('i18n/initialise', 'public');
        store.dispatch('events/initialise', 'public');

        store.dispatch('chats/initialise', 'public');
        // store.dispatch('areas/initialise', 'public');

      /**
       * If the Me/User HAS been set - initialise the stores in the "protected" mode
       */
      } else {
        const {userId} = me;

        console.log(`## INITIALISE PLUGIN - PROTECTED MODE - USER ${userId} HAS ENTERED THE VENUE`);

        // init the stores in protected mode
        store.dispatch('venue/initialise', 'protected');
        store.dispatch('languages/initialise', 'protected');
        store.dispatch('timezones/initialise', 'protected');
        store.dispatch('chats/initialise', 'protected');
        store.dispatch('users/initialise', 'protected');
        // store.dispatch('areas/initialise', 'protected');
      }
    }
  });

  console.log(`## INITIALISE PLUGIN - (DEFAULT) PUBLIC MODE`);

  store.dispatch('languages/initialise', 'public');
  store.dispatch('timezones/initialise', 'public');

  // start up the venue
  store.dispatch('venue/initialise', 'public');
  store.dispatch('themes/initialise', 'public');
  store.dispatch('areas/initialise', 'public');
  store.dispatch('components/initialise', 'public');
  store.dispatch('events/initialise', 'public');

  // @todo - dependent on
  // store.dispatch('i18n/initialise', 'public');

  store.dispatch('chats/initialise', 'public');
  // store.dispatch('users/initialise', 'public');
};




