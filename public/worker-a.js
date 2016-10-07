(function() {
  self.channel = new MessageChannel();
  self.channel.port1.onmessage = function(msg) {
    console.log('worker a channel msg received');
    console.log(msg);
    self.channel.port1.postMessage('hello back!');
  };

  self.postMessage('shared-channel', [self.channel.port2]);
})();