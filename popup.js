// Play the song when the popup opens
window.addEventListener('load', function() {
    var audio = document.getElementById('myAudio');
    audio.play();
  });
  
  // Stop the song when the popup closes
  window.addEventListener('unload', function() {
    var audio = document.getElementById('myAudio');
    audio.pause();
    audio.currentTime = 0;
  });
  