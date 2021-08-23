const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
		}),
	],
	mode:'production',
	externals:{
	    //拒绝jQuery被打包进来，如果想使用可用jquery的cdn，在index.html入口文件引用
	    //jquery是名称 jQuery是npm包名
	    jquery:'jQuery'
	}
}
