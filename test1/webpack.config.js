// 配置生产环境
const {resolve} = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//报错暂时没有找到解决方案，先注释了
//const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const commcss = [//把css文件提取成单独的文件
				MiniCssExtractPlugin.loader,
				'css-loader',
				{
					// css兼容性处理
					loader:'postcss-loader',
					options:{
						// ident:'postcss',
						// plugins:()=>{require('postcss-preset-env')()}
					 postcssOptions: {
		                plugins: [
		                  [
		                    'postcss-preset-env',
		                    {
		                      // 其他选项
		                    },
		                  ],
		                ]
              		},
					}
				}];
process.env_NODE_ENV='production';
module.exports={
	entry:'./index.js',
	output:{
		filename:'js/build.[contenthash:10].js',
		path:resolve(__dirname,'build')
	},
	module:{
		rules:[
		/**
			正常来讲，一个文件只能被一个loader处理，当一个文件要被多个loader处理时，那么一定要指定loade执行的先后顺序；
			先执行eslint在执行babel，在eslint的配置项中添加enforce:'pre'
			*/
		//			{
//				test:/\.js$/,
//				exclude:/node_modules/,
//				loader:'eslint-loader',
//				enforce:'pre',
//				options:{
//					fix:true
//				}
//			},
		{
		    // 以下loader只会配置一个
		    // 注意：使用oneOf时不能处理同一种类型的文件,所以需要处理js的1个loader提取出去，不放在oneOf里面
			oneOf:[
			    {
				test:/\.css$/,
				use:[...commcss]
			},
			{
				test:/\.less$/,
				use:[...commcss,'less-loader']
			},
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
					],
					// 开启babel缓存，第二次构建的时候，会读取之前的缓存
					cacheDirectory:true
				}
			},
			{
				//处理css中的图片
				test:/\.(jpg|png|gif)$/,
				loader:'url-loader',
				options:{
					limit:8*1024,
					esModule:false,
					name:'[hash:10].[ext]'
				}
			},
			{
				//处理html中的图片
				test:/\.html$/,
				loader:'html-loader'
			},
			{
				exclude:/\.(css|less|js|html|jpg|png|gif)/,
				loader:'file-loader'
			}
			]
			}
		]
		
	},
	plugins:[
		//把css文件提取成单独的文件
		new MiniCssExtractPlugin({
			filename:'css/build.[contenthash:10].css'
		}),
		//压缩css文件
		//new OptimizeCssAssetsWebpackPlugin(),
		new HtmlWebpackPlugin({
			template:'index.html',
            //压缩html
            minify:{
            //移除空格
                collapseWhitespace:true,
            //移除注释            
                removeComments:true
            }
		})
	],
	mode:'production',
//	devtool:'inline-source-map'
	devtool:'source-map'
}
