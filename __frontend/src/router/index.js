import { createRouter, createMemoryHistory, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import notFound from '../views/404.vue'

import Post from '../views/posts/Post.vue'
import Article from '../views/articles/Article.vue'

import Steps from '../views/steps/Steps.vue'
import Step from '../views/steps/Step.vue'

import Android from '../views/android/android.vue'

import {store} from '../store'
import SETTINGS from '../settings'

const routerHistory = SETTINGS.APP_HISTORY ? createWebHashHistory() : createMemoryHistory() // createWebHashHistory createMemoryHistory createWebHistory

const router = createRouter({
    history: routerHistory,
    routes: [
      {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
          title: 'Login'
        }
      },
      {
        path: '/',
        component: Home,
        meta: {
          title: 'Home'
        },
        children: [{
          path: '',
          component: Post
        }, {
          path: 'post',
          components: {
            default: Post,
            helper: Article
          },
          meta: {
            title: 'profile'
          }
        }, {
          path: '/post/:Id',
          name: 'post',
          component: Post,
          meta: {
            title: 'Post'
          }
        },
        {
          path: '/android',
          name: 'android',
          component: Android,
          meta: {
            title: 'Android'
          }
        }
        ]
      },
      {
        path: '/steps',
        component: Steps,
        meta: {
          title: 'Home'
        },
        children: [{
          path: '/steps',
          components: {
            default: Step
          }
        },{
          path: '/steps/:Slug',
          components: {
            default: Step
          }
        }]
      },
      {
        path: '/:catchAll(.*)',
        component: notFound,
        meta: {
          title: '404'
        }
      }
    ]
  })

// Body class
router.afterEach((to) => {

  // Add a body class specific to the route we're viewing
  let body = document.querySelector('body')
  const slug = to.path === '/' ? 'home' : to.path.replace(/\//gi, '')
  body.className = 'vue--page--' + slug


})


router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    // Meta title
    document.title = 'EPYO | ' + to.meta.title 
  }

  window.scrollTo(0, 0);

  // Force to login
  if(!store.state.auth.account && to.name !== 'Login' ) {
    next('/login')
  } else {
    next()
  }


  // Force Lang
  if(store.state.auth.account.lang) document.documentElement.lang = store.state.auth.account.lang.toLowerCase().replace('_','-').trim()



  // Force disconnected if go to login
  if (to.name === 'Login') {

    // delete account
    setTimeout( ()=> store.dispatch('auth/disconnect'), 100 )
    
  }
})

export default router
