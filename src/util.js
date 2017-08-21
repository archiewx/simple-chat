/**
 *  creator: zheng
 *  date: 2017/8/16
 *  email: zhenglfsir@gmail.com
 */
export function isEmptyObject (o) {
  for (let attr in o) {
    return !1
  }
  return !0
}

const install = function (Vue, options) {
  if (install.installed) return
  Vue.prototype.$exp = {isEmptyObject}
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
