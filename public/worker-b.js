(function() {
  self.port = null;

  self.onmessage = function(msg) {
    console.log('worker b msg received');
    if (msg.ports[0]) {
      self.port = msg.ports[0];
      self.port.onmessage = function(msg) {
        console.log('worker b channel msg received');
        self.postMessage('success');
      };
      self.port.postMessage('hello world');
    }
  };
})();