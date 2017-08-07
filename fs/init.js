load('api_config.js');
load('api_gpio.js');
load('api_net.js');
load('api_sys.js');
load('api_timer.js');
load('api_http.js');

let ledPin = 2; // GPIO2 => D4 Blue LED

let btnPin = 0; // GPIO0 => D3 builtin button (flash)

print("**LED GPIO: " + JSON.stringify(ledPin) + "; button GPIO: " + JSON.stringify(btnPin));

let getInfo = function() {
  return JSON.stringify({total_ram: Sys.total_ram(), free_ram: Sys.free_ram()});
};

let netReady = 0;
let iftttUrl = 'https://maker.ifttt.com/trigger/' +
	Cfg.get('ifttt.event') + '/with/key/' +
	Cfg.get('ifttt.key');

print('**IFTTT maker URL: ', iftttUrl);

GPIO.set_mode(ledPin, GPIO.MODE_OUTPUT);
GPIO.write(ledPin,1); // active low LED
// Note:  mos console command reset the GPIO edge detection
// so it will trigger without button press
GPIO.set_button_handler(btnPin, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 200, function() {
	if (!netReady)
		return;
	// button must remain low to work
	if (GPIO.read(btnPin))
		return;

	GPIO.write(ledPin,0);	// signal button press

	let topic = '/devices/' + Cfg.get('device.id') + '/events';
	let message = getInfo();
	print('**topic:', topic, 'message:', message);

	HTTP.query({
		url: iftttUrl,
		headers: { 'Content-Type': 'application/json'},
		data: {
			'value1': 'MOS Test',
			'value2': topic,
			'value3': message},
		success: function(body, full_http_msg) { print( "**HTTPS Sent: ", body); },
		error: function(err) { print("**HTTPS Error: ", err); },  // Optional
	});

	GPIO.write(ledPin,1);
}, null);

// Monitor network connectivity.
Net.setStatusEventHandler(function(ev, arg) {
  let evs = "???";
  if (ev === Net.STATUS_DISCONNECTED) {
    evs = "DISCONNECTED";
  } else if (ev === Net.STATUS_CONNECTING) {
    evs = "CONNECTING";
  } else if (ev === Net.STATUS_CONNECTED) {
    evs = "CONNECTED";
  } else if (ev === Net.STATUS_GOT_IP) {
    evs = "GOT_IP";
	netReady = 1;
  }
  print("** Net event:", ev, evs);
}, null);

