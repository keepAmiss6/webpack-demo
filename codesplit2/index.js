//import {mode} from './test.js'
// import '@babel/polyfill'
import $ from 'jquery'


// 通过js代码，让某个文件单独打包成一个thunk文件
//import 动态导入语法：能将文件单独打包
// webpackChunkName决定最后打包输出的名字
import(/*webpackChunkName:'test'*/'./test').then(({mode})=>{
    console.log('调用test.js',mode(7,2))
    console.log('load success test.js',reslove)
}).catch(()=>{
    console.log('load fail test.js')
})
// eslint-disable-next-line
console.log($)
const a=1;
console.log('index.js文件被调用了');
function add(x, y) { return x + y; }
new Promise((reslove) => {
  console.log('reslove');
});
