/**
 *
 * @param store
 * @param route
 * @param redirect
 * @param $venueConfig
 */
export default async function ({ store, route, redirect, $venueConfig }) {

  console.log(`## IS SETUP MIDDLEWARE`)

  const {name} = route;
  console.log(`## IS SETUP MIDDLEWARE - ROUTE NAME:`, name);

  // Keep an eye on this - there is a check here that we need to do...
  // if(!$venueConfig.venueExists && name !== 'purchase') return redirect ({name: 'purchase'});

  // venue is not setup
  // auth > /setup
  // /closed

  // const isAuthenticated = store.getters['auth/isAuthenticated'];
  // const isSetup = store.getters['venue/isSetup'];
  // const isPrivate = store.getters['venue/isPrivate'];

  // console.log(`## IS SETUP MIDDLEWARE - IS AUTHENTICATED `, isAuthenticated);
  // console.log(`## IS SETUP MIDDLEWARE - IS SETUP `, isSetup);
  // console.log(`## IS SETUP MIDDLEWARE - IS PRIVATE `, isPrivate);


  // routes to ignore
  // const whitelist = [
  //   'closed',
  //   'sign-in',
  //   'require-new-password',
  //   'forgot-password',
  //   'landing',
  //   'landing-learn-more',
  //   'landing-purchase'
  // ];

  // if (whitelist.includes(name)) {
  //   console.log(`## IS SETUP MIDDLEWARE - IGNORING ROUTE: ${name}`)
  //   return;
  // }

  // if (! isSetup) {
  //   if (isAuthenticated) {
  //     if (name !== 'apps-admin-setup') {
  //       console.log(`## IS SETUP MIDDLEWARE - APPS ADMIN VENUE SETUP`)
  //       return redirect({name: 'apps-admin-setup'});
  //     }
  //   } else {
  //     console.log(`## VENUE CLOSED`)
  //     return redirect({name: 'closed'});
  //   }
  // }

  // venue is private
  // auth > /continue
  // /closed

  // if (isPrivate) {
  //   if (! isAuthenticated) {
  //     console.log(`## IS SETUP MIDDLEWARE - VENUE CLOSED`)
  //     return redirect({name: 'closed'});
  //     // return this.$router.push({name: 'closed'});
  //   }
  // }
}
