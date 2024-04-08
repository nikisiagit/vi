export default function createWebSocketPlugin(socket, store) {
  // attach various callbacks to the socket.
  console.log("RUN createWebSocketPlugin", )

  /**
   * onOpen
   */
  socket.onOpen = (/* event */) => {
    store.dispatch("socket/onOpen");
  };




  // /**
  //  * onMessage
  //  *
  //  * Store the raw MessageEvent
  //  *
  //  * @param message {MessageEvent}
  //  */
  // socket.onMessage = (message) => {
  //   store.dispatch("socket/onMessage", message);
  // };

  /**
   * onClose
   *
   * @param message
   */
  socket.onClose = (message) => {
    console.log("### WS Plugin onClose");
    console.log(message);

    store.dispatch("socket/onClose");
  };

  /**
   * onError
   *
   * @param message
   */
  socket.onError = (message) => {
    console.log("### WS Plugin onError");
    console.log(message);

    store.dispatch("socket/onError");
  };

  store.subscribe((mutation, state) => {
    // @todo: here uncomment
    // if (mutation.type === "me/me" && state.me.me !== undefined) {
    //   console.log(state.me.me, "Me profile store in vuex");
    //   wsInit(socket, store);
    // }
  });

  //@Example
  //@todo: example: '{"action":"user-connected","userID":1}'
  // socket.addVuexListener("hello-world", (data) => {
  //   console.log("[Vuex]: Data from region-created: ", data);
  //
  //   // dispatch action to the store after receiving the message from the socket
  //   store.dispatch("regions/addRegion", {});
  // });
  //
  // //@Example: intercept actions that needs to sendMessage in the websocket
  // store.subscribe((mutation, state) => {
  //   console.log(
  //     "access to vuex state [DO NOT modified the state from here. Just readonly]",
  //     state
  //   );
  //
  //   if (mutation.type === "regions/regionCreated") {
  //     socket.sendMessage("region-created", { regionId: 123 });
  //   }
  // });
}

function wsInit(socket, store) {
  // socket
  // socket.addVuexListener("socket", (data) => {
  //   console.log(`## STORE SOCKET ##`);
  //   console.log(data);
  // });

  // users
  // socket.addVuexListener("users", (data) => {
  //   // console.log(`## STORE USERS ##`);
  //   // console.log(data);
  //
  //   if (data.type !== "users") {
  //     return;
  //   }
  //
  //   const { subtype } = data;
  //
  //   switch (subtype) {
  //     case "user_enabled": {
  //       store.dispatch("users/userEnabledUpdated", data);
  //       break;
  //     }
  //     case "user_deleted": {
  //       store.dispatch("users/userDeleted", data);
  //       break;
  //     }
  //     default: {
  //       console.log(`${subtype} not recognised`);
  //     }
  //   }
  // });

  // events
  // socket.addVuexListener("events", (data) => {
  //   if (data.type !== "events") {
  //     return;
  //   }
  //
  //   const { subtype } = data;
  //
  //   switch (subtype) {
  //     case "events_created": {
  //       break;
  //     }
  //     case "event_deleted": {
  //       break;
  //     }
  //     default: {
  //       console.log(`${subtype} not recognised`);
  //     }
  //   }
  // });

  // users
  // socket.addVuexListener("users", (data) => {
  //   console.log(`## SOCKET VUEX PROFILE ###`);
  //   console.log(data);
  //
  //   const { subtype } = data;
  //
  //   switch (subtype) {
  //     case "profile_connected": {
  //       store.dispatch("users/profileConnected", data);
  //       break;
  //     }
  //     case "profile_disconnected": {
  //       store.dispatch("users/profileDisconnected", data);
  //       break;
  //     }
  //     default: {
  //       console.log(`${subtype} not recognised`);
  //     }
  //   }
  // });


}
