# Mongoose OS firmware IFTTT maker webhooks example

This is basic MOS firmware with a simple init.js that triggers IFTTT maker event.
See [IFTTT webhooks](https://ifttt.com/maker_webhooks) for more info.
CA certificate for maker.ifttt.com is included in ca.pem file (expired Sep 28 2018).
Set your event name and key using ```ifttt.event``` and ```ifttt.key``` configuration settings.

See [quick start guide](https://mongoose-os.com/docs/#/quickstart/)
on how to build and flash the firmware.
Examples build:
```
git clone https://github.com/Tommystus/iftttMaker.git
mos build --arch esp8266
mos flash
mos config-set ifttt.event=myEvent ifttt.key=myyyyy_keyyyy
```

