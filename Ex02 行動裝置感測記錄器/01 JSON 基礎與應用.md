# JSON 資料格式基礎
目標：掌握 JSON 的基礎知識  

## JSON 簡介
通訊協定常用的一種資料交換格式

### 什麼是 JSON？
- JSON = JavaScript Object Notation
- 輕量級的資料交換格式
- 易於人類閱讀和編寫
- 易於機器解析和生成  

### 特點：
- 純文字格式
- 語言無關
- 層次結構清晰

## JSON 基本結構
兩種主要結構：
1. 物件 (Object) - 用大括號 {}
2. 陣列 (Array) - 用中括號 []  

```json
// 物件範例
{
  "name": "小明",
  "age": 25,
  "isStudent": false
}

// 陣列範例
["蘋果", "香蕉", "橘子"]
```

## JSON 資料類型
支援的資料類型：
- 字串 (String)："hello"
- 數字 (Number)：123、3.14
- 布林值 (Boolean)：true、false
- 空值 (Null)：null
- 物件 (Object)：{...}
- 陣列 (Array)：[...]   
```json
{
  "string": "文字資料",
  "number": 42,
  "float": 3.14159,
  "boolean": true,
  "nullValue": null,
  "object": {
    "key": "value"
  },
  "array": [1, 2, 3]
}
```
## 範例
個人資料範例：  
```json
{
  "person": {
    "name": "王小明",
    "age": 30,
    "hobbies": ["閱讀", "游泳", "攝影"],
    "address": {
      "city": "台北市",
      "district": "大安區"
    },
    "isEmployed": true
  }
}
```
產品清單範例：  
```json
{
  "products": [
    {
      "id": 1,
      "name": "筆記型電腦",
      "price": 29900,
      "inStock": true
    },
    {
      "id": 2,
      "name": "滑鼠",
      "price": 590,
      "inStock": false
    }
  ]
}
```  

## 常見應用與注意事項
常見應用場景：
- API 資料傳輸
- 設定檔案
- 資料儲存

重要規則：
- 鍵名必須用雙引號
- 最後一個項目不能有逗號
- 字串必須用雙引號

```json
// 正確
{
  "name": "小明",
  "age": 20
}

// 錯誤
{
  name : "小明",  // 鍵名缺少雙引號
  "age": 20,     // 最後多餘的逗號
}
```

<details>
試著建立一個 JSON 物件來描述一本書：
- 書名
- 作者
- 出版年
- 標籤（陣列）
- 是否有庫存
  <summary>參考答案</summary>

```Json
{
  "title": "JavaScript 程式設計",
  "author": "張大師",
  "year": 2023,
  "tags": ["程式設計", "網頁開發", "JavaScript"],
  "inStock": true
}
```
</details>