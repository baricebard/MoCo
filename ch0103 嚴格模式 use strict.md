# 嚴格模式 use strict
JavaScript 一直在進步，也向前相容  
使用嚴格模式 `"use strict"` 可以避免向前相容所產生的問題  
嚴格模式，指的是使用 2009 年 ECMAScript 5（ES5）的語法及功能，不 100% 向前相容  
只能放在第一行  
```javascript
"use strict";
// 從這裡以後的程式碼都是嚴格模式
```
沒有放在第一行，這是不行的  
```javascript
alert("some code");
// "use strict" 一定要放在第一行
"use strict";
// 這段程式碼的嚴格模式不生效
```  
設定嚴格模式之後，就不能再取消  
DevTools 裡面的 Console 也能用 "use strict"  
以前有一種嚴格模式的寫法，現在也很常見
```javascript
(function() {
  `use strict`;
  // 這裡是你的程式碼
})()
```
當你使用 classes 和 modules 時，自動昇級為嚴格模式。

