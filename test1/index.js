import './index.css';
import {mode} from './js/test_tree_shaking.js'
// import '@babel/polyfill'

// eslint-disable-next-line
const a=1;
console.log('index.js文件被调用了');
console.log(mode(7,2))
function add(x, y) { return x + y; }
new Promise((reslove) => {
  console.log('reslove');
});
