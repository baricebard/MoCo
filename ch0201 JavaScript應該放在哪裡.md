# Script 位置

1. `<script>` 應該放在哪裡？  
	HTML 中 `<script>` 標籤可以放在三個常見位置：  
   1. 在 `<head>` 中（未加 defer/async）  
      - 瀏覽器在讀取 HTML 時會 中斷解析，去下載並執行 JS，然後才繼續解析後續 DOM。  
      - 缺點：頁面渲染會被阻塞（阻塞渲染）。  
      - 用途：極少數情況需要 在頁面渲染前就執行 JS，例如 polyfill 或必須先載入的設定。  
   2. 在 `<head>` 中 + defer  
      - 瀏覽器會在 背景下載 JS，但等到 DOM 完全解析後 才依序執行。  
      - 不會阻塞 HTML 解析。  
      - 最佳實踐之一（適合大部分情境）。  
   3. 放在 `<body>` 結尾（`</body>` 前）  
      - 常見的早期做法，因為這樣可以讓 HTML 先載入，最後才執行 JS，避免阻塞頁面。  
      - 與 `<script defer>` 的效果類似，但 defer 更語意化，且能保持 `<head>` 結構清晰。  

	## ✅最佳實踐  
		現代網頁開發中，建議 將 `<script src="...">` 放在 `<head>`，並加上 defer。  
		原因：  
      - 保持結構清楚（所有資源宣告集中在 `<head>`）。  
      - 不阻塞 HTML parsing。  
      - 執行時機統一（DOM 解析完成後執行）。  

1. src 與 defer 的差異  
	(a) `<script src="index.js"></script>`	  
      - 預設為 同步下載 + 執行。  
      - HTML parsing 會被阻塞，直到該檔案下載並執行完。  
      - 適合一些 初始化必須先跑的 JS（例如 polyfill 或 analytics preload）。  

	(b) `<script src="index.js" defer></script>`  
      - 非阻塞下載，JS 會在背景載入。  
      - 等待整個 DOM 解析完成後才執行（但在 DOMContentLoaded 事件之前）。  
      - 多個 defer script 會 依照在 HTML 出現的順序執行。  
      - 最推薦的方式，因為能保證 DOM 可用，又不阻塞渲染。  
  
2. 總結  
   - 不加屬性（同步） → 阻塞 DOM parsing，不推薦，除非必須先執行。  
   - 加 defer → 最佳實踐，大部分情況都用這個。  
   - 加 async（你沒提到，但補充） → 下載後立即執行（不保證順序），適合獨立、不依賴 DOM 的 script（如廣告或統計程式碼）。  

3. 驗證方法  
	可以用瀏覽器的 開發者工具 (Chrome DevTools → Network & Performance tab) 驗證：  
   1. 在 HTML 中寫：  
	```html
	<script src="test1.js"></script>
	<script src="test2.js" defer></script>
	<script src="test3.js" async></script>
	```    
   2. 在每個 JS 裡加上：  
	```JavaScript
	console.log("test1 loaded");
	```  
   3. 開啟瀏覽器 DevTools → 看 Console 與 Performance Timeline：
      - 同步 script：阻塞 HTML parsing。
      - defer script：順序執行，且在 DOM 完成後。
      - async script：不一定順序，下載完成立即執行。
