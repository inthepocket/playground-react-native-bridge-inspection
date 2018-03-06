import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue.js';

let state = [];
const nativeModules = {};
let count = 0;
let timestamp;

type TOptions = {
  nativeModule?: string, // The NativeModule bridge communication that you want to inpect
  bundleSize: number, // By default 200 messages will be taken together
};

type TBridgeData = {
  type: number,
  module: string,
  args: Array<*>,
};

function log(bridgeData, bundleSize = 200) {
  state.push(bridgeData);

  if (state.length === bundleSize) {
    console.log('INSPECT BRIDGE', state);
    state = [];
  }
}

function createSpyFunction({ nativeModule, bundleSize }) {
  return (msg: TBridgeData) => {
    if (nativeModule && nativeModule !== msg.module) {
      return;
    }
    let source;
    if (msg.type === 1) {
      source = 'javascript';
    } else {
      source = 'native';
    }
    const bridgeData = { source, type: null, ...msg };

    log(bridgeData, bundleSize);
  };
}

function inspect(options: TOptions = {}) {
  const spyFunction = createSpyFunction(options);
  MessageQueue.spy(spyFunction);
}

function inspectTotalTraffic({ nativeModule, bundleSize = 1}: TOptions = {}) {
  const createInspectTotalTrafficFunction = (msg: TBridgeData) => {
    if (nativeModule && nativeModule !== msg.module) {
      return;
    }

    if (count === 0) {
      timestamp = new Date();
    }

    count++;
    if (count%bundleSize === 0) {
      console.log('INSPECT BRIDGE COUNT:', count, ` --- ${Math.round(count/((new Date()-timestamp)/1000))} bridge/sec`)
    }
  }

  MessageQueue.spy(createInspectTotalTrafficFunction)
}

function inspectExistingNativeModules() {
  const inspectNativeModules = (msg) => {
    if (nativeModules[msg.module] === undefined) {
      nativeModules[msg.module] = msg.module;
      console.log('BRIDGE MODULES', Object.keys(nativeModules));
    }
  };
  MessageQueue.spy(inspectNativeModules);
}

function reset() {
  console.log('RESET counter')
  count = 0;
}

export default {
  inspect,
  inspectExistingNativeModules,
  inspectTotalTraffic,
  reset
};
