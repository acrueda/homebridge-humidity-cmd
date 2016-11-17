# homebridge-humidity-cmd
homebridge-plugin for Your PC Command with Apple-Homekit.(by node.js child_process.exec())

This pluging is a copy / paste with some modifications of the project homebridge-temperature-cmd to use it in humidity, my knowledge with very basic.

# Installation

1. Install homebridge using: sudo npm install -g homebridge
2. Install this plugin using: sudo npm install -g homebridge-humidity-cmd
3. Update your configuration file. See sample-config.json in this repository for a sample.

# Configuration

Configuration sample:

```
"accessories": [
    {
        "accessory": "HumidityCMD",
        "name": "Living Room Humidity",
        "command": "sudo /usr/local/bin/humidity | cut -d ',' -f 2"
    }
]
