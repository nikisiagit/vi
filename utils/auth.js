import { Auth } from 'aws-amplify'

/**
 * Sign the User in using Amplify.
 *
 * @param username {string}
 * @param password {string}
 * @returns {Promise<any>}
 */
async function signIn(username, password) {
  return Auth.signIn(username, password)
}

/**
 * @param user
 * @param password
 * @returns {Promise<any>}
 */
async function completeNewPassword(user, password) {
  return Auth.completeNewPassword(user, password)
}

/**
 * Sign the supplied User up.
 *
 * @param username {string} The Users email address.
 * @param password {string} The Users password.
 * @param partition {undefined|string} The Partition that the User has signed up within.
 *
 * @returns {Promise<ISignUpResult>}
 */
function signUp(username, password, partition = undefined) {
  const params = {
    username,
    password,
    attributes: {
      email: username,
    },
    clientMetadata: {
      partition: partition,
    },
  };

  console.log(`## SIGN UP PARAMS`);
  console.log(params);

  return Auth.signUp(params);
}

/**
 * Confirm the SignUp.
 *
 * @param username {string} the email address
 * @param code {string} 6 digit confirmation code
 * @param partition {string|undefined} the partition name i.e. `eventheads`
 * @returns {Promise<any>}
 */
function confirmSignUp(username, code, partition = undefined) {
  const options = {
    clientMetadata: {
      partition: partition,
    }
  };

  return Auth.confirmSignUp(username, code, options)
}

/**
 * Resend the SignUp.
 *
 * username should be an email.
 *
 * @param username {string}
 * @returns {Promise<any>}
 */
function resendSignUp (username) {
  return Auth.resendSignUp(username)
}

/**
 * Send a ForgotPassword request to Amplify/Cognito.
 *
 * username should be an email.
 *
 * @param username
 * @returns {Promise<any>}
 */
function forgotPassword (username) {
  return Auth.forgotPassword(username)
}

function confirmNewPassword(username, code, password) {
  return Auth.forgotPasswordSubmit(username, code, password)
}

function signOut() {
  return Auth.signOut()
}

function getUser() {
  return Auth.currentAuthenticatedUser()
}

function getUserSession() {
  return Auth.currentSession()
}

async function getIdToken() {

  let session;
  try {
    session = await Auth.currentSession();
  } catch(e) {
    return null; // There is no session
  }

  const idTokenExpire = session.getIdToken().getExpiration();
  const refreshToken = session.getRefreshToken();
  const currentTimeSeconds = Math.round(+new Date() / 1000);

  if (idTokenExpire > currentTimeSeconds) {
    return session.getIdToken().getJwtToken();
  }

  const user = await getUser();

  return new Promise((resolve, reject) => {
    user.refreshSession(refreshToken, (err, data) => {
      if (err) {
        reject('user-could-not-get-a-cognito-session-or-valid-token.');
        return;
      }
      resolve(data.getIdToken().getJwtToken());
    });
  });

}

async function changePassword(user, oldPassword, newPassword) {
  return Auth.changePassword(user, oldPassword, newPassword);
}

async function rememberDevice() {
  return Auth.rememberDevice();
}

async function forgetDevice() {
  return Auth.forgetDevice();
}

async function fetchDevices() {
  return Auth.fetchDevices();
}

export {
  getUser,
  signUp,
  confirmSignUp,
  resendSignUp,
  forgotPassword,
  confirmNewPassword,
  signIn,
  signOut,
  completeNewPassword,
  getUserSession,
  getIdToken,
  changePassword,
  rememberDevice,
  fetchDevices,
  forgetDevice
}
