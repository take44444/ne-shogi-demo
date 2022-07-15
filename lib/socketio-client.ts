class SocketIOClient {
  private clientEvents: any;
  private serverEvents: any;
  constructor() {
    this.clientEvents = {};
    this.serverEvents = {};
    this.serverOn('ping', (timestamp: number) => {
      this.serverEmit('pong', timestamp);
    });
  }

  connect(url_: string, props_: {
    transports: string[],
    forceNew: boolean,
    reconnection: boolean
  }) {
    return this;
  }

  on(eventName: string, callback: Function=() => {}) {
    this.clientEvents[eventName] = callback;
  }

  emit(eventName: string, arg: any, ack: Function=() => {}) {
    this.serverEvents[eventName](arg, ack);
  }

  serverOn(eventName: string, callback: Function=() => {}) {
    this.serverEvents[eventName] = callback;
  }

  serverEmit(eventName: string, arg: any, ack: Function=() => {}) {
    this.clientEvents[eventName](arg, ack);
  }
}

export default SocketIOClient;