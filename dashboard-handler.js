
/* 
connnection code for dock.js
const port = chrome.runtime.connect()

//*/
var interval_id;
window.onload = function() {

  /* 
  port.postMessage({requireData: 'blockingStats'})
  port.onMessage.addListener(function(d) {
    console.debug(`Message recieved: ${d}`)
  })
  function update() {
    port.postMessage({ to: 'utils/log-event', from: 'dashboard-handler', data: { require: 'blockingStats' }})
  }
  //*/
  var log = document.getElementById('console-log');
  log.innerText = '';

  document.getElementById('update-button').onclick = () => {
    for (let i = 0; i < 10; i++) {
      log.innerText += 'test' + new Date() + '\n';
    }
  }

  // autoscroll to bottom: https://stackoverflow.com/a/33193668
  var element = document.getElementById('console-log');
  element.scrollTop = element.scrollHeight - element.clientHeight;
};
