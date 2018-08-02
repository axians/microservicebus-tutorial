# <img src="./img/msb-logo.png" alt="Node.js" /> microServiceBus.com 

## Working with Policies
Disconnected state is common and somthing you need to plan for. Different solutions require different settings of how to handle network disruption.

In this lab you will learn what type of policies that exists for a *node* and what effect they have on the handling of network disruptions. You will also learn how to set up a node with your custom policies to handle your specific case.

1. Navigate to the node page and find your node running on your machine

2. Click the *"Actions"* tab on your node, and find the option "*Properties*" in the drop-down list.
3. Navigate to the tab that says *Policies* to be greeted with the *Disconnect policies* options.

    Before you start changing the options of the policy on the node, here is a brief explanation for each option:

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

4. Set the heartbeat timeout to 60 seconds and keep the other options as they are and save the settings.

5. Restart your node to see that an heartbeat is being triggered each minute. A restart can be done in multiple ways

    * Remember the *"Actions"* tab earlier in this module? Here you can tell the node to perform a *Restart*.
    * While in your command prompt, press ```CTRL+C``` and then run the command:
    ``` 
    node start
    ```
    * When on *microServiceBus.com*, you can press ```CTRL+R``` to get a command prompt to pop up. Write restart *"Your node name"* and press enter.

## Optional task for the curious
Play around with different policy settings and drop your network connection on your computer at different times to see how your node behaves.
## Well done, you've completed the lab regarding Reconnect policies.
### [Back to main page](./README.md).
