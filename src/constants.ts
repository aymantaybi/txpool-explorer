const options = {
  timeout: 10000,
  clientConfig: {
    maxReceivedFrameSize: 1000000000,
    maxReceivedMessageSize: 1000000000,
    keepalive: true,
    keepaliveInterval: 1000,
  },
  reconnect: {
    auto: true,
    delay: 100,
    maxAttempts: 10,
    onTimeout: false,
  },
};

export { options };
