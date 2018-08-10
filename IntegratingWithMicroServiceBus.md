# <img src="./img/msb-logo.png" alt="Node.js" /> microServiceBus.com 

## Integrating with microServiceBus.com API
microServiceBus.com is all about *Device Management*, but sometimes you need to interact or integrate with your devices from other systems. For these type of scenarios, microServiceBus.com API might come to rescue.

In this lab we are going to explore the API in the portal and use Postman to simulate an external system using the API.

### Explore the API
1. Before we begin we need a user authentication token. Navigate to your account profile by clicking your name in upper right corner.
2. In the *Get API key" section, enter your password and set *Token expiration* to "Never". Click *GET API KEY* and copy the token to the clipboard.
3. Navigate the to [microServiceBus.com API's](https://microservicebus.com/swagger) and paste your authentication key in the "api_key" textbox in the upper right corner.
4. Expand the *Organizations* section and click the GET operation for "/api/organizations". Hit the "Try it out!" button.
5. Examine the output in the *Response Body* section.

### Use API from Postman
#### Query for organizations
6. Open Postman and click ok on any annoying popups presented. In an empty tab, type "https://microservicebus.com/api/organizations".
7. Select the *Headers* tab and type "Authorization" in the *KEY* field and paste your API token in the *VALUE* field. Hit the **Send** button. The result should come out the same ways as in the portal.
#### Query for nodes
8. Still in postman, copy the id of your organization from the response json, and append it to the address field with "/nodes". Eg:
```
https://microservicebus.com/api/organizations/921467d9-4020-40d9-86e7-e813664d3456/nodes
```
9. Hit **Send** and evaluate the result.
#### Create a new node
10. To the left of the URI field, change the VERB to **POST**.
11. Click the **Body** tab, select the *Raw* option and change the content type from "Text" to "JSON (application/json)".
12. In the body field, paste the payload below and update it to your preferences:
```
{
  "organizationId": "[ID OF YOUR ORGANIZATION]",
  "name": "[NAME OF YOUR NEW NODE]",
  "description": "[WHATEVA]",
  "template": "[NAME OF PREFERRED TEMPLATE]"
}
```
13. Hit **Send**, and navigate to the [Nodes page](https://microservicebus.com/nodes) and make sure your *Node* was created.

## Well done, you've completed the lab and are now a REST guru.
### [Back to main page](./README.md).
