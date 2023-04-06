import { RouterMount, createRouter } from 'uni-simple-router'
import permission from './permission'
const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  routes: [
    ...ROUTES,
    {
      path: '*',
      redirect: (to) => {
        return { path: 'pages/404/index' }
      }
    }
  ],
  debugger: false,
  routerBeforeEach: (to, from, next) => {
    // console.log('***routerBeforeEach***')
    next()
  },
  routerAfterEach: (to, from) => {
    // console.log('***routerAfterEach***')
  },
  routerErrorEach: (error, router) => {
    // console.log('***routerErrorEach***')
    err(error, router, true)
  },
  detectBeforeLock: (router, to, navType) => {
    // console.log('***detectBeforeLock***')
  },
  resolveQuery: (jsonQuery) => {
    // console.log('***resolveQuery***')
    jsonQuery
  },
  parseQuery: (jsonQuery) => {
    // console.log('***parseQuery***')
    jsonQuery
  }
})

permission(router)

export { router, RouterMount }
