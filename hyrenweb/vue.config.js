module.exports = {
	lintOnSave: process.env.NODE_ENV === 'development',
	devServer: {
	    // port: port,
	    open: true,
	    https: false,
	    overlay: {
	      warnings: false,
	      errors: true
	    },
	    proxy: {
			//工程 A 代理配置规则
	      '/hrds_A': {
	        target: process.env.VUE_APP_HRDS_A_API,	// 目标 API 地址
	        changeOrigin: true,	// 允许websockets跨域
	        ws: true,
	        pathRewrite: {
	          '^/hrds_A': ''
	        }
		  },
		  '/hrds_B': {
	        target: process.env.VUE_APP_HRDS_B_API,	// 目标 API 地址
	        changeOrigin: true,	// 允许websockets跨域
	        ws: true,
	        pathRewrite: {
	          '^/hrds_B': ''
	        }
	      }
	    }
	  }
}
