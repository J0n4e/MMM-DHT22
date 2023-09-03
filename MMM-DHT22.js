Module.register('MMM-DHT22', {
  defaults: {
    gpioPin: 6,
    fontSize: '16px',
    fontFamily: 'Arial',
    showThermometerIcon: true,
    showDropletIcon: true,
    showTemperatureText: true,
    showHumidityText: true,
    headerText: 'Local Temperature',
    updateInterval: 60,
    temperatureIconColor: 'red',
    humidityIconColor: 'blue',
    temperatureFontSize: '',
    humidityFontSize: '',
    temperatureUnit: 'C', // Default temperature unit (Celsius)
    temperatureOffset: 0, // Temperature offset adjustment in degrees Celsius
    humidityOffset: 0,    // Humidity offset adjustment in percentage points
  },

  start: function() {
    this.temperature = '';
    this.humidity = '';
    this.sendSocketNotification('START_DHT_READING', { gpioPin: this.config.gpioPin });

    const updateIntervalMillis = this.config.updateInterval * 1000;
    setInterval(() => {
      this.sendSocketNotification('START_DHT_READING', { gpioPin: this.config.gpioPin });
    }, updateIntervalMillis);
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === 'DHT_DATA') {
      if (payload.humidity >= 0 && payload.humidity <= 100) {
        // Apply calibration offsets to the sensor readings
        const adjustedTemperature = payload.temperature + this.config.temperatureOffset;
        const adjustedHumidity = payload.humidity + this.config.humidityOffset;

        this.temperature = adjustedTemperature.toFixed(2);
        this.humidity = adjustedHumidity.toFixed(1); // Adjusted to one decimal place
        this.updateDom();
      } else {
        console.warn('Invalid humidity reading:', payload.humidity);
      }
    }
  },

  getStyles: function () {
    return ['MMM-DHT22.css'];
  },

  convertTemperature: function(celsiusTemperature) {
    // Conversion formula from Celsius to Fahrenheit
    if (this.config.temperatureUnit === 'F') {
      return (celsiusTemperature * 9/5 + 32).toFixed(1) + ' °F';
    }
    return celsiusTemperature.toFixed(1) + ' °C'; // Default to Celsius
  },

  getDom: function() {
    const wrapper = document.createElement('div');
    wrapper.style.fontSize = this.config.fontSize;
    wrapper.style.fontFamily = this.config.fontFamily;

    const header = document.createElement('div');
    header.style.fontWeight = 'bold';
    header.appendChild(document.createTextNode(this.config.headerText));
    wrapper.appendChild(header);

    const line = document.createElement('hr');
    line.className = 'horizontal-line';
    wrapper.appendChild(line);

    const temperatureDiv = document.createElement('div');
    if (this.config.showTemperatureText) {
      temperatureDiv.appendChild(document.createTextNode('Temperature: '));
    }
    if (this.config.showThermometerIcon) {
      const thermometerIcon = document.createElement('span');
      thermometerIcon.className = 'fa fa-thermometer-half';
      thermometerIcon.style.color = this.config.temperatureIconColor;
      thermometerIcon.style.marginRight = '5px';
      temperatureDiv.appendChild(thermometerIcon);
    }
    temperatureDiv.appendChild(document.createTextNode(this.temperature));

    if (this.config.showTemperatureUnit) {
      temperatureDiv.appendChild(document.createTextNode(' ' + this.config.temperatureUnit));
    }

    // Set the font size for temperature independently
    if (this.config.temperatureFontSize) {
      temperatureDiv.style.fontSize = this.config.temperatureFontSize;
    }

    wrapper.appendChild(temperatureDiv);

    const humidityDiv = document.createElement('div');
    if (this.config.showHumidityText) {
      humidityDiv.appendChild(document.createTextNode('Humidity: '));
    }
    if (this.config.showDropletIcon) {
      const dropletIcon = document.createElement('span');
      dropletIcon.className = 'fa fa-tint';
      dropletIcon.style.color = this.config.humidityIconColor;
      dropletIcon.style.marginRight = '5px';
      humidityDiv.appendChild(dropletIcon);
    }
    humidityDiv.appendChild(document.createTextNode(`${this.humidity} %`));

    // Set the font size for humidity independently
    if (this.config.humidityFontSize) {
      humidityDiv.style.fontSize = this.config.humidityFontSize;
    }

    wrapper.appendChild(humidityDiv);

    return wrapper;
  },
});
