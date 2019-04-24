# Integrate with Cisco Jasper

(INTRO to CISCO JASPER)

## Configure Integration

1. Navigate to [your Organization](https://microservicebus.com/Organizations).

2. Set *Instance*, *User name* and *REST API key* as provided by your trainer.

3. At the bottom of the page, click on *Edit*. Scroll to the bottom and copy the "API address" for Cisco Jasper.
> The API address refers to the end point of the Cisco Jasper will call upon the SIM card state change.

4. Email the API address to your trainer who will update Cisco Jasper. 

## Provision your Gateway

5. After your trainer has created a automation rule in Cisco Jasper, the SIM card is ready to use.

6. Plug in the Gateway.
>This step will cause the SIM card to be activated and registered in microServiceBus.com. The device will also be registered in your Azure IoT Hub. This process may take a few minutes.

7. Navigate to [the Nodes page](https://microservicebus.com/nodes). Your device should become visible after a few minutes.

8. Verify that your device is also registered in [your IoT Hub](https://portal.azure.com).