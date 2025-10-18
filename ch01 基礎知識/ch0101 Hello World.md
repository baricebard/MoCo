# Hellow World
- 需要一個工作環境來運行 JavaScript
- 很多環境都能執行 JavaScript，我們使用瀏覽器 Chrome
## `<Sciprt>` 標籤
- 在 HTML 檔案裡的 `<Sciprt>` 標籤，可以執行 JavaScript
- 可以放在 HTML 的任何位置，例如
```html
<!DOCTYPE HTML>
<html>
<body>
  <p>Before the script...</p>
  <script>
    alert( 'Hello, world!' );
  </script>
  <p>...After the script.</p>
</body>
</html>
```  
### `<Script>` 標籤屬性
有些屬性已經過時了
- 屬性 type: `<script type="text/javascript">`  
- 屬性 language: `<script language="javascript">`
- 用 HTML 標籤注解的 JavaScript 程式碼
    ```HTML
    <script type="text/javascript">
    <!--
    ...
    //-->
    </script>
    ```
### 外部的 Script 
現在的專案裡，希望把程式碼和標籤分離
```html
<script src="/path/to/script.js"></script>
```  
`/path/to/script.js` 是從網站根目錄到腳本的絕對路徑  
也可以提供從目前頁面開始的相對路徑，比如 `src="script.js"` 或 `src="./script.js"`  
使用 CDN 來加速
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>
```
附加多個腳本，須使用多個標籤
```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
```
Script 放在 HTML 裡面的好處：每次改動只需要重新載入就生效  
Script 放在單獨 js 檔案的好處：會有緩存，只需要載入一次  

問題，下面的程式碼，哪個會生效
```html
<script src="file.js">
  alert(1); 
</script>
```
因此需要兩種時，要分開
```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
## 總結
- 使用 `<script>` 來執行頁面中的 JavaScript 程式碼
- 舊的屬性 `type` 和 `language` 不再使用
- 可使用外部檔案 js 來載入 JavaScript

# 任務
## 顯示一個 alert  
建立一個頁面，用 alert 顯示訊息"我是 JavaScript！"。  
- 參考答案
  ```html
  <!DOCTYPE html>
  <html>
  <body>

    <script>
      alert( "I'm JavaScript!" );
    </script>
  </body>

  </html>
  ```
## 使用外部 js 腳本 顯示 alert
接續上一題，把 alert 搬到外部檔案 js/alert.js 裡面。
<details>
<summary>參考答案</summary>
  ```html html
  <!DOCTYPE html>
  <html>
  <body>
    <script src="js/alert.js"></script>
  </body>
  </html>
  ```
  ```javascript alert.js
  alert("I'm JavaScript!");
  ```
  </detail>