export default function() {
  const subscriptions = {};
  return {
    subscribe: function(event, callback) {
      if(typeof subscriptions[event] === "undefined") {
        subscriptions[event] = [];
      }
      subscriptions[event].push(callback);
    },
    unsubscribe: function(event, callback) {
      if(!Array.isArray(subscriptions[event])) return;
      subscriptions[event] = subscriptions[event].filter(item => item !== callback);
    },
    emit: function(event, data) {
      if(Array.isArray(subscriptions[event])) {
        subscriptions[event].forEach(callback => callback(data));
      }
    }
  }
}
