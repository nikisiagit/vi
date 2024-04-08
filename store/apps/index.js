export const actions = {

  async reload (context) {
    console.log(`## APPS STORE LOADING`);
    await context.dispatch('load');
  },

  async load (context) {
    console.log(`## APPS STORE -  UNLOADING`);

    // the Apps that we are managing based on the Profile Roles
    const apps = [
      'admin',       // role:owner
      // 'organisers',  // role:organiser
      // 'content-hub', // role:owner or role:content-creator
    ];

    let on = [];
    const roles = this.getters['me/roles'];

    console.log(`## APPS STORE - ROLES `, roles);

    // loop through each of the roles and load/unload the relevant apps
    for (const role of roles) {
      // const {name} = role;
      const {roleId} = role;

      // if (name === 'owner') {
      if (roleId === 'role:owner') {
        on = apps;
        break;
      } else {
        on.push(roleId);
        // on.push(name);
      }
    }

    for (const app of apps) {
      if (! on.includes(app)) {
        await context.dispatch(`${app}/unload`);
      } else {
        await context.dispatch(`${app}/load`);
      }
    }
  },
}
