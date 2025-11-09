//1121
class SensorManager {
    constructor() {
        this.sensorData = {
            x: 0, y: 0, z: 0,
            alpha: 0, beta: 0, gamma: 0,
            timestamp: Date.now()
        };
    }

    async init() {
        if (!this.isSensorsSupported()) {
            alert('您的瀏覽器不支援裝置感測器');
            return;
        }

        const ok = await this.requestPermissionIfNeeded();
        if (ok) this.startSensors();
    }

    isSensorsSupported() {
        return 'DeviceMotionEvent' in window && 'DeviceOrientationEvent' in window;
    }

    async requestPermissionIfNeeded() {
        try {
            if (typeof DeviceMotionEvent.requestPermission === 'function') {
                const res = await DeviceMotionEvent.requestPermission();
                if (res !== 'granted') {
                    alert('需要授權才能讀取加速度資料');
                    return false;
                }
            }
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                const res = await DeviceOrientationEvent.requestPermission();
                if (res !== 'granted') {
                    alert('需要授權才能讀取方向資料');
                    return false;
                }
            }
            return true;
        } catch (err) {
            console.error('Permission error:', err);
            return false;
        }
    }

    startSensors() {
        window.addEventListener('devicemotion', (event) => {
            const acc = event.accelerationIncludingGravity;
            if (!acc) return;
            this.sensorData.x = this.round(acc.x);
            this.sensorData.y = this.round(acc.y);
            this.sensorData.z = this.round(acc.z);
            this.sensorData.timestamp = Date.now();
            this.updateDisplay();
            this.updateJSONOutput();
        });

        window.addEventListener('deviceorientation', (event) => {
            this.sensorData.alpha = this.round(event.alpha);
            this.sensorData.beta = this.round(event.beta);
            this.sensorData.gamma = this.round(event.gamma);
            this.updateDisplay();
            this.updateJSONOutput();
        });
    }

    round(v) {
        return v ? Math.round(v * 100) / 100 : 0;
    }

    updateDisplay() {
        ['x','y','z','alpha','beta','gamma'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = this.sensorData[id];
        });
    }

    updateJSONOutput() {
        const el = document.getElementById('jsonOutput');
        if (!el) return;
        el.textContent = JSON.stringify(this.sensorData, null, 2);
    }
}
