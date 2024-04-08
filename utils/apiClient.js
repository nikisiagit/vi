import {
  // getUser,
  // getUserSession,
  getIdToken
} from "./auth";

/**
 * @param axios
 * @param apiBaseUrl
 * @param isPublic
 * @returns {*}
 */
export function createAxios(axios, apiBaseUrl, isPublic = false){
  console.log("## CREATE AXIOS CLIENT: ", apiBaseUrl)

  const api = axios.create({
    baseURL: apiBaseUrl,
    timeout: 5000,
  })

  api.onRequest(async (config) => {
    if (isPublic) {
      return config;
    }

    /**
     * When api client requires token like (protected api, admin, content-hub app, etc)
     */
    const idToken = await getIdToken();
    if(idToken) {
      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;

    // return new Promise((resolve) => {
    //   getUserSession()
    //     .then((session) => {
    //       const idTokenExpire = session.getIdToken().getExpiration();
    //       const refreshToken = session.getRefreshToken();
    //       const currentTimeSeconds = Math.round(+new Date() / 1000);
    //
    //       if (idTokenExpire < currentTimeSeconds) {
    //         getUser()
    //           .then((res) => {
    //             res.refreshSession(refreshToken, (err, data) => {
    //               if (err) {
    //                 throw new Error('user-could-not-get-a-cognito-session-or-valid-token.')
    //               } else {
    //                 config.headers.Authorization = "Bearer " + data.getIdToken().getJwtToken();
    //                 resolve(config);
    //               }
    //             });
    //           });
    //       } else {
    //         config.headers.Authorization = "Bearer " + session.getIdToken().getJwtToken();
    //          resolve(config);
    //       }
    //     })
    //     .catch(() => {
    //       // No logged-in user: don't set auth header
    //        resolve(config);
    //     });
    // })

  })

  return api
}
