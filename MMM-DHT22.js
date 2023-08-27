Module.register('MMM-DHT22', {
  defaults: {
    gpioPin: 6,
    fontSize: '16px',
    fontFamily: 'Arial',
    showThermometerIcon: true,
    showDropletIcon: true,
    showTemperatureText: true,
    showHumidityText: true,
    headerText: 'Local Temperature', // Default header text
    updateInterval: 60, // Default update interval in seconds
  },

  start: function() {
    this.temperature = '';
    this.humidity = '';
    this.sendSocketNotification('START_DHT_READING', { gpioPin: this.config.gpioPin });

    // Set the update interval based on the config
    const updateIntervalMillis = this.config.updateInterval * 1000; // Convert seconds to milliseconds
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
    wrapper.style.fontSize = this.config.fontSize;
    wrapper.style.fontFamily = this.config.fontFamily;

    // Display header
    const header = document.createElement('div');
    header.style.fontWeight = 'bold';
    header.appendChild(document.createTextNode(this.config.headerText));
    wrapper.appendChild(header);

    // Draw a horizontal line with thinner style
    const line = document.createElement('hr');
    line.className = 'horizontal-line'; // Add a class for styling
    wrapper.appendChild(line);

    const temperatureDiv = document.createElement('div');
    if (this.config.showTemperatureText) {
      temperatureDiv.appendChild(document.createTextNode('Temperature: '));
    }
    if (this.config.showThermometerIcon) {
      const thermometerIcon = document.createElement('span');
      thermometerIcon.className = 'fa fa-thermometer-half'; // Font Awesome class
      thermometerIcon.style.marginRight = '5px'; // Adjust spacing
      temperatureDiv.appendChild(thermometerIcon);
    }
    temperatureDiv.appendChild(document.createTextNode(`${this.temperature}°C`));
    wrapper.appendChild(temperatureDiv);

    const humidityDiv = document.createElement('div');
    if (this.config.showHumidityText) {
      humidityDiv.appendChild(document.createTextNode('Humidity: '));
    }
    if (this.config.showDropletIcon) {
      const dropletIcon = document.createElement('span');
      dropletIcon.className = 'fa fa-tint'; // Font Awesome class
      dropletIcon.style.marginRight = '5px'; // Adjust spacing
      humidityDiv.appendChild(dropletIcon);
    }
    humidityDiv.appendChild(document.createTextNode(`${this.humidity}%`));
    wrapper.appendChild(humidityDiv);

    return wrapper;
  },
});
