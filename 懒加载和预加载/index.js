//import {mode} from './test.js'


//配置test.js文件预加载
document.getElementById('btn').onclick=function(){
    import(/*webpackChunkName:'test',webpackPrefetch:true*/'./test').then(({mode})=>{
    console.log('load success test.js')
    }).catch(()=>{
    console.log('load fail test.js')
    })
}
