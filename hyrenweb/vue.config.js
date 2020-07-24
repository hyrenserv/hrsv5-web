module.exports = {
	publicPath: './',
	outputDir: 'dist',
	assetsDir: 'static',
	productionSourceMap: false,
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
			},
			'/C': {
				target: process.env.VUE_APP_HRDS_C_API, // 目标 API 地址
				changeOrigin: true, // 允许websockets跨域
				ws: true,
				pathRewrite: {
					'^/C': '/C/action/hrds/c/biz'
				}
			},
			'/K': {
				target: process.env.VUE_APP_HRDS_K_API, // 目标 API 地址
				changeOrigin: true, // 允许websockets跨域
				ws: true,
				pathRewrite: {
					'^/K': '/K/action/hrds/k/biz'
				}
			},
			'/H': {
				target: process.env.VUE_APP_HRDS_H_API, // 目标 API 地址
				changeOrigin: true, // 允许websockets跨域
				ws: true,
				pathRewrite: {
					'^/H': '/H/action/hrds/h/biz'
				}
			},
			'/G': {
				target: process.env.VUE_APP_HRDS_G_API, // 目标 API 地址
				changeOrigin: true, // 允许websockets跨域
				ws: true,
				pathRewrite: {
					'^/G': '/G/action/hrds/g/biz'
				}
			}
		}
	}
};
