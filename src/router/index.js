import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import { userInfoUpdate } from "../components/util"

import Home from '../components/pages/Home'
import Login from '../components/pages/Login'
import Register from '../components/pages/Register'
import TagsManagement from '../components/pages/TagsManagement'
import PositionView from '../components/pages/PositionView'
import AllPosition from '../components/pages/AllPosition'

Vue.use(Router)

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/tags', component: TagsManagement, meta: { requireAuth: true } },
  { path: '/position/:update?', component: PositionView,  meta: { requireAuth: true }},
  { path: '/position-all', component: AllPosition,  meta: { requireAuth: true }},
];

const router = new Router({ routes });

var isFirstRun = true;

router.beforeEach(async (to, from, next) => {
  if (isFirstRun) {
    await userInfoUpdate();
    isFirstRun = false;
  }
  if (to.matched.some(r => r.meta.requireAuth)) {
      if (store.state.user.data.userType >= 0) {
          next();
      }
      else {
          next({
              path: '/login',
              query: {redirect: to.fullPath}
          })
      }
  }
  else {
      next();
  }
})

export default router;