import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/**
 * 
 * 路由配置信息
 *  routes : [{这里的第一层表示为普通的路由地址,children : [{这个里面的是二级路由配置,如果有三级等....路由同样如: children : [{三级路由配置}]}]}]
 * 路由配置如 : 
 *  {
 *      @param path: "/home"   表示的是路由匹配路径,
 *      @param name: 'home' 理由的名称,调整也可以使用
 *      @param component: () => import('@/hrds/views/login/index') 后面为路由地址的具体页面
 *  }
 * 
 */
export default new Router({
    mode: 'history',
    routes: [
        // {
        //     path: '*',
        //     name: 'login',
        //     component: () => import('@/hrds/views/login/index')
        // },
        {
            path: '/',
            name: 'login',
            component: () => import('@/hrds/views/login/index')
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
                    component: () => import('@/hrds/views/a/syspara/index')
                },
                {
                    path: '/agentdeploy',
                    name: 'agentdeploy',
                    component: () => import('@/hrds/views/b/agentdeploy/agentdeploylist')
                },
                {
                    path: '/collectmonitor',
                    name: 'collectmonitor',
                    title: '采集监控首页',
                    component: () => import('@/hrds/views/b/collectmonitor')
                }
            ]
        },
        {
            path: '/index1001',
            name: ' index1001',
            title: '1001登录首页',
            component: () => import('@/hrds/views/b/loginNum1001/index1001')
        },
        {
            path: '/addScoure',
            name: 'addScoure',
            title: '数据源跳转页面',
            component: () => import('@/hrds/views/b/addScoure/AgentList')
        }

    ]
})
