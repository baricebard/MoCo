// sensors.js
class SensorManager {
    constructor() {
        this.sensorData = {
            x: 0,
            y: 0,
            z: 0,
            alpha: 0,
            beta: 0,
            gamma: 0,
            timestamp: Date.now()
        };
        
        this.init();
    }

    init() {
        // 檢查瀏覽器支援性
        if (!this.isSensorsSupported()) {
            alert('您的瀏覽器不支援裝置感測器');
            return;
        }
        
        this.startSensors();
    }

    isSensorsSupported() {
        return 'DeviceMotionEvent' in window && 'DeviceOrientationEvent' in window;
    }

    // DeviceMotionEvent
    startSensors() {
        // 加速度感測器
        window.addEventListener('devicemotion', (event) => {
            const acceleration = event.accelerationIncludingGravity;
            
            this.sensorData.x = this.roundValue(acceleration.x);
            this.sensorData.y = this.roundValue(acceleration.y);
            this.sensorData.z = this.roundValue(acceleration.z);
            this.sensorData.timestamp = Date.now();
            
            this.updateDisplay();
            this.updateJSONOutput();
        });

        // 方向感測器
        window.addEventListener('deviceorientation', (event) => {
            this.sensorData.alpha = this.roundValue(event.alpha);  // 0-360度
            this.sensorData.beta = this.roundValue(event.beta);    // -180到180度
            this.sensorData.gamma = this.roundValue(event.gamma);  // -90到90度
            
            this.updateDisplay();
            this.updateJSONOutput();
        });
    }

    roundValue(value) {
        return value ? Math.round(value * 100) / 100 : 0;
    }

    // 更新DOM元素與JSON顯示
    updateDisplay() {
        // 更新數值顯示
        document.getElementById('x').textContent = this.sensorData.x;
        document.getElementById('y').textContent = this.sensorData.y;
        document.getElementById('z').textContent = this.sensorData.z;
        document.getElementById('alpha').textContent = this.sensorData.alpha;
        document.getElementById('beta').textContent = this.sensorData.beta;
        document.getElementById('gamma').textContent = this.sensorData.gamma;
    }

    updateJSONOutput() {
        const jsonOutput = document.getElementById('jsonOutput');
        const formattedJSON = {
            motion: {
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
            },
            timestamp: this.sensorData.timestamp,
            deviceInfo: this.getDeviceInfo()
        };
        
        jsonOutput.textContent = JSON.stringify(formattedJSON, null, 2);
    }

    getDeviceInfo() {
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            timestamp: new Date().toISOString()
        };
    }


}