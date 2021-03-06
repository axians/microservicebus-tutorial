# Receive whitelist through state

Both Azure and Amazon IoT Hub has what is referred to as *Device Twin* and *Thing Shadow*, which to avoid confusion we will refer to simply as **Node State**. Technically they are almost identically implemented, which is a shared JSON document with two parts:

* **desired**  -*Can only be changed with **Service** privilages*
* **reported** -*Can only be changed with **Device** privilages*


If we'd imagen a gateway controlling some kind of machine, we might want to steer it by setting the **throttle** from our cloud application, while we'd expect the gateway to report the **RPM** (revolutions per minute). In this case, we could have a **state** that looked similar to this:
```json
{
    "properties": {
        "desired": {
            "throttle": "HIGH",
            "$version": 3
        },
        "reported": {
            "RPM": 500,
            "$version": 18
        }
    }
}
```

## Set Wireless MBus whitelist

Wireless MBus sensors broadcasts data to whomever care to listen and are not paired as with BLE or ZigBee sensors. There are therefore two things we must consider:

1. Encrypt our data. Most Wireless MBus sensors can send its payload encrypted using an [ASE key](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) which you can also use to decrypt the data with. In scenarios where we need to process the data on the gateway, the ASE keys needs to be stored on the device. If not, we might as well just send the data to the cloud as-is, and decrypt it in the cloud.

> In this lab, we're not going to enable encryption although we're going to parse the data on the gateway. But it's good to know for future reference.

2. As Wireless MBus sensors broadcasts data to whomever care to listen,  you are likely to pick up telegrams from sensors that are not yours. To resolve this, we need a **whitelist** of all sensors, so that we can ignore those not part of our whitelist, we don't have to parse it. In this lab we're going to store the whitelist in the **Node state**.

### Create a new flow

1. Create a new Flow by navigating to the [Flow page](https://microservicebus.com/Integration). Click the *CREATE NEW* button and give your Flow a name such as "Read WMBus Sensors".
2. Create a variable by clicking the *VARIABLES* button. Set the name to "whitelist" and the type to "Object".
> Variables declared this way will be accessible from all Services within your Flow. 
3. From the *Inbound Services* section in the toolbox, drag a "Azure Inbound State" service to the canvas. Set the *Node* property to the name of your Node (Eg. "node-00001").
4. Next, drag a "JavaScript" Service from the *Other Services* section and place it to the right of the "Azure Inbound State" Service. 
5. Open the script dialog and write the code to save the whitelist, Eg. 
```javascript
// whitelist is a global variable
whitelist = message.desired.whitelist.split(',');
this.Debug("Whitelist has been updated")
```
6. Click *Ok* to close the script editor and connect the **Azure Inbound State** Service to the **JavaScript** Service.
7. Save the flow.

### Update state
1. Navigate to the [Nodes page](https://microservicebus.com/Nodes)
2. Enable *Console* and open a **NEW** tab to view the [Console output](https://microservicebus.com/Nodes) if you haven't already on open. Leave the tab open and go back to the Node list page.
3. Click the *Action* button next to your Node and select *Properties*
4. On the *Properties* page, click the *DEVICE STATE* button.
5. In the "Twin/Shadow state" dialog, add a **desired** property called "whiltelist" and set the value to a comma separated string of sensor id's. Eg.

```json
{
    ...
    "properties": {
        "desired": {
            "whitelist": "00000001,00000002",
            "$version": 1
        },
        "reported": {
            "$metadata": {
                "$lastUpdated": "2019-04-25T08:04:23.5773254Z"
            },
            "$version": 1
        }
    }
}
```
**Change the values of the whitelist to the sensors you want to read.**

6. Click the save, and navigate Console output window and verify the gateway receives the new state.

> Feel free to update the state using the Azure portal as well, where you should expect the same result

> **TIP!** You may also update the state using microServiceBus.API, which might come very handy if you'd like other applications to manage the whitelists.


Proceed to [Read telegrams from sensors and send to cloud](./Day_2_Read_telegrams_from_sensors_and_send_to_cloud.md)




