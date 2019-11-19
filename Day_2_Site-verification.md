# Site verification

Arguably, one of the biggest challenges when rolling out new solutions, is the on-site installation and setup. Mounting a gateway and getting it connected to the cloud is often a minor part of the complete installation. Lots of wires, meters and other equipment might be required, and it’s vital that everything is connected before the on-site engineer leaves the premises and call it a day.

The solution to this is to create a *Site Verification* test, and let the on-site engineer run the test(s) to verify it’s all up and running.

## Writing a site verification test
Site verification test is nothing but a normal unit test. If you have ever written a unit test before, this should be really easy. If not, don’t panic. The *Test-Driven Development* pattern is very easy to understand. 

> The *Site Verification Test* is using [mocha](https://mochajs.org/) which comes preinstalled for you *Node*.

### Create your first test
Writing a verification tests are just like writing a normal *Service*. In the [microServiceBus.com portal](https://microServiceBus.com) navigate to *Scripts & Services* using the navigation menu. Click the **CREATE NEW** button. Set a name, filename and description. Before you hit the *CREATE* button, select **Test file** in the *Service type* drop-down list.

#### Test parameters
In many scenarios you need the site engineer to be able to provide input to the test, such as which *serial port* or IP address to use. As with normal *Services*, add your parameters in the *Static Properties* tab. 
> Make sure to use well descriptive names as these properties are going to be presented in the *Site Verification Application*

Inside your test script, you can access these properties using the following syntax:
```javascript
let ipAddress = getPropertyValue('ipAddress');

```

### The Basic Test Building Blocks
Every test case file follows the same basic pattern. First, you have a **describe** block:

```javascript
describe('Meter connection', function() {
  // Further code for tests goes here
});
```
**describe** is used to group individual tests. The first parameter should indicate what we’re testing — in this case, we’re going to make sure we're connected to a meter, as we’ve passed in the string 'Meter connection'.

Secondly, inside the describe, we’ll have **it** blocks:

```javascript
describe('Meter connection', function() {
  it('should be a valid IP address', function() {
    // Test implementation goes here
  });

  // We can have more its here
});
```
**it** is used to create the actual tests. The first parameter to **it** should provide a human-readable description of the test. For example, we can read the above as “should be a valid IP address”, which is a good description of what we expect. The code to implement the test is then written inside the function passed to **it**.

> All Mocha tests are built from these same building blocks, and they follow this same basic pattern.

### Writing the Test Code
To validate the IP Address, we can use a Regular expression, and test it with the IP Address parameter provided by the site engineer:

```javascript
describe('Meter connection', function() {
    it('should be a valid IP address', function() {
        const pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        let ipAddress = getPropertyValue('ipAddress');
        let valid = pattern.test(ipAddress);
        expect(valid).to.equal(true, 'Please provide a valid IP Address');
    });
});
```
> Your test can have any number if **if** blocks!

### Run the site verification test
Before you can run the test on the *Node* you need to set the *Node* in "Test mode". Navigate to the *Node* page and select **properties** from the *Action menu*. On the *Node* properties page, set the *Mode* to "Test mode". Also click the *Identities* tab on the top and copy the serial number (set it if empty). Last, save the changes.

On the *Save confirmation* dialog, click the "VIEW QR CODE" button. User your phone to navigate to the [site verification app](https://microservicebus.com/test). Follow the instructions on the screen to verify the installation.
