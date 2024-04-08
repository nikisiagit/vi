/**
 * Auth Store
 *
 * This store manages/contains the details of the authenticat(ed|ing) user.
 */
import {
  getUser,
  signIn,
  signOut,
  signUp,
  confirmSignUp,
  resendSignUp,
  completeNewPassword,
  forgotPassword,
  confirmNewPassword,
  rememberDevice,
  fetchDevices,
  forgetDevice
} from "../../utils/auth";

export const state = () => ({
  /**
   * The User retrieved from Cognito.
   */
  user: undefined,

  /**
   * The User is loading.
   */
  loading: false,

  /**
   * The User is loaded.
   */
  loaded: false,

  /**
   * The last error.
   */
  error: undefined,


  //

  /**
   * The localUser that is used before sign in is completed.
   *
   * @todo is this a CognitoUser?
   */
  localUser: undefined,

  //


  /**
   * The SignUp.
   */
  signUp: undefined,

  /**
   * The forgot password instance.
   */
  forgotPassword: undefined,

  /**
   * The SignUpResend.
   */
  signUpResend: undefined,

  /**
   * The ConfirmSignUp.
   */
  signUpConfirm: undefined,

  /**
   * The CompleteNewPassword.
   */
  completeNewPassword: undefined,


  //


  /**
   * The User is signing in.
   */
  signingIn: false,

  /**
   * The User is signed in.
   */
  signedIn: false,

  /**
   * The User is signing out.
   */
  signingOut: false,

  /**
   * The User is signed out.
   */
  signedOut: false,

  /**
   * Sending the forgot password.
   */
  sendingForgotPassword: false,

  /**
   * Is this store currently sending a SignUp?
   */
  sendingSignUp: false,

  /**
   * Is this store currently sending a Confirm SignUp?
   */
  confirmingSignUp: false,

  /**
   * Is this store currently sending a Resend SignUp?
   */
  resendingSignUp: false,

  /**
   * Is the store currently sending a CompleteNewPassword?
   */
  completingNewPassword: false,

  showSignUp: false,
  showResetPassword: false,

});

export const mutations = {
  /**
   * Set the User
   *.
   * @param state
   * @param user
   */
  setUser (state, user = undefined) {
    state.user = user;
  },

  /**
   * Set the loading value.
   *
   * @param state
   * @param loading {boolean}
   */
  setLoading (state, loading = false) {
    state.loading = loading;
  },

  /**
   * Set the loaded value.
   *
   * @param state
   * @param loaded {boolean}
   */
  setLoaded (state, loaded = false) {
    state.loaded = loaded;
  },

  /**
   * Set the last error seen by this store.
   *
   * @param state
   * @param error
   */
  setError (state, error = undefined) {
    state.error = error;
  },

  /**
   * Set the local user.
   *
   * @param state
   * @param localUser
   */
  setLocalUser(state, localUser) {
    state.localUser = localUser
  },

  ///

  /**
   * Set the signingOut state.
   *
   * @param state
   * @param signingOut {boolean}
   */
  setSigningOut (state, signingOut = false) {
    state.signingOut = signingOut;
  },

  /**
   * Set the signingIn state.
   *
   * @param state
   * @param signingIn {boolean}
   */
  setSigningIn (state, signingIn = false) {
    state.signingIn = signingIn;
  },

  /**
   * Set the signedIn state.
   *
   * @param state
   * @param signedIn {boolean}
   */
  setSignedIn (state, signedIn = false) {
    state.signedIn = signedIn;
  },

  /**
   * Set the signedOut state.
   *
   * @param state
   * @param signedOut {boolean}
   */
  setSignedOut (state, signedOut = false) {
    state.signedOut = signedOut;
  },

  /**
   * Set the forgot password.
   *
   * @param state
   * @param forgotPassword
   */
  setForgotPassword (state, forgotPassword = undefined) {
    this.forgotPassword = forgotPassword;
  },

  /**
   * Set the SignUp.
   *
   * @param state
   * @param signUp
   */
  setSignUp (state, signUp = undefined) {
    state.signUp = signUp;
  },

  /**
   * Set the SignUpResend.
   *
   * @param state
   * @param signUpResend
   */
  setSignUpResend (state, signUpResend = undefined) {
    state.signUpResend = signUpResend;
  },

  /**
   * Set the ConfirmSignUp.
   *
   * @param state
   * @param signUpConfirm
   */
  setSignUpConfirm (state, signUpConfirm = undefined) {
    state.signUpConfirm = signUpConfirm;
  },

  /**
   * Set the CompleteNewPassword to whatever is supplied.
   *
   * @param state
   * @param completeNewPassword
   */
  setCompleteNewPassword (state, completeNewPassword = undefined) {
    state.completeNewPassword = completeNewPassword;
  },


  ///

  /**
   * Set the sending forgot password.
   *
   * @param state
   * @param sendingForgotPassword
   */
  setSendingForgotPassword (state, sendingForgotPassword = false) {
    this.sendingForgotPassword = sendingForgotPassword;
  },

  /**
   * @param state
   * @param sendingSignUp {boolean}
   */
  setSendingSignUp (state, sendingSignUp = false) {
    state.sendingSignUp = sendingSignUp;
  },

  /**
   * @param state
   * @param confirmingSignUp
   */
  setConfirmingSignUp (state, confirmingSignUp = false) {
    state.confirmingSignUp = confirmingSignUp;
  },

  /**
   * @param state
   * @param resendingSignUp {boolean}
   */
  setResendingSignUp (state, resendingSignUp = false) {
    state.resendingSignUp = resendingSignUp;
  },

  /**
   * @param state
   * @param completingNewPassword {boolean}
   */
  setCompletingNewPassword (state, completingNewPassword = false) {
    state.completeingNewPassword = completingNewPassword;
  },

  /**
   * @param state
   * @param showSignUp {boolean}
   */
  setShowSignUp (state, showSignUp = false) {
    state.showSignUp = showSignUp;
  },

  /**
   * @param state
   * @param showResetPassword {boolean}
   */
  setShowResetPassword (state, showResetPassword = false) {
    state.showResetPassword = showResetPassword;
  },
};

export const getters = {
  /**
   * Return the authenticated User.
   *
   * @param state
   * @returns {undefined}
   */
  user: (state) => {
    return state.user || undefined;
  },

  /**
   * Is the store loading?
   *
   * @param state
   * @returns {boolean}
   */
  loading: (state) => {
    return state.loading || false;
  },

  /**
   * Get the loaded result.
   *
   * @param state
   * @returns {boolean}
   */
  loaded: (state) => {
    return state.loaded || false;
  },

  /**
   * Return the last error.
   *
   * @param state
   * @returns {undefined}
   */
  error: (state) => {
    return state.error || undefined;
  },


  //

  /**
   * Get the localUser.
   *
   * @param state
   * @returns {undefined}
   */
  localUser: (state) => {
    return state.localUser || undefined;
  },

  //


  /**
   * Get the SignUp.
   *
   * @param state
   * @returns {undefined}
   */
  signUp: (state) => {
    return state.signUp || undefined;
  },


  /**
   * Return the forgot password.
   *
   * @param state
   * @returns {undefined}
   */
  forgotPassword: (state) => {
    return state.forgotPassword || undefined;
  },

  /**
   * Get the signUpConfirm.
   *
   * @param state
   * @returns {undefined}
   */
  signUpConfirm: (state) => {
    return state.signUpConfirm || undefined;
  },

  /**
   * Get the SignUpResend.
   *
   * @param state
   * @returns {undefined}
   */
  signUpResend: (state) => {
    return state.signUpResend || undefined;
  },

  /**
   * Get the completeNewPassword.
   *
   * @param state
   * @returns {undefined}
   */
  completeNewPassword: (state) => {
    return state.completeNewPassword || undefined;
  },
  //


  /**
   * Return the signingIn state
   *
   * @param state
   * @returns {boolean}
   */
  signingIn: (state) => {
    return state.signingIn || false;
  },

  /**
   * Return the signedIn state
   *
   * @param state
   * @returns {boolean}
   */
  signedIn: (state) => {
    return state.signedIn || false;
  },

  /**
   * @param state
   * @returns {boolean}
   */
  signingOut: (state) => {
    return state.signingOut || false;
  },


  /**
   * Return the signedOut state
   *
   * @param state
   * @returns {boolean}
   */
  signedOut: (state) => {
    return state.signedOut || false;
  },

  /**
   * Return the sendingForgotPassword state.
   *
   * @param state
   * @returns {boolean}
   */
  sendingForgotPassword: (state) => {
    return state.sendingForgotPassword || false;
  },

  /**
   * @param state
   * @returns {boolean}
   */
  completingNewPassword: (state) => {
    return state.completingNewPassword || false;
  },

  /**
   * Return the ResendingSignUp state.
   *
   * @param state
   * @returns {boolean}
   */
  resendingSignUp: (state) => {
    return state.resendingSignUp || false;
  },

  /**
   * Return the ConfirmingSignUp state.
   * *
   * @param state
   * @returns {boolean}
   */
  confirmingSignUp: (state) => {
    return state.confirmingSignUp || false;
  },

  /**
   * @param state
   * @returns {boolean}
   */
  sendingSignUp: (state) => {
    return state.sendingSignUp || false;

  },

  /**
   * @param state
   * @returns {boolean}
   */
  showSignUp: (state) => {
    return state.showSignUp || false;
  },

  /**
   * @param state
   * @returns {boolean}
   */
  showResetPassword: (state) => {
    return state.showResetPassword || false;
  }
}

export const actions = {
  /**
   * Load the User from Amplify/Auth.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async load ({commit}) {
    console.log(`## AUTH STORE - LOAD`);
    try {
      commit('setLoaded', false);
      commit('setLoading', true);

      const user = await getUser();

      if (user && user.signInUserSession) {
        commit('setUser', user);
        commit('setLoaded', true);
      }

    } catch (error) {
      // suppress the error
      console.log(`## AUTH STORE - ERROR`);
      commit('setLoaded', false);
      console.log(error);

    } finally {
      commit('setLoading', false);
    }
  },

  /**
   * Unload the store.
   *
   * @returns {Promise<void>}
   */
  async unload ({commit}) {
    await commit('setLoaded', false);
    await commit('setLoading', false);
    await commit('setUser', undefined);
    await commit('setError', undefined);
    await commit('setSigningIn', false);
    await commit('setSigningOut', false);
    await commit('setSendingSignUp', false);
    await commit('setLocalUser', undefined);
    await commit('setConfirmingSignUp', false);
    await commit('setSignUpConfirm', undefined);
  },

  /**
   * Reload the store state.
   *
   * @param dispatch
   * @returns {Promise<void>}
   */
  async reload ({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  /**
   * Sign the User in.
   *
   * Authenticate with the supplied username and password.
   *
   * username should be an email address.
   *
   * @param commit
   * @param username {string}
   * @param password {string}
   * @return {Promise<void>}
   */
  async signIn({ commit }, {username, password}) {
    console.log('## USER - AUTHENTICATE');

    try {
      commit('setLocalUser', undefined);
      commit('setError', undefined);

      commit('setSignedIn', false);
      commit('setSigningIn', true);
      const user = await signIn(username, password)

      if (
        user.challengeName === 'NEW_PASSWORD_REQUIRED' ||
        user.challengeName === 'PASSWORD_VERIFIER'
      ) {
        commit('setSigningIn', false);
        commit('setLocalUser', user);

        // const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
        // redirectTo('signInRequireNewPassword', this.$router)

        return user;

      } else if (user) {
        commit('setSignedIn', true);
        commit('setSigningIn', false);
        commit('setUser', user);

        return user;
      }

    } catch (error) {
      commit('setSigningIn', false);
      const {code, message} = error;

      //TODO: Handle i18n.
      if (code === 'UserNotConfirmedException') {
        // The error happens if the user didn't finish the confirmation step when signing up
        // In this case you need to resend the code and confirm the user
        commit('setError', 'user-is-not-confirmed')

      } else if (code === 'PasswordResetRequiredException') {
        // The error happens when the password is reset in the Cognito console
        // In this case you need to call forgotPassword to reset the password
        commit('setError', 'password-reset-required-for-the-user')

      } else if (code === 'NotAuthorizedException') {
        // The error happens when the incorrect password is provided
        commit('setError', 'incorrect-username-or-password')

      } else if (code === 'UserNotFoundException') {
        // The error happens when the supplied username/email does not exist in the Cognito user pool
        commit('setError', 'user-does-not-exist')

      } else {
        commit('setError', message)
      }
    }
  },

  /**
   * Sign the User out of the application.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async signOut({ commit }) {
    console.log(`## AUTH - SIGN OUT`);
    try {
      commit('setSignedOut', false);
      commit('setSigningOut', true);

      await signOut();

      commit('setUser', undefined);
      commit('setSignedOut', true);
      commit('setSigningOut', false);

    } catch (error) {
      // suppress the error
      console.log(error);
    }
  },

  /**
   * Create a SignUp.
   *
   * Sign a new User up to the Venue/Partition.
   *
   * username should be an email address.
   *
   * @param commit
   * @param username {string}
   * @param password {string}
   * @returns {Promise<ISignUpResult>}
   */
  async signUp({ commit }, {username, password}) {
    console.log(`## AUTH - SIGN UP`);

    commit('setUser', undefined)
    commit('setError', undefined);
    commit('setSignUp', undefined);

    try {
      commit('setSendingSignUp', true);

      const {name: partition} = this.$partition;
      const signUpResult = await signUp(username, password, partition);
      commit('setSignUp', signUpResult);
      commit('setSendingSignUp', false);

      return signUpResult;

    } catch (error) {
      console.log(`## AUTH - SIGN UP - ERROR`);
      const {code, message} = error;

      if (code === 'UsernameExistsException') {
        // @todo what do we do in this situation?
      } else {
        commit('setError', message);
      }
    }
  },

  /**
   * Confirm the Sign Up.
   *
   * @param commit
   * @param username
   * @param code
   * @returns {Promise<string>}
   */
  async confirmSignUp({ commit }, {username, code}) {
    console.log(`## AUTH - CONFIRM SIGNUP `);

    commit('setError', undefined);
    commit('setSignUpConfirm', undefined);

    try {
      commit('setConfirmingSignUp', true);
      const {name: partitionName} = this.$partition;
      console.log(partitionName);


      const signUpConfirm = await confirmSignUp(username, code, partitionName);
      commit('setSignUpConfirm', signUpConfirm);

      return signUpConfirm;

    } catch (error) {
      const {code, message} = error;

      if (code === 'NotAuthorizedException') {
        // suppress the error
      } else {
        commit('setError', message)
      }
    } finally {
      commit('setConfirmingSignUp', false);
    }
  },

  /**
   * Resend the SignUp.
   *
   * @param commit
   * @param username {string}
   * @returns {Promise<void>}
   */
  async resendSignUp({ commit }, {username}) {
    console.log(`## AUTH - RESEND SIGNUP `);

    try {
      commit('setError', undefined);
      commit('setSignUpResend', undefined);
      commit('setResendingSignUp', true);

      const resendSignUpResult = await resendSignUp(username);
      console.log(resendSignUpResult);

      commit('setSignUpResend', resendSignUpResult);
      commit('setResendingSignUp', false);

      return resendSignUpResult;

    } catch (error) {
      const {code, message} = error;

      if (code === 'UserNotFoundException') {
        // should we suppress this error?
      } else {
        commit('setError', message) // TODO: handle i18n ...
      }
    } finally {
      commit('setResendingSignUp', false);
    }
  },

  /**
   * Send a forgot password request.
   *
   * @param commit
   * @param username {string}
   * @returns {Promise<void>}
   */
  async sendForgotPassword({ commit }, {username}) {
    console.log(`## AUTH - FORGOT PASSWORD`);

    try {
      commit('setError', undefined);
      commit('setForgotPassword', undefined);
      commit('setSendingForgotPassword', true);

      const forgotPasswordResult = await forgotPassword(username);

      commit('setForgotPassword', forgotPasswordResult);
      return forgotPasswordResult;

    } catch (error) {
      const {message, code} = error;

      if (code === 'InvalidParameterException') {

      }
      commit('setError', message);
    } finally {
      commit('setSendingForgotPassword', false);
    }
  },

  async completeNewPassword ({commit}, {user, password}) {
    try {
      commit('setError', undefined);
      commit('setCompleteNewPassword', undefined);
      commit('setCompletingNewPassword', true);

      const completeNewPasswordResult = await completeNewPassword(user, password);

      commit('setCompleteNewPassword', completeNewPasswordResult);
      return completeNewPasswordResult;

      // redirect to sign in

    } catch (error) {
      const {message, code} = error;

      if (code === 'InvalidParameterException') {

      }
      commit('setError', message);
    } finally {
      commit('setCompletingNewPassword', true);
    }
  },

  // @todo below this - to refactor




  async clearError({ commit }) {
    commit('setError', undefined);
  },

  async clearAuthenticating({ commit }) {
    commit('authenticating', false);
  },

  async _completeNewPassword({ commit }, payload) {
    try {
      const { password, user } = payload

      await completeNewPassword(user, password)
      redirectTo('signIn', this.$router)
    } catch (error) {
      commit('setError', error.message) //TODO: handle i18n ...
    }
  },



  async confirmPasswordRequested({ commit }, payload) {
    try {
      const { username, code, password } = payload

      await confirmNewPassword(username, code, password)
      redirectTo('signIn', this.$router)
    } catch (error) {
      commit('setError', error.message) //TODO: handle i18n ...
    }
  },

  async fetchDevices({ commit }) {
    try {

      const result = await fetchDevices()
      console.log(result, "RESULT [fetchDevices]")

    } catch (error) {
      console.log("error [fetchDevices]: ", error)
      commit('setError', error.message) //TODO: handle i18n ...
    }
  },

  async rememberDevice({ commit }) {
    try {

      const result = await rememberDevice()
      console.log(result, "RESULT [rememberDevice]")

    } catch (error) {
      console.log("error [rememberDevice]: ", error)
      commit('setError', error.message) //TODO: handle i18n ...
    }
  },

  async forgetDevice({ commit }) {
    try {

      const result = await forgetDevice()
      console.log(result, "RESULT [forgetDevice]")

    } catch (error) {
      console.log("error [forgetDevice]: ", error)
      commit('setError', error.message) //TODO: handle i18n ...
    }
  },

  async changeShowSignUp({ commit }, payload) {
    commit('setShowSignUp', payload)
  },

  async changeShowResetPassword({ commit }, payload) {
    commit('setShowResetPassword', payload)
  },
};

/**
 * @param state
 * @param router
 */
function redirectTo(state, router) {
  const pushPaths = {
    signedOut: () => {
      router.push({ path: '/sign-in' })
    },
    signUp: () => {
      router.push({ path: '/sign-up' })
    },
    confirmSignUp: () => {
      router.push({ path: '/sign-up-confirm' })
    },
    forgotRequireNewPassword: () => {
      router.push({
        path: '/require-new-password',
        query: {
          action: 'forgot',
        },
      })
    },
    signInRequireNewPassword: () => {
      router.push({
        path: '/require-new-password',
        query: {
          action: 'new',
        },
      })
    },
    signIn: () => {
      router.push({ path: '/sign-in' })
    },
    signedIn: () => {
      router.push({ path: '/' })
    },
  }

  if (typeof pushPaths[state] === 'function') {
    pushPaths[state]()
  }
}

