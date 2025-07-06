Module.register('MMM-DHT22', {
  defaults: {
    gpioPin: 6,
    fontSize: '16px',
    fontFamily: 'Arial',
    showThermometerIcon: true,
    showDropletIcon: true,
    showTemperatureText: true,
    showHumidityText: true,
    headerText: 'Local Environment',
    updateInterval: 60,
    temperatureIconColor: 'red',
    humidityIconColor: 'blue',
    temperatureFontSize: '',
    humidityFontSize: '',
    temperatureUnit: 'C', // Default temperature unit (Celsius)
    humidityUnit: ' %',   // Default humidity unit
    temperatureOffset: 0, // Default temperature offset adjustment
    humidityOffset: 0,    // Default humidity offset adjustment
    layout: 'horizontal', // Default layout style ('horizontal' or 'vertical')
  },

  start () {
    this.temperature = '';
    this.humidity = '';
    this.sendSocketNotification('START_DHT_READING', { gpioPin: this.config.gpioPin });

    const updateIntervalMillis = this.config.updateInterval * 1000;
    setInterval(() => {
      this.sendSocketNotification('START_DHT_READING', { gpioPin: this.config.gpioPin });
    }, updateIntervalMillis);
  },

  socketNotificationReceived (notification, payload) {
    if (notification === 'DHT_DATA') {
      if (payload.humidity >= 0 && payload.humidity <= 100) {
        let temperature = payload.temperature + this.config.temperatureOffset;
        temperature = this.convertTemperature(temperature);
        const humidity = payload.humidity + this.config.humidityOffset;

        this.temperature = temperature;
        this.humidity = humidity.toFixed(1) + this.config.humidityUnit;
        this.updateDom();
      } else {
        Log.warn('Invalid humidity reading:', payload.humidity);
      }
    }
  },

  getStyles () {
    return ['MMM-DHT22.css'];
  },

  convertTemperature (celsiusTemperature) {
    // Conversion formula from Celsius to Fahrenheit
    if (this.config.temperatureUnit === 'F') {
      return `${(celsiusTemperature * 9 / 5 + 32).toFixed(1)} °F`;
    }
    return `${celsiusTemperature.toFixed(1)} °C`; // Default to Celsius
  },

  getDom () {
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

    if (this.config.layout === 'horizontal') {
      // Horizontal layout
      const dataContainer = document.createElement('div');
      dataContainer.className = 'horizontal-container';

      const temperatureDiv = document.createElement('div');
      if (this.config.showTemperatureText) {
        temperatureDiv.appendChild(document.createTextNode('Temperature: '));
      }
      if (this.config.showThermometerIcon) {
        const thermometerIcon = document.createElement('span');
        thermometerIcon.className = 'fa fa-thermometer-half';
        thermometerIcon.style.color = this.config.temperatureIconColor;
        thermometerIcon.style.marginRight = '10px'; // Add spacing after icon
        temperatureDiv.appendChild(thermometerIcon);
      }
      temperatureDiv.appendChild(document.createTextNode(this.temperature));

      if (this.config.showTemperatureUnit) {
        temperatureDiv.appendChild(document.createTextNode(` ${this.config.temperatureUnit}`));
      }

      // Set the font size for temperature independently
      if (this.config.temperatureFontSize) {
        temperatureDiv.style.fontSize = this.config.temperatureFontSize;
      }

      dataContainer.appendChild(temperatureDiv);

      const humidityDiv = document.createElement('div');
      if (this.config.showHumidityText) {
        humidityDiv.appendChild(document.createTextNode('Humidity: '));
      }
      if (this.config.showDropletIcon) {
        const dropletIcon = document.createElement('span');
        dropletIcon.className = 'fa fa-tint';
        dropletIcon.style.color = this.config.humidityIconColor;
        dropletIcon.style.marginRight = '10px'; // Add spacing after icon
        humidityDiv.appendChild(dropletIcon);
      }
      humidityDiv.appendChild(document.createTextNode(this.humidity));

      // Set the font size for humidity independently
      if (this.config.humidityFontSize) {
        humidityDiv.style.fontSize = this.config.humidityFontSize;
      }

      dataContainer.appendChild(humidityDiv);

      wrapper.appendChild(dataContainer);
    } else if (this.config.layout === 'vertical') {
      // Vertical layout
      const temperatureDiv = document.createElement('div');
      temperatureDiv.className = 'vertical-data';

      // Add temperature data here with icons and spacing as before
      // ...

      const humidityDiv = document.createElement('div');
      humidityDiv.className = 'vertical-data';

      // Add humidity data here with icons and spacing as before
      // ...

      wrapper.appendChild(temperatureDiv);
      wrapper.appendChild(humidityDiv);
    }

    return wrapper;
  },
});
