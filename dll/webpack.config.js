const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
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
		}),
		//DllReferencePlugin这个插件告诉webpack那些库不参与打包，同时使用时的名称也得变
		//从manifest.json文件中找不需要参与打包的文件
		new webpack.DllReferencePlugin({
		    manifest:resolve(__dirname,'dll/manifest.json')
		}),
		//DllReferencePlugin只是说让webpack不打包，但是要使用jquery时，不进包里是无法使用的
		//所以还需要另外一个插件AddAssetHtmlWebpackPlugin，他的作用就是将某个文件打包输出，并在html中自动引入改资源（类似externals方案中使用cdn引入）
		// 待解决问题：在html中自动引入会多加一层auto，导致文件引用不到？
        new AddAssetHtmlWebpackPlugin({
            filepath:resolve(__dirname,'dll/jquery.js')
        })
	],
	mode:'production',
	devtool:'source-map'
}
