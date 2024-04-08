/**
 * Auth middleware.
 *
 * @param store
 * @param redirect
 * @param $socket
 * @return {Promise<void>}
 */
export default async function ({ store, redirect, $socket }) {
  console.log('RUNNING AUTHORISED MIDDLEWARE');

  const requireAuthentication = store.getters['venue/requireAuthentication'];

  if (requireAuthentication) {
    /**
     * Load CognitoUserAuth &&  has a cognitoSession
     */
    const cognitoUser = await loadCognitoUser(store, redirect)

    if ( cognitoUser ) {
      /**
       * Load Profile
       */
      await loadProfile(store, redirect)
    }
  } else {
    /**
     * Load CognitoUserAuth &&  has a cognitoSession
     */
    const cognitoUser = await loadCognitoUser(store)

    if (cognitoUser) {
      /**
       * Load Profile
       */
      await loadProfile(store, redirect)
    }
  }
};

/**
 * Load the Auth/Cognito User.
 * @param store
 * @param redirect
 * @return {Promise<*>}
 */
async function loadCognitoUser(store, redirect) {
  try {
    await store.dispatch('auth/fetchMe')

    const cognitoUser = store.getters['auth/user']

    // Check user is authenticated in Cognito otherwise send to Sign In.
    if (!cognitoUser && redirect) {
      return redirect('/sign-in')
    }

    return cognitoUser

  } catch (error) {
    if ( redirect ) return redirect('/sign-in')
  }
}

async function loadProfile (store, redirect) {
  try {
    /**
     * Retrieve Profile
     */
    let userProfile = store.getters['me/me']

    if (! userProfile) {
      await store.dispatch('me/load');
      userProfile = store.getters['me/me']
    }

    if (! userProfile && redirect) {
      return redirect('/not-authorized')
    }

    return userProfile

  } catch (error) {
    const code = parseInt(error.response && error.response.status)
    console.log('ErrorCode: ', code)

    if( redirect ) return redirect('/not-authorized')
  }
}
