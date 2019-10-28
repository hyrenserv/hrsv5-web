import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

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
    mode: 'history',
    routes: [
        {
            path: '*',
            name: 'login',
            component: () => import('@/hrds/login/login.vue')
        },
        {
            path: '/',
            name: 'login',
            component: () => import('@/hrds/login/login.vue')
        },
        //菜单路由地址配置
        {
            path: "/home",
            name: 'home',
            component: () => import('@/hrds/components/menu'),
            children: [
                {
                    path: '/syspara',
                    name: 'syspara',
                    component: () => import('@/hrds/a/syspara/index.vue')
                },
                {
                    path: '/agentdeploy',
                    name: 'agentdeploy',
                    component: () => import('@/hrds/b/agentdeploy/agentdeploylist.vue')
                },
                {
                    path: '/collectmonitor',
                    name: 'collectmonitor',
                    title: '采集监控首页',
                    component: () => import('@/hrds/b/collectmonitor/collectmonitor.vue')
                },
                {
                    path: '/index1001',
                    name: ' index1001',
                    title: '数据源管理',
                    component: () => import('@/hrds/b/datasource/index1001.vue')
                },
                {
                    path: '/addScoure',
                    name: 'addScoure',
                    title: 'agent管理',
                    component: () => import('@/hrds/b/datasource/datasource.vue')
                }
            ]
        }
    ]
})
