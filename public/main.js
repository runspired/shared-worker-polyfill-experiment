(function() {
  var states = {
    initial: 'Setting up Workers',
    pending: 'Testing if we can polyfill.',
    success: 'We can polyfill :-)',
    failure: 'We cannot polyfill :-(',
    timeout: 'Test timeout, We cannot polyfill :-('
  };

  var statusContainer = document.getElementById('status');
  statusContainer.innerText = states.initial;

  var workerA = new Worker('./worker-a.js');
  var workerB = new Worker('./worker-b.js');

  var failureTimeout = setTimeout(function() {
    statusContainer.innerText = states.timeout;
  }, 5000);

  workerB.addEventListener('message', function(msg) {
    clearTimeout(failureTimeout);
    statusContainer.innerText = states.success;
  });

  workerA.addEventListener('message', function(msg) {
    statusContainer.innerText = states.pending;
    console.log('a message', msg);

    if (msg.ports[0]) {
      try {
        workerB.postMessage('setup-port', [msg.ports[0]]);
      } catch (e) {
        statusContainer.innerText = states.failure;
        console.error(e);
      }
    }
  });
})();