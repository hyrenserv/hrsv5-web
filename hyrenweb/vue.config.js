module.exports = {
    publicPath: './',
    outputDir:'dist',
    assetsDir:'static',
	lintOnSave: process.env.NODE_ENV === 'development',
	devServer: {
	    // port: port,
	    open: false,
	    https: false,
	    overlay: {
	      warnings: false,
	      errors: true
	    },
	    proxy: {
			//工程 A 代理配置规则
	      '/A': {
	        target: process.env.VUE_APP_HRDS_A_API,	// 目标 API 地址
	        changeOrigin: true,	// 允许websockets跨域
	        ws: true,
	        pathRewrite: {
	          '^/A': '/A/action/hrds/a/biz'
	        }
		  },
		  '/B': {
	        target: process.env.VUE_APP_HRDS_B_API,	// 目标 API 地址
	        changeOrigin: true,	// 允许websockets跨域
	        ws: true,
	        pathRewrite: {
	          '^/B': '/B/action/hrds/b/biz'
	        }
	      }
	    }
	  }
}
