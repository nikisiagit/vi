function hasQueryParams(route) {
  return !!Object.keys(route.query).length
}

function hasParams(route) {
  return !!Object.keys(route.params).length
}

export default function ({ app, query, route }) {

  if (query['d']=== 'uni') {
    app.vuetify.framework.theme.themes.dark.primary =  '#22234E';
    app.vuetify.framework.theme.themes.light.primary = '#22234E';
  } else {
    // app.vuetify.framework.theme.themes.dark.primary =  '#121212';
    // app.vuetify.framework.theme.themes.light.primary = '#121212';
  }

  app.router.beforeEach((to, from, next) => {
    if(!hasQueryParams(to) && hasQueryParams(from)){
      next({name: to.name, query: from.query, params: to.params});
    } else {
      next()
    }
  })
}
