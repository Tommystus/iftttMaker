#==================================
# set these variables before build
#==================================
wifi_ssid="my wifi ssid"
wifi_pass="my wifi password"
my_event="my ifttt maker event name"
my_key="my ifttt key"
#==================================
#
mos build --arch esp8266
mos flash
mos config-set wifi.sta.ssid=$wifi_ssid wifi.sta.pass=$wifi_pass wifi.sta.enable=true ifttt.event=$my_event ifttt.key=$my_key

