# <img src="./img/msb-logo.png" alt="Node.js" /> microServiceBus.com 

## Working with templates
So far you've created nodes using a default template. *Node Templates* defines common configuration of *Nodes* to simplify the process of configuration. In this module you will learn to create templates based on your needs.

## What is a node template?
A node template is a way of defining what settings your node should have when it is created. These options include timezone, protocol, what state it should start in and more.

## Creating a node template
1. Start by navigating to the Nodes page. Click on the node template button to navigate to the node template menu. Here you have three options: *Create new node template*, *Details* to edit a existing template and *Delete*.
2. Click on *Create new node template*.

    ### Options for your new template
    * Name

        The name of your template ex *"MQTT-standard"*. Set your own name as the name so you can find it more easily later.
    * Default template

        If this option is marked, this template will become your new default template for your organization. Unmark this option so that your template does not become the default for the organization.
    <hr>

    Common

    * Retention period

        Retention period determines how many seconds of history regarding sent messages the node should keep locally.
        
        Set this to 86400 to have the node save one day of history.
    * Tags

        Tags can be used to target nodes as a group, eg. "Building4" or "Sweden". You can also use multiple tags separated by comma. This can be useful when setting the Node for services or for scheduling updates.
        
        Set this option to *"Tutorial"*.
    * Timezone

        The timezone the node will believe it is in. This is useful when setting a timestamp to your messages.
        
        Set this to the timezone you are currently in.
    * Protocol

        Protocol is what type of application layer protocol the node will be using.
        
        Keep this as is.
    * Debug 

        If this option is marked, Debug will be enabled on the node when it is created, allowing you to see the output in the console on *microservicebus.com/console*.
        
        Have this option unmarked so we do not clutter the console in *microservicebus.com*.
    * Enabled 

        If this option is marked, the node will be enabled as it is started. This means that any services and flows you set to run on that node will be run as soon as you configure them.

        You can keep this marked so that your node will be enabled when you create it.
    <hr>

    Disconnect polices were introduced to you last lab, here you can set your preferred policy-settings for your template.

    You can keep this at the default values.
    <hr>

3. Save your custom template.

## Editing and deleting templates

By clicking Details you can edit all properties of that template.

Deleting a *Default template* will force the next template in your organization to become the *Default template*.

## Creating a node with a template
4. When you have created a template, navigate to the *nodes* page and create a new node. You should now be able to select your own template. Fill in all the info needed and create the node.

5. Now you can click on *actions* on your new node, and view it's properties by clicking *properties*. All the information stored in your node template will now be seen on your newly created node.

## Well done, you've completed the lab regarding node templates.
### [Back to main page](./README.md).