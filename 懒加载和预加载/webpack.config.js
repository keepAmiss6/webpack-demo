const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
process.env_NODE_ENV='production';
module.exports={
    // 单入口
	entry:'./index.js',
	output:{
	    //[name]:表示取文件的名称
		filename:'js/[name].[contenthash:10].js',
		path:resolve(__dirname,'build')
	},
	plugins:[
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
	//将node_modules中代码单独打包成一个chunk最终输出
	//它的作用就是把第三的包进行单独打包
	optimization:{
	    splitChunks:{
	        chunks:'all'
	    }
	},
	mode:'production',
	devtool:'source-map'
}
