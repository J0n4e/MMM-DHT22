Module.register('MMM-DHT22', {
  defaults: {
    gpioPin: 6,
    fontSize: '16px', // Default font size for all text
    fontFamily: 'Arial',
    showThermometerIcon: true,
    showDropletIcon: true,
    showTemperatureText: true,
    showHumidityText: true,
    headerText: 'Local Temperature',
    updateInterval: 60,
    temperatureIconColor: 'red',
    humidityIconColor: 'blue',
    temperatureFontSize: '', // Default: empty (inherits fontSize)
    humidityFontSize: '',    // Default: empty (inherits fontSize)
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
      this.temperature = payload.temperature;
      this.humidity = payload.humidity;
      this.updateDom();
    }
  },

  getStyles: function () {
    return ['MMM-DHT22.css'];
  },

  getDom: function() {
    const wrapper = document.createElement('div');
    wrapper.style.fontSize = this.config.fontSize; // Set the default font size

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
    temperatureDiv.appendChild(document.createTextNode(`${this.temperature}°C`));
    
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
