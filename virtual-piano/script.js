const piano = document.querySelector('.piano');

const playNote = (noteName) => {
  const pathToAudioFile = `./assets/audio/${noteName}.mp3`;
  const audioElement = new Audio(pathToAudioFile);
  audioElement.currentTime = 0;
  audioElement.oncanplaythrough = audioElement.play;
}

const handleMouseDown = (event) => {
  const noteName = event.target.dataset.note;
  console.log('mousedown', noteName);
  if(noteName) {
    playNote(noteName);
  }
}

piano.addEventListener('mousedown', handleMouseDown)