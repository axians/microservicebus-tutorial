
# Read telegrams from sensors and send to cloud

With the whitelist in place, it's time to start reading the Wireless M-Bbus sensors. The gateway is equipped with a Wireless M-Bbus receiver, and all readings captured by the receiver are made available on a serial port. In the case of the enQube gateway this serial port is **/dev/ttyS3**, but will be different type of devices.

To complete this lab, you're going to first read and parse the telegrams from serial port, then match the sensor id of the telegram to the whitelist you created in the previous lab. If the sensor Id is part of the whitelist, you'll send the parsed telegram to your Azure IoT Hub. 

## Read and parse telegrams from serial port

1. To read and distinguish each telegram on the serial port we need a Wireless M-Bbus Service. Open your already created Flow and add an **enQube Wireless MBus Reader** from the Inbound section of the toolbox to your canvas.
2. Open the **enQube Wireless MBus Reader** Service property window and set the *Node* property to the name of your Node. Click the *Static Properties" tab and make sure the properties are set as below

| Property | Value |
|-------|--------|
| **Serial port** | /dev/ttyS3 |
| **Baud rate** | 19200 |
| **Data bits** | 8 |
| **Stop bits** | 1 |
| **Parity** | none |

3. Add a **Console Out** Service to the right of the **enQube Wireless MBus Reader** Service and connect the two Services.
4. Save the Flow, and navigate to the [Nodes page](https://microservicebus.com/Nodes), and toggle the *Console* for the Node.
5. Navigate to the [Console page](https://microservicebus.com/console) and examine the output. Note that you get messages with the Header information, such as manufacture, version, type and deviceId are visible, along with the raw telegram.

## Filter telegrams
With telegrams being read, it's time to make use of the whitelist to filter out the ones we care about.

1. Remove the connection between the **enQube Wireless MBus Reader** and the **Console Out** Service, and more the **Console Out** Service to the right.
3. Add a **JavaScript** Service from the toolbox (*Other Services*) and place it to the right of the **enQube Wireless MBus Reader**, and connect the three Services as the picture below:

<img src="./img/read-telegrams-1.png">

4. Right-click the **JavaScript** Service and select *Script*. Add the following code to check if the telegram is part of the whitelist:

```javascript
// Filter the whitelist for the device Id
let existsInWhitelist = whitelist.find( deviceId => deviceId === message.deviceId );

if(!existsInWhitelist){ // Ignore if not
    this.Debug(`Ignoring ${message.deviceId}`)
    message = false;
}
else{ // Pass it through if exists
    this.Debug(`Processing ${message.deviceId}`)
}
```
*If the telegram is not found in the whitelist, the function above will set the message to 'false'*. 

5. The **JavaScript** Service will either pass the message or 'false' if not part of the whitelist. We'll use this to only proceed if the message is not false. Double-click the routing expression ("true") between the **JavaScript** Service and the **Console Out** Service. In the editor, update the routing condition as:

```javascript
var route = message;
```

6. Save the Flow, and examine the output.

2. Grab an **Wireless MBus Parser** from the toolbox (*Other Services*) and place it to the right of the **enQube Wireless MBus Reader**. Connect the Reader with the parser.

