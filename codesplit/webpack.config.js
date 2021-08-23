const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
process.env_NODE_ENV='production';
module.exports={
    // 单入口
	//entry:'./index.js',
	//多入口：有一个入口最终输入就会有一个bundle
	entry:{
	    main:'./index.js',
	    test:'./test.js'
	},
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
	mode:'production',
}
