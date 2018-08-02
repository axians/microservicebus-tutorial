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