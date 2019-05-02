# Route your device telemetry messages to Time Series Insight

Now that you are sending temperature readings to the cloud, it is time to do something useful with this data. As you are well aware of, collecting values without getting any business values is just an added cost. We will be adding Time Series Insight to provide an analytics tool to view and make sense of the data gathered.

To complete this lab, you will need to route your messages to an Event Hub, which will then forward the messages to a Time Series Insight instance that you will create. Lastly you will look at some ways of viewing the data in TSI.

## Add an Event Hub to route your messages to

You will need an Event Hub for you to be able to route your messages. By adding an Event Hub to your subscription, TSI will be able to consume from that.

1. Create an **Event Hub** namespace in your resource group and name it something along the lines of "*msb-tutorial-eh-namespace*". Choose the lowest pricing tier and put it in the subscription and region of your preference.
2. Navigate to your newly created namespace and add an **Event Hub**. Name it to something along the lines of "*temperature-readings*" and keep everything else as Default. You now have an Event Hub that you can route data to.

## Add a messaging route to your IoT-Hub

1. Navigate to your IoT-hub in your resource group. Go to **message routing** and add a route. Name it according to what you will route for example *temperature_readings*.
2. You will need to add an endpoint as your IoT-hub currently does not have any. Choose *Event Hubs* and name the endpoint something similar as your route. Pick the Namespace and Event Hub as what you created in the previos step. Keep data source as the default option.
3. Now it is time to add your routing query. Everything that matches this query will be sent to the Event Hub Endpoint you just created.

Add the following query that correlates to the *mt* you set in your flow the previous lab.

```SQL
mt = "tempReadings"
```

Press save and you have now set up a custom route for your telemetry messages, good job!

## Create a TSI instance


1. Navigate to your resource group in Azure. Press *Add* and search for Time Series Insight, and press *Create*. You will now need to provide some Basic configuration and some information regarding your *Event Source*. On basic information fill in these fields : 

    | Property | Value |
    |-------|--------|
    | **Environment name** | msb-tutorial |
    | **Subscription** | [Your subscription] |
    | **Resource group** | [Your resource group]] |
    | **Location** | West Europe |

    Keep the rest of the options untouched and navigate to *Next:Event Source*

2. Here you will need to add some information on your *Event Hub* that receives the messages from the IoT Hub. This will allow TSI to consume events from the Event Hub.

    | Property | Value |
    |-------|--------|
    | **Name** | temperature-readings |
    | **Source type** | Event Hub |
    | **Select a hub** | Select existing |
    | **Event hub namespace** | [Your created event hub namespace]] |
    | **Event Hub access policy name** | RootManageSharedAccessKey |
    | **Event Hub Consumer group** | Default |
    | **Property name** | ts |

    Press review and create to start deployment of your TSI-instance. Once deployment is done, navigate to your TSI instance and press the button *Go to Environment*. Here you will find loads of tools to play around with the data you are currently sending. Good job on completing all the labs and let your creativity flow to view the data to maximize business value ;)
    

