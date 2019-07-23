简单易懂的表单验证
=====
1、简介
-----
很简单的js，能用来验证表单，能很方便的自定义自己用来提示错误的方法。同时也很容易自己自定义源码。
2、使用方式
-----
引入easyTest.js文件
```html
<input type="text" name="i1" />
<input type="text" name="i2" />
```
```javascript
//普通的
var options = {"event":"i1","context":"错误1，必须值","required":true};
easyTest(options);//这个方法会返回true或false的同时给出提示
//加reg多个的
var options2 = [{"event":"i1","context":"错误1，必须值","required":true},{"event":"i2","reg":/^\d{2}$/,"context":"错误2，匹配/^\d{2}$/错误","required":true}]
easyTest(options);
```
3、自定义自己的错误提示
-----
在easyTest.js文件里面添加自己的错误提示方法，比如文件里面已经有的`toast()`方法.
写好了`toast()`方法后，在文件最后的的这个数组里面把你的方法添加进去。
```javascript
var alertFunArr = [toast,alertDef];
```
然后调用easyTest()的时候需要加上type哦。
```javascript
easyTest(options,{type:0});
```
当然，方法默认type:0，所以只要你的错误方法放到数组的最前面，就不用特地写上type了。
4、之后会有的更新
-----
将会内置reg验证
