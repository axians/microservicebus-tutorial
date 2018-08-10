/* #STARTCONFIG
{
     "config": {
        "staticConfig": [{
            "category": null,
            "id": "test",
            "order": 0,
            "name": "mikael",
            "description": "Mikaelsdsss",
            "value": "Awesome",
            "type": "String",
            "mandatory": true,
            "visible": true,
            "acceptableValues": []
        },
        {
            "category": null,
            "id": "patrikssss",
            "order": 1,
            "name": "patrik",
            "description": "Mikaelsdsss",
            "value": "Awesome",
            "type": "String",
            "mandatory": true,
            "visible": true,
            "acceptableValues": []
        }],
        "securityConfig": []
    }
}
#ENDCONFIG*/

// TESTING
var timerEvent;
var self;

var exports = module.exports = {
    Start : function () {
        self = this;
        
        timerEvent = setInterval(function () {

            let payload = {
                someRandomValue : Math.random()
            };

            // Submit payload to host.
            self.SubmitMessage(payload);
        }, 10000);
    },

    Stop : function () {
        self.Debug('The Stop method is called.');
        // Stop the timerEvent
        clearInterval(timerEvent);
    },

    Process : function (message, context) {

    },
}