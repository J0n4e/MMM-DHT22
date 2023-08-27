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

4. Install Dependencies:
````
npm install child_process
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
gpioPin: GPIO pin number for the DHT22 sensor.
fontSize: Font size for module text.
fontFamily: Font family for module text.
showThermometerIcon: Set to true to show the thermometer icon.
showDropletIcon: Set to true to show the droplet icon.
showTemperatureText: Set to true to show the temperature text.
showHumidityText: Set to true to show the humidity text.
headerText: The header text to be displayed above the values.
updateInterval: Update interval in seconds for fetching sensor data.

