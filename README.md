# MMM-DHT22 Module for MagicMirror

The MMM-DHT22 module displays temperature and humidity data from a DHT22 sensor on your MagicMirror.

## Installation

1. Navigate to your MagicMirror's `modules` directory using the terminal:
````
cd ~/MagicMirror/modules
````

1. Clone this repository:
````
git clone https://github.com/J0n4e/MMM-DHT22.git
````

3. Install required dependencies:
````
npm install
````

Configuration
To use this module, add it to the modules array in the config/config.js file of your MagicMirror installation:

````
modules: [
  {
    module: 'MMM-DHT22',
    position: 'top_right',
    config: {
      // Configuration options here
    }
  }
]
````


Configuration Options
* gpioPin: GPIO pin number for the DHT22 sensor.
* fontSize: Font size for module text.
* fontFamily: Font family for module text.
* showThermometerIcon: Set to true to show the thermometer icon.
* showDropletIcon: Set to true to show the droplet icon.
* showTemperatureText: Set to true to show the temperature text.
* showHumidityText: Set to true to show the humidity text.
* headerText: The header text to be displayed above the values.
* updateInterval: Update interval in seconds for fetching sensor data.

Example Configuration
Here's an example configuration for the MMM-DHT22 module:

````
modules: [
  {
    module: 'MMM-DHT22',
    position: 'top_right',
    config: {
      headerText: 'Local Environment',
      gpioPin: 6,
      updateInterval: 120,
      fontSize: '16px',
      fontFamily: 'Arial',
      showThermometerIcon: true,
      showDropletIcon: true,
      showTemperatureText: true,
      showHumidityText: true   
    }
  }
]
````
License
This project is licensed under the MIT License. See the LICENSE file for details.

Support and Contributions
If you encounter any issues or have suggestions for improvements, please open an issue on the GitHub repository.

Acknowledgments
Special thanks to the MagicMirror community and contributors.
