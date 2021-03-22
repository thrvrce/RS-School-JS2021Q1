const PIANO_KEY_ACTIVE = 'piano-key-active';

const piano = document.querySelector('.piano');
let clickedPianoKey = null;

const playNote = (noteName) => {
  const pathToAudioFile = `./assets/audio/${noteName}.mp3`;
  const audioElement = new Audio(pathToAudioFile);
  audioElement.currentTime = 0;
  audioElement.oncanplaythrough = audioElement.play;
}

const setPianoKeyActive = (pianoKeyElement) => pianoKeyElement.classList.add(PIANO_KEY_ACTIVE);
const setPianoKeyInActive = (pianoKeyElement) => pianoKeyElement.classList.remove(PIANO_KEY_ACTIVE);

const handleMouseDown = (event) => {
  const currentPianoKeyElement = event.target;
  const noteName = currentPianoKeyElement.dataset.note;
  console.log('mousedown', noteName);
  if (noteName) {
    clickedPianoKey = currentPianoKeyElement;
    setPianoKeyActive(currentPianoKeyElement);
    playNote(noteName);
  }
}

const handleMouseUp = () => {
  console.log('mouseup', clickedPianoKey);
  if (clickedPianoKey) {
    setPianoKeyInActive(clickedPianoKey)
    clickedPianoKey = null;
  }
}

const getValidKeyCode = (code) => code.substring(3,4);
const getPianoKeyNodeByLetter = (letter) => Array.from(document.querySelectorAll('.piano-key')).filter( (pianoKey) => pianoKey.dataset.letter === letter);

const handleKeyDown = (event) => {
  const pressedKeyCode = getValidKeyCode(event.code);
  const [pianoKey] = getPianoKeyNodeByLetter(pressedKeyCode);
  console.log('keydown', pressedKeyCode);

  if(!event.repeat && pianoKey ) {
    setPianoKeyActive(pianoKey.dataset.note);
    playNote(note);
  }
}

const handleKeyUp =(event) => {
  console.log('keyup', arrOfPressedPianoKeys);
  const pressedKeyCode = getValidKeyCode(event.code);
  const [pianoKey] = getPianoKeyNodeByLetter(pressedKeyCode);

  if (pianoKey && pianoKey.classList.contains(PIANO_KEY_ACTIVE)) {
    setPianoKeyInActive(pianoKey)
  }
}

piano.addEventListener('mousedown', handleMouseDown);
window.addEventListener('mouseup', handleMouseUp);

window.addEventListener('keydown', handleKeyDown)
window.addEventListener('keyup', handleKeyUp)
