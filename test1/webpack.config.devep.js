/**
HMR功能
*/
const {resolve}=require('path')
const MiniCssExtractPlugin= require('mini-css-extract-plugin')
module.exports={
	entry:'./index.js',
	output:{
		filename:'build.js',
		path:resolve(__dirname,'build')
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:[
					//'style-loader',
					
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			// {
			// 	test:/\.js$/,
			// 	exclude:/node_modules/,
			// 	loader:'eslint-loader',
			// 	options:{
			// 		fix:true
			// 	}
			// },
			{
				test:/\.js$/,
				exclude:/node_modules/,

				use:[
//				    {
//				        loader:'thread-loader',
//				        options:{
//				            worker:2 //进程2个
//				        }
//				    },
				    {
				    loader:'babel-loader',
				    options:{
					presets:['@babel/preset-env']
				}
				    }
				]

			}
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader:'babel-loader',
				options:{
					presets:[
					['@babel/preset-env',
						{
							//按需加载
							useBuiltIns:'usage',
							// corejs:{
							// 	vesion:2
							// },
							//指定兼容性做到哪个版本浏览器
							targets:{
								chrome:'60',
								firefox:'60',
								ie:'9',
								safari:'10',
								edge:'17'
							}
						}
					]
					]
				}
			}
		]
	},
	plugins:[
		new MiniCssExtractPlugin({
			filename:'css/build.css'
		})
	],
	mode:'development',
	devServer:{
		contentBase:resolve(__dirname,'build'),
		compress:true,
		port:3000,
		open:true,
		//开启HMR功能
		//当webpackage配置文件修改后需要重新启动
		//hot:true
	}
}