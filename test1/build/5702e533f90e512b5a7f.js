import"core-js/modules/es6.object.to-string.js";import"core-js/modules/es6.promise.js";import"./index.css";import{mode}from"./js/test_tree_shaking.js";var a=1;function add(o,e){return o+e}console.log("index.js文件被调用了"),console.log(mode(7,2)),new Promise((function(o){console.log("reslove")}));