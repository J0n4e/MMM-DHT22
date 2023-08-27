# MMM-DHT22 Module for MagicMirror

The MMM-DHT22 module displays temperature and humidity data from a DHT22 sensor on your MagicMirror.

## Installation

1. Navigate to your MagicMirror's `modules` directory using the terminal:
   ```shell
   cd ~/MagicMirror/modules

1. Clone this repository:
git clone https://github.com/J0n4e/MMM-DHT22.git

2. Install required dependencies:
npm install

3. Install Dependencies:
npm install child_process

Configuration
To use this module, add it to the modules array in the config/config.js file of your MagicMirror installation:

```shell
modules: [
  {
    module: 'MMM-DHT22',
    position: 'top_right',
    config: {
      // Configuration options here
    }
  }
]

