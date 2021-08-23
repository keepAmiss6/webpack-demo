/**
两个注意事项：
1、eslint不认识window、navigator全局变量
解决：需要修改package.json中eslint配置
 "eslintConfig": {
    "extends": "airbnb-base",
    "env": {
      "browser": true
    }
  },

 2、sw代码必须运行再服务器上，所以测试的使用需要有服务器环境，可以有两种方式生成服务器环境
 1) 写node
 2）npm i serve -g
    serve -s build 启动服务器，将build目录下所有资源作为静态资源暴露出去

*/
// 先处理兼容性问题,如果可使用serviceWorker就注册
if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('/service-worker.js')
        .then(()=>{
            console.log('sw注册成功了，可以离线访问了')
        }).catch(()=>{
            console.log('sw注册失败')
        })
    })
}