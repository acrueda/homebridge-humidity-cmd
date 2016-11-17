var Service, Characteristic;
var exec = require("child_process").exec;

var humidityService;
var command;
var humidityService = 0;

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory("homebridge-humidity-cmd", "HumidityCMD", HumidityCMD);
}

function HumidityCMD(log, config) {
    this.log = log;

    // url info
    this.name = config["name"];
    this.manufacturer = config["manufacturer"] || "Luca Manufacturer";
    this.model = config["model"] || "Luca Model";
    this.serial = config["serial"] || "Luca Serial";
    this.command = config["command"];
}

HumidityCMD.prototype = {
    cmdRequest: function(cmd, callback) {
        exec(cmd,function(error, stdout, stderr) {
            callback(error, stdout, stderr)
        })
    },

    getState: function (callback) {
        var cmd = this.command;
        this.cmdRequest(cmd, function(error, stdout, stderr) {
            if (error) {
                this.log('command function failed: %s', stderr);
                callback(error);
            } else {
                this.log('command function succeeded!');
                var res =  Math.round(stdout * 100) /100;
                this.log(res);
                callback(null, res);
            }
        }.bind(this));
    },

    identify: function(callback) {
        this.log("Identify requested!");
        callback(); // success
    },

    getServices: function() {
        var services = [],
            informationService = new Service.AccessoryInformation();

        informationService
            .setCharacteristic(Characteristic.Manufacturer, this.manufacturer)
            .setCharacteristic(Characteristic.Model, this.model)
            .setCharacteristic(Characteristic.SerialNumber, this.serial);
        services.push(informationService);

        humidityService = new Service.HumiditySensor(this.name);
        humidityService
            .getCharacteristic(Characteristic.CurrentHumidity)
            .on('get', this.getState.bind(this));
        services.push(humidityService);

        return services;
    }
};
