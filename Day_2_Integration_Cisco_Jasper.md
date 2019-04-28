# Integrate with Cisco Jasper

(INTRO to CISCO JASPER)

## Configure Integration

1. Navigate to [your Organization](https://microservicebus.com/Organizations/Details). At the bottom of the page, click *EDIT*

2. Scroll down to the "Cisco Jasper" section and set *Instance*, *User name* and *REST API key* as provided by your trainer.

3. Copy the "API address" for Cisco Jasper.

> The API address refers to the endpoint that Cisco Jasper will call upon the SIM card state change.

4. Email the API address to your trainer who will update Cisco Jasper with an Automation Rule to call your endpoint when the SIM card state changes. 

## Provision your Gateway

5. After your trainer has created a automation rule in Cisco Jasper, the SIM card is ready to use.

6. Plug in the Gateway.
>This step will cause the SIM card to be activated and registered in microServiceBus.com. The device will also be registered in your Azure IoT Hub. This process may take a few minutes.

7. Navigate to [the Nodes page](https://microservicebus.com/nodes). Your device should become visible after a few minutes.

8. Verify that your device is also registered in [your IoT Hub](https://portal.azure.com).