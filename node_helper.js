const Log = require('logger');
const NodeHelper = require('node_helper');
const { spawn } = require('child_process');
const path = require('path');

module.exports = NodeHelper.create({
  start () {
    Log.log('MMM-DHT22 helper started...');
  },

  socketNotificationReceived (notification, payload) {
    if (notification === 'START_DHT_READING') {
      this.readDHTSensor(payload.gpioPin);
    }
  },

  readDHTSensor (gpioPin) {
    const self = this;
    const scriptPath = path.join(__dirname, 'read_dht22_sensor.py');

    const pythonProcess = spawn('python3', [scriptPath, gpioPin]);

    pythonProcess.stdout.on('data', data => {
      try {
        const { temperature, humidity } = JSON.parse(data.toString());
        self.sendSocketNotification('DHT_DATA', { temperature, humidity });
      } catch (error) {
        Log.error('Error parsing data:', error);
      }
    });

    pythonProcess.stderr.on('data', data => {
      Log.error('Python process error:', data.toString());
    });

    pythonProcess.on('close', code => {
      Log.log(`Python process exited with code ${code}`);
    });
  },
});
