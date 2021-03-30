import Vue from 'vue'
import Router from 'vue-router'
import A from './A'
import B from './B'
import C from './C'
import G from './G'
import H from './H'
import J from './J'
import K from './K'
import L from './L'
Vue.use(Router);
// 解决两次访问相同路由地址报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

/**
 *
 * 路由配置信息
 *  routes : [{这里的第一层表示为普通的路由地址,children : [{这个里面的是二级路由配置}]
 * 路由配置如 :
 *  {
 *      @param path: "/home"   表示的是路由匹配路径,
 *      @param name: 'home' 理由的名称
 *      @param component: () => import('@/hrds/login/index') 后面为路由地址的具体页面
 *  }
 *
 */
export default new Router({
    routes: [
        { path: '/', name: 'login', component: () => import('@/hrds/login/login.vue') },
        //菜单路由地址配置
        {
            path: "/home", name: 'home', component: () => import('@/hrds/components/menu'), children: [
                ...A,
                ...B,
                ...C,
                ...G,
                ...H,
                ...J,
                ...K,
                ...L,
            ]
        },
        { path: '*', name: '*', component: () => import('@/hrds/components/notFound.vue') },
        { path: '/interfaceTest', name: 'interfaceTest', title: '接口测试', component: () => import('@/hrds/g/serviceuser/interfaceTest.vue') },
        { path: '/showReleaseDashboard', name: 'showReleaseDashboard', title: '报表展示', component: () => import('@/hrds/g/serviceuser/showReleaseDashboard.vue') },
    ]
})