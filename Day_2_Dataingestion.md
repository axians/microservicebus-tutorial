
# Create a data ingestion function
In this lab you should create an Azure Function that reads messages off your IoT Hub and submits them to blob storage.

### Create a Storage account in Azure
1. Inside your storage account create a container.
### Create a Visual studio project
1. In the types, select Azure Function
2. In the "New Project Dialog", select Azure Functions v1 (.Net Framework" and "IoT Hub Trigger"
3. In the "Connection String settings" type "iotHubConnectionString". 
4. Click Create

5. Open the local.settings.json file and add a variable under "values". Name it "iotHubConnectionString", and set it's value to the connection string of your IoTHub (owner)
6. Also add a referens to your storage account. Give it a name such as "blobConnectionString" and copy the connection string from your storage account in Azure.
6. Open your function (Eg Function1.cs"). Before the function statement ("public static void..."), add a return statement:
```csharp
[return: Blob("YOUR-CONTAINER-NAME/{rand-guid}", Connection ="blobConnectionString")]
```
> Not the rand-guid, this will be the name of your file

7. Change the return type from void to string
8. Inside your function, create a variable called "json" and asign it the serialized value of the inbound message: 
```csharp
var json = Encoding.UTF8.GetString(message.GetBytes());
```
9. End the function by returning your json string:
```csharp
return json;
```