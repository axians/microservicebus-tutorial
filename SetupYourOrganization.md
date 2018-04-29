# <img src="./img/msb-logo.png" alt="Node.js" /> microServiceBus.com 

### Create an Azure IoT Hub
> This step requires you to have access to an Azure Account. Should this not be the case, tell the trainer and he or she will provide a *connection string* for you.
In this step, you’re going to create your own Azure IoT hub which is going to be used for transmitting messages to and from your device.

1.	Log in to the [Azure Portal](https://portal.azure.com/)
2.	Click **New** and type "iot", click the "IoT Hub" option from the drop-down
<img src="http://microservicebus.blob.core.windows.net/img/azurebootcamp_1.png"/>

3.	Give your hub a **Name** and select F1 Free as the Pricing and scale tier. Click **Create** after setting Resource group and Location (North- or West Europe). 

4.	Open the IoT Hub blade if it's not already opend. Click to the **Shared access policies** option in the left-hand menu and click the **iothubowner** policy. Copy the *Connection string—primary key*.
>The connection key is going to be used when settng up your *Organization* in microServiceBus.com in the next step.

### Set up the your Organization in microServiceBus.com

An *Organization* is a where all your devices, or nodes as they are called, are managed. When creating a new Organization, you will automatically be assigned as owner of the Organization. You can later add other people to your organization to share you work.


1. Navigate to [www.microServiceBus.com](https://microservicebus.com) and click the “**Register**” button in the upper right corner. 
2. Fill out your details, accept the terms and conditions and click “**Register**”. 
3. Check your mail box, open the confirmation mail and click the “**Register**” link. 
4. Log in to the microServiceBus.com site using the credentials you supplied in step 2. 
5. Select **"Option 2. Use my Microsoft Azure IoT Hub"**, and provide the **iothubowner** connection string for your Azure IoT Hub. 
6. Uncheck the “*Add sample scenarios*” checkbox and click *Create organization* 
7. Navigate to the [Organization page](https://microservicebus.com/Organizations/Details) and view some of the options.