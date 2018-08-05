var self;
var zwave;
var nodes = [];
var homeid = null;
var startupInterval;
var scanComplete = false;
var exports = module.exports = {
    Start: function () {
        self = this;
        scanComplete = false;
        this.AddNpmPackage('openzwave-shared@1.4.5', true, function (err) {
            self.Debug('openzwave-shared installed');
            if (!err) {
                self.Run();
                startupInterval = setInterval(function () {
                    self.Debug('Restarting')
                    let driverpath = self.GetPropertyValue('static', 'driverpath');
                    zwave.disconnect(driverpath);
                    zwave.softReset();
                    zwave.connect(driverpath);
                    // self.Stop(function () {
                    //     self.Debug('Starting')
                    //     self.Run();
                    // });

                    //zwave.healNetwork();
                }, 60000 * 2);
            } else {
                this.ThrowError(null, '00001', 'Unable to install the openzwave-shared npm package');
                return;
            }
        });
    },

    Stop: function (callback) {
        let driverpath = self.GetPropertyValue('static', 'driverpath');
        scanComplete = false;

        if (zwave) {
            zwave.disconnect(driverpath);
            zwave = null;
        }
        if (startupInterval) {
            clearInterval(startupInterval);
        }

        if (callback) {
            callback();
        }
    },

    Process: function (state, context) {
        if (!scanComplete) {
            return;
        }
        this.Debug('');
        this.Debug('***************************');
        self.SubmitMessage({
            switches: state.desired.switches
        }, 'application/json', []);
        //this.Debug('Incomming state: ' + JSON.stringify(state))
        if (zwave) {
            for (var node in state.desired.switches) {
                try {
                    var switchnode = state.desired.switches[node];
                    if (nodes[switchnode.id]) {
                        self.Debug('id: ' + switchnode.id + ' ' + nodes[switchnode.id].classes[switchnode.c][0].value + '=> ' + switchnode.value)
                        if (nodes[switchnode.id].classes[switchnode.c][0].value != switchnode.value) {
                            zwave.setValue(switchnode.id, switchnode.c, switchnode.i, 0, switchnode.value);
                        }
                    }
                }
                catch (e) {
                    self.Debug(e)
                    self.Debug(JSON.stringify(nodes));
                }
            }
        }

    },

    Run: function () {
        //let ZWave = require('/root/msb/node_modules/microservicebus-node/node_modules/openzwave-shared/lib/openzwave-shared.js');
        let ZWave = require('openzwave-shared');
        let driverpath = self.GetPropertyValue('static', 'driverpath');
        zwave = new ZWave({
            ConsoleOutput: true,
            //driverattempts: 100,
        });

        zwave.on('driver ready', function (home_id) {
            self.Debug('scanning homeid=0x%s...', home_id.toString(16));
        });

        zwave.on('driver failed', function () {
            self.ThrowError(null, '00002', 'failed to start driver');
            zwave.disconnect();
        });

        zwave.on('node added', function (nodeid) {
            nodes[nodeid] = {
                manufacturer: '',
                manufacturerid: '',
                product: '',
                producttype: '',
                productid: '',
                type: '',
                name: '',
                loc: '',
                classes: {},
                ready: false,
            };
        });

        zwave.on('node ready', function (nodeid, nodeinfo) {
            self.Debug('node ready (' + nodeid + ')');
            var stateNodes = [];
            nodes[nodeid]['manufacturer'] = nodeinfo.manufacturer;
            nodes[nodeid]['manufacturerid'] = nodeinfo.manufacturerid;
            nodes[nodeid]['product'] = nodeinfo.product;
            nodes[nodeid]['producttype'] = nodeinfo.producttype;
            nodes[nodeid]['productid'] = nodeinfo.productid;
            nodes[nodeid]['type'] = nodeinfo.type;
            nodes[nodeid]['name'] = nodeinfo.name;
            nodes[nodeid]['loc'] = nodeinfo.loc;
            nodes[nodeid]['ready'] = true;
            for (var comclass in nodes[nodeid]['classes']) {
                switch (comclass) {
                    case 0x25: // COMMAND_CLASS_SWITCH_BINARY
                    case 0x26: // COMMAND_CLASS_SWITCH_MULTILEVEL
                        zwave.enablePoll(nodeid, comclass);
                        break;
                }

                var values = nodes[nodeid]['classes'][comclass];
            }
            let switchNodes = {};
            for (let n = 0; n < nodes.length; n++) {
                if (nodes[n] && nodes[n].classes[37]) {
                    if (!self.Com.currentState.desired.switches) {
                        self.Debug("No switches set in state");
                        self.Com.currentState.desired.switches = {};
                    }
                    stateSwtich = self.Com.currentState.desired.switches['switch-' + n];
                    //self.Debug('node Ready -> Title: ' + stateSwtich.title);
                    switchNodes['switch-' + n] = {
                        id: n,
                        c: 37,
                        i: nodes[n].classes[37][0].instance,
                        index: nodes[n].classes[37][0].index,
                        value: nodes[n].classes[37][0].value,
                        title: stateSwtich ? stateSwtich.title : 'switch-' + n
                    };
                }
            }

            self.Debug('node ready: ' + JSON.stringify(switchNodes));

            self.SubmitMessage({
                switches: switchNodes
            }, 'application/json', []);
        });

        zwave.on('value added', function (nodeid, comclass, value) {
            //self.Debug('value added (' + nodeid + ')');
            if (!nodes[nodeid]['classes'][comclass])
                nodes[nodeid]['classes'][comclass] = {};
            nodes[nodeid]['classes'][comclass][value.index] = value;
        });

        zwave.on('value changed', function (nodeid, comclass, value) {
            self.Debug('value changed (' + nodeid + ')');

            if (nodes[nodeid]['ready']) {
                console.log('node%d: changed: %d:%s:%s->%s', nodeid, comclass,
                    value['label'],
                    nodes[nodeid]['classes'][comclass][value.index]['value'],
                    value['value']);

                console.log("mSB: " + JSON.stringify(value));
                nodes[nodeid]['classes'][comclass][value.index] = value;

                let switchNodes = {};
                for (let n = 0; n < nodes.length; n++) {
                    if (nodes[n] && nodes[n].classes[37]) {
                        stateSwtich = self.Com.currentState.desired.switches['switch-' + n];

                        switchNodes['switch-' + n] = {
                            id: n,
                            c: 37, i:
                                nodes[n].classes[37][0].instance,
                            index: nodes[n].classes[37][0].index,
                            value: nodes[n].classes[37][0].value,
                            title: stateSwtich ? stateSwtich.title : 'switch-' + n
                        };
                    }
                }
                self.Debug('value changed: ' + JSON.stringify(switchNodes));
                self.SubmitMessage({
                    switches: switchNodes
                }, 'application/json', []);
            }

        });

        zwave.on('scan complete', function () {
            self.Debug('Scan complete');

            zwave.requestAllConfigParams(3);

            zwave.addNode();
            scanComplete = true;
        });

        zwave.connect(driverpath);
    }
};