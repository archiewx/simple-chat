import Vue from 'vue'
import Router from 'vue-router'
import menus from '@/components/menus'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: menus,
      meta: {
        title: '示例列表'
      }
    },
    {
      path: '/exp/',
      component: menus,
      children: [
        {
          path: 'chat',
          component: r => require(['@/components/chat/main.vue'], r),
          meta: {
            title: 'vue 聊天'
          }
        },
        {
          path: 'ossupload',
          component: r => require(['@/components/oss/oss.vue'], r),
          meta: {
            title: 'oss 上传'
          }
        }
      ]
    }
  ]
})
