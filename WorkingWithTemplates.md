# <img src="./img/msb-logo.png" alt="Node.js" /> microServiceBus.com 

## Working with templates
So far you've created nodes using a default template. *Node Templates* defines common configuration of *Nodes* to simplify the process of configuration. In this module you will learn to create templates based on your needs.

## What is a node template?
A node template is a way of defining what settings your node should have when it is created. These options include timezone, protocol, what state it should start in and more.

## Creating a node template
Start by navigating to the Nodes page. Click on the node template button to navigate to the node template menu. Here you have three options: *Create new node template*, *Details* to edit a existing template and *Delete*. Click on *Create new node template*.

### Options for your new template
* Name

     The name of your template ex *"MQTT-standard"*.
* Default template

    If this option is marked, this template will become your new default template for your organization.
<hr>

Common

* Retention period

    Retention period determines how many days of history regarding sent messages the node should keep locally.
* Tags

    Tags can be used to target nodes as a group, eg. "Building4" or "Sweden". You can also use multiple tags separated by comma. This can be useful when setting the Node for services or for scheduling updates.
* Timezone

    The timezone the node will believe it is in. This is useful when setting a timestamp to your messages.
* Protocol

    Protocol is what type of application layer protocol the node will be using.
* Debug 

    If this option is marked, Debug will be enabled on the node when it is created, allowing you to see the output in the console on *microservicebus.com/console*.
* Enabled 

    If this option is marked, the node will be enabled as it is started. This means that any services and flows you set to run on that node will be run as soon as you configure them.
<hr>

Disconnect policy

* Heartbeat timeout

    Heartbeat timeout will determine how many seconds that should pass before the node send a heartbeat to the portal to ensure connectivity. In scenarios where connectivity is important, a lower interval may help.

* Heartbeat limit

    Number of missed heartbeats before concluding that the node is in *Disconnected state* and therefor is taking *Disconnected action* (see below).
* Disconnected action

    Disconnected action refers to what the node should do if it goes in to disconnected state. **Restart** means that the process will restart, and **Reboot** will restart the device.
* Reconnected action

    This option will determine what the node should do if it recovers the lost connection without entering *disconnected state*. *Update* will fetch all the latest services, flows and configuration while *nothing* will tell the node to continue with the current setup.
* Offline mode

    Enabling this option allows the node to start in offline mode, using any pre-fetched configuration.
<hr>

## Editing and deleting templates

By clicking Details you can edit all properties of that template.

Deleting a *Default template* will force the next template in your organization to become the *Default template*.

## Creating a node with a template
When you have created a template, navigate to the *nodes* page and create a new node. You should now be able to select one of your templates, where the default template is chosen as, you guessed it, default. Fill in all the info needed and create the node.

Now you can click on *actions* on your new node, and view it's properties by clicking *properties*. All the information stored in your node template will now be seen on your newly created node.