import sys
import Adafruit_DHT
import json

if len(sys.argv) != 2:
    print("Usage: python3 read_dht22_sensor.py <gpio_pin>")
    sys.exit(1)

gpio_pin = int(sys.argv[1])

SENSOR_TYPE = Adafruit_DHT.DHT22

def read_dht22_sensor():
    humidity, temperature = Adafruit_DHT.read_retry(SENSOR_TYPE, gpio_pin)
    return humidity, temperature

humidity, temperature = read_dht22_sensor()

data = {
    'temperature': round(temperature, 2),
    'humidity': round(humidity, 2)
}

print(json.dumps(data))
