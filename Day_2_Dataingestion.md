
# Create a data ingestion function
In this lab you should create an Azure Function that reads messages off your IoT Hub and submits them to blob storage.

### Delete your Time Series Insight instance
As you're going to create a new listener to your IoT Hub, you need to remove TSI event listener before you continue. You could also solve this by adding additional consumer group to your IoT Hub, but for now, just delete the TSI instance.

### Create a Storage account in Azure
1. From within your resource group (same as where you have your IoT Hub), click *Add*, search for Storage Account and click Create.
2. Give it a name, set the location to "West Europe" and **set the "Account kind" to "Storage (general purpose v1)"**
3. Once the storage avvount is created, create a container with an appropriate name, Eg your name.
### Create a Visual studio project
1. Open Visual Studio 2017 or 2019
2. Select create new project and give it a name such as *Tutorial.DataIngestion*.
3. In the types, select Azure Function
4. In the "New Project Dialog", select **Azure Functions v1 (.Net Framework" and "IoT Hub Trigger"**. (*Unfortunatly .Net Core 2.0 and 3.0 has a bug where it wont accept the IoT Hub Connection string*).
5. In the "Connection String settings" type "iotHubConnectionString". 
6. Click Create

7. Open the *local.settings.json* file and add a variable under "Values". Name it "iotHubConnectionString", and set it's value to the connection string of your IoTHub (owner)
8. Also add a referens to your storage account. Give it a name such as "blobConnectionString" and copy the connection string from your storage account in Azure (available under "Access keys" of your storage account).
9. Open your function (Eg Function1.cs"). Before the function statement ("public static void..."), add a return statement:
```csharp
[return: Blob("YOUR-CONTAINER-NAME/{rand-guid}", Connection ="blobConnectionString")]
```
> Not the rand-guid, this will be the name of your file

10. Change the return type from void to string
11. Inside your function, create a variable called "json" and asign it the serialized value of the inbound message: 
```csharp
var json = Encoding.UTF8.GetString(message.GetBytes());
```
12. End the function by returning your json string:
```csharp
return json;
```