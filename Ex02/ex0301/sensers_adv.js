// sensors.js - 完整版本
class SensorManager {
    constructor() {
        this.sensorData = {
            x: 0, y: 0, z: 0,
            alpha: 0, beta: 0, gamma: 0,
            timestamp: Date.now()
        };
        
        this.isRunning = false;
        this.dataHistory = [];
        this.maxHistorySize = 100;
        
        this.init();
    }

    init() {
        if (!this.isSensorsSupported()) {
            this.showError('您的瀏覽器不支援裝置感測器');
            return;
        }
        
        this.requestPermission();
    }

    async requestPermission() {
        try {
            // 在支援的瀏覽器中請求權限
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                const permission = await DeviceOrientationEvent.requestPermission();
                if (permission === 'granted') {
                    this.startSensors();
                }
            } else {
                this.startSensors();
            }
        } catch (error) {
            console.error('權限請求失敗:', error);
        }
    }

    startSensors() {
        // 加速度感測器
        window.addEventListener('devicemotion', (event) => {
            this.handleMotionEvent(event);
        });

        // 方向感測器
        window.addEventListener('deviceorientation', (event) => {
            this.handleOrientationEvent(event);
        });
        
        this.isRunning = true;
        console.log('感測器開始運作');
    }

    handleMotionEvent(event) {
        const acc = event.accelerationIncludingGravity;
        
        this.sensorData.x = this.roundValue(acc.x);
        this.sensorData.y = this.roundValue(acc.y);
        this.sensorData.z = this.roundValue(acc.z);
        this.sensorData.timestamp = Date.now();
        
        this.storeData();
        this.updateDisplay();
        this.updateJSONOutput();
    }

    handleOrientationEvent(event) {
        this.sensorData.alpha = this.roundValue(event.alpha);
        this.sensorData.beta = this.roundValue(event.beta);
        this.sensorData.gamma = this.roundValue(event.gamma);
        
        this.updateDisplay();
        this.updateJSONOutput();
    }

    storeData() {
        this.dataHistory.push({...this.sensorData});
        if (this.dataHistory.length > this.maxHistorySize) {
            this.dataHistory.shift();
        }
    }

    roundValue(value) {
        return value ? Math.round(value * 100) / 100 : 0;
    }

    updateDisplay() {
        const elements = ['x', 'y', 'z', 'alpha', 'beta', 'gamma'];
        elements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = this.sensorData[id];
            }
        });
    }

    updateJSONOutput() {
        const jsonOutput = document.getElementById('jsonOutput');
        const formattedJSON = {
            sensorData: {
                acceleration: {
                    x: this.sensorData.x,
                    y: this.sensorData.y,
                    z: this.sensorData.z,
                    unit: "m/s²"
                },
                orientation: {
                    alpha: this.sensorData.alpha,
                    beta: this.sensorData.beta,
                    gamma: this.sensorData.gamma,
                    unit: "degrees"
                }
            },
            metadata: {
                timestamp: this.sensorData.timestamp,
                isoTime: new Date().toISOString()
            }
        };
        
        jsonOutput.textContent = JSON.stringify(formattedJSON, null, 2);
    }

    isSensorsSupported() {
        return 'DeviceMotionEvent' in window && 'DeviceOrientationEvent' in window;
    }

    showError(message) {
        alert(message);
    }

    // 取得歷史資料
    getHistoricalData() {
        return this.dataHistory;
    }

    // 匯出資料為JSON
    exportData() {
        return JSON.stringify(this.dataHistory, null, 2);
    }
}

// 初始化感測器管理器
const sensorManager = new SensorManager();