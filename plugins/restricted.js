/**
 * restricted.js
 */

/**
 * This plugin redirect/Navigate the user to only a restrict View. [Layout/Page]
 *
 * @param redirect
 * @param route
 * @param $restricted
 * @return {Promise<void>}
 */
export default async function ({redirect, route, $restricted}) {
  window.onNuxtReady(() => {
    console.log('## RESTRICTED PLUGIN: ' , $restricted);

    if ($restricted) {
      redirect({ name: 'restricted' })
    }

  })
};
