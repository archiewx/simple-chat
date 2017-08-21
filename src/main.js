// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons'
import app from './app'
import router from './router'
import store from './store'
// import mock from './mock'
import expUtils from './util'

// mock.bootstrap()

Vue.config.productionTip = false
Vue.component('icon', Icon)

Vue.use(expUtils)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<app/>',
  components: {app}
})
