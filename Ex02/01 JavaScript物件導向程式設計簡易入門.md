# JavaScript 物件導向程式設計簡易入門
第一部分：基礎物件導向概念  
第二部分：類別與繼承  
第三部分：非同步程式設計與物件導向  

## 第一部分：基礎物件導向概念  
1. 類別與建構函式  
```JavaScript
// 傳統建構函式寫法
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function() {
    return `Hello, my name is ${this.name}`;
};

// ES6 類別寫法
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Hello, my name is ${this.name}`;
    }
}

// 使用範例
const john = new Person("John", 25);
console.log(john.greet()); // "Hello, my name is John"
```
2. 封裝與存取器  
```JavaScript
class BankAccount {
    constructor(accountNumber, initialBalance = 0) {
        this._accountNumber = accountNumber;
        this._balance = initialBalance;
        this._transactions = [];
    }
    
    // Getter
    get balance() {
        return this._balance;
    }
    
    get accountNumber() {
        return this._accountNumber;
    }
    
    // 存款方法
    deposit(amount) {
        if (amount <= 0) {
            throw new Error("存款金額必須大於 0");
        }
        this._balance += amount;
        this._transactions.push({ type: 'deposit', amount, date: new Date() });
        return this._balance;
    }
    
    // 提款方法
    withdraw(amount) {
        if (amount <= 0) {
            throw new Error("提款金額必須大於 0");
        }
        if (amount > this._balance) {
            throw new Error("餘額不足");
        }
        this._balance -= amount;
        this._transactions.push({ type: 'withdraw', amount, date: new Date() });
        return this._balance;
    }
}

// 使用範例
const account = new BankAccount("123456", 1000);
account.deposit(500);
console.log(account.balance); // 1500
```

## 第二部分：類別與繼承  
1. 繼承與方法覆寫  
2. 靜態方法與屬性  

**1. 繼承與方法覆寫**  
```JavaScript
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }
    
    speak() {
        return `${this.name} makes a sound`;
    }
    
    eat(food) {
        return `${this.name} eats ${food}`;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name, "Dog");
        this.breed = breed;
    }
    
    // 方法覆寫
    speak() {
        return `${this.name} barks!`;
    }
    
    // 新增方法
    fetch(item) {
        return `${this.name} fetches the ${item}`;
    }
}

class Cat extends Animal {
    constructor(name, color) {
        super(name, "Cat");
        this.color = color;
    }
    
    speak() {
        return `${this.name} meows!`;
    }
    
    purr() {
        return `${this.name} purrs softly`;
    }
}

// 使用範例
const buddy = new Dog("Buddy", "Golden Retriever");
const whiskers = new Cat("Whiskers", "Orange");

console.log(buddy.speak()); // "Buddy barks!"
console.log(whiskers.speak()); // "Whiskers meows!"
console.log(buddy.fetch("ball")); // "Buddy fetches the ball"
```
**2. 靜態方法與屬性**   
```JavaScript
class MathHelper {
    // 靜態屬性
    static PI = 3.14159;
    
    // 靜態方法
    static calculateCircleArea(radius) {
        return this.PI * radius * radius;
    }
    
    static distance(point1, point2) {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

// 使用靜態方法（不需要實例化）
console.log(MathHelper.PI); // 3.14159
console.log(MathHelper.calculateCircleArea(5)); // 78.53975

const pointA = { x: 0, y: 0 };
const pointB = { x: 3, y: 4 };
console.log(MathHelper.distance(pointA, pointB)); // 5
```

## 第三部分：非同步程式設計與物件導向  
1. 在類別中使用 async/await  
2. 非同步建構函式模式  

**1. 在類別中使用 async/await**  
```JavaScript
class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    // 非同步方法
    async get(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('GET request failed:', error);
            throw error;
        }
    }
    
    async post(endpoint, data) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('POST request failed:', error);
            throw error;
        }
    }
}

// 使用範例
class UserService extends ApiClient {
    constructor() {
        super('https://jsonplaceholder.typicode.com');
    }
    
    async getUser(userId) {
        return await this.get(`/users/${userId}`);
    }
    
    async createUser(userData) {
        return await this.post('/users', userData);
    }
    
    async getUserWithPosts(userId) {
        try {
            // 並行執行多個非同步操作
            const [user, posts] = await Promise.all([
                this.getUser(userId),
                this.get(`/users/${userId}/posts`)
            ]);
            
            return {
                ...user,
                posts
            };
        } catch (error) {
            console.error('Failed to get user with posts:', error);
            throw error;
        }
    }
}

// 使用範例
async function demonstrateAsyncOOP() {
    const userService = new UserService();
    
    try {
        const user = await userService.getUser(1);
        console.log('User:', user);
        
        const userWithPosts = await userService.getUserWithPosts(1);
        console.log('User with posts:', userWithPosts);
    } catch (error) {
        console.error('Error:', error);
    }
}

// 執行範例
demonstrateAsyncOOP();
```

**2. 非同步建構函式模式**
```JavaScript
class DatabaseConnection {
    constructor(connectionString) {
        this.connectionString = connectionString;
        this.isConnected = false;
        // 注意：建構函式不能是 async，所以使用初始化方法
    }
    
    // 非同步初始化方法
    async connect() {
        try {
            // 模擬非同步連接操作
            await this.simulateConnection();
            this.isConnected = true;
            console.log('Database connected successfully');
        } catch (error) {
            console.error('Connection failed:', error);
            throw error;
        }
    }
    
    async simulateConnection() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 模擬 90% 的成功率
                Math.random() > 0.1 ? resolve() : reject(new Error('Connection timeout'));
            }, 1000);
        });
    }
    
    async query(sql) {
        if (!this.isConnected) {
            throw new Error('Database not connected');
        }
        
        // 模擬非同步查詢
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ rows: [`Result for: ${sql}`] });
            }, 500);
        });
    }
}

// 使用工廠模式建立非同步物件
class DatabaseFactory {
    static async createConnection(connectionString) {
        const db = new DatabaseConnection(connectionString);
        await db.connect();
        return db;
    }
}

// 使用範例
async function useDatabase() {
    try {
        const db = await DatabaseFactory.createConnection('mysql://localhost:3306/mydb');
        const result = await db.query('SELECT * FROM users');
        console.log(result.rows);
    } catch (error) {
        console.error('Database operation failed:', error);
    }
}

useDatabase();
```

## 總結
1. 類別與建構函式：使用 class 語法建立物件藍圖  
2. 封裝：使用 getter/setter 和私有方法保護資料  
3. 繼承：使用 extends 和 super 建立類別層級  
4. 靜態成員：屬於類別本身而非實例的方法和屬性  
5. 非同步方法：在類別方法中使用 async/await 處理非同步操作  
6. 非同步初始化：使用工廠模式或初始化方法處理非同步建構  

```JavaScript
```