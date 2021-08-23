/**
使用dll技术，对某些库（第三方库，jquery、react、vue....）进行单独打包；
当运行webapck命令打包时，默认查找 webpack.config.js文件
需要：需要运行webpack.dll.js文件 单独打三方包插件且生成mainfest.json文件，
使用这个命令 webpack --config webpack.dll.js
*/

const {resolve} = require('path')
const webpack = require('webpack')
module.exports={
    entry:{
        // 最终打包生成的[name]叫jquery
        //['jquery']表示要打包的库是jquery
        jquery:['jquery']
    },
    output:{
        filename:'[name].js',
        path:resolve(__dirname,'dll'),
        library:'[name]_[hash]' //打包的库里面向外暴露出去的内容叫什么名字
    },
    plugins:[
        // Dllplugin这个插件打包生成一个mainfest.json,这个文件提供和单独打的三方包（例如jquery）映射关系
        // 有了这个映射关系，webpack打包的时候就会从这里找，如果有，就不会打包了（但是webpack.config.js也需要改配置）
        new webpack.DllPlugin({
            name:'[name]_[hash]',//映射库里暴露的内容名称
            path:resolve(__dirname,'dll/manifest.json') //输出文件路径
        })
    ]
}