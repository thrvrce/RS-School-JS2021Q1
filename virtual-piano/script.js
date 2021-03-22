const PIANO_KEY_ACTIVE = 'piano-key-active';
const PIANO_KEY_PSEUDO = 'piano-key-pseudo';
const BTN = 'btn';
const BTN_ACTIVE = 'btn-active';

const piano = document.querySelector('.piano');
let clickedPianoKey = null;
const btnsContainer = document.querySelector('.btn-container');
const btns = Array.from(document.querySelectorAll(`.${BTN}`));
const pianoKeys = Array.from(document.querySelectorAll('.piano-key')).filter((pianoKey) => pianoKey.dataset.letter !== undefined);
const fullscreenButton = document.querySelector('.fullscreen');
let isFullSCreenActive = false;

const playNote = (noteName) => {
  const pathToAudioFile = `./assets/audio/${noteName}.mp3`;
  const audioElement = new Audio(pathToAudioFile);
  audioElement.currentTime = 0;
  audioElement.oncanplaythrough = audioElement.play;
}

const setPianoKeyActive = (pianoKeyElement) => pianoKeyElement.classList.add(PIANO_KEY_ACTIVE);
const setPianoKeyInActive = (pianoKeyElement) => pianoKeyElement.classList.remove(PIANO_KEY_ACTIVE);

const handleMouseActivateKey = (event) => {

  const currentPianoKeyElement = event.target;
  const noteName = currentPianoKeyElement.dataset.note;

  if (noteName && !currentPianoKeyElement.classList.contains(PIANO_KEY_ACTIVE)) {
    if (event.type === 'mousedown') {
      clickedPianoKey = currentPianoKeyElement;
    }
    if (event.type === 'mousedown' || (event.type === 'mouseover' && clickedPianoKey)) {
      setPianoKeyActive(currentPianoKeyElement);
      playNote(noteName);
    }
  }
}

const handleMouseDeactivateKey = (event) => {

  if (event.type === 'mouseup' && clickedPianoKey) {
    setPianoKeyInActive(clickedPianoKey)
    clickedPianoKey = null;
  } else {
    const currentPianoKeyElement = event.target;
    const noteName = currentPianoKeyElement.dataset.note;
    if (noteName) {
      setPianoKeyInActive(event.target);
    }
  }
}

const getValidKeyCode = (code) => code.substring(3, 4);
const getPianoKeyNodeByLetter = (letter) => pianoKeys.filter((pianoKey) => pianoKey.dataset.letter === letter);

const handleKeyDown = (event) => {

  const pressedKeyCode = getValidKeyCode(event.code);
  const [pianoKey] = getPianoKeyNodeByLetter(pressedKeyCode);
  console.log('keydown', pressedKeyCode);

  if (!event.repeat && pianoKey && !pianoKey.classList.contains(PIANO_KEY_ACTIVE)) {
    setPianoKeyActive(pianoKey);
    playNote(pianoKey.dataset.note);
  }
}

const handleKeyUp = (event) => {

  const pressedKeyCode = getValidKeyCode(event.code);
  const [pianoKey] = getPianoKeyNodeByLetter(pressedKeyCode);

  if (pianoKey && pianoKey.classList.contains(PIANO_KEY_ACTIVE)) {
    setPianoKeyInActive(pianoKey)
  }
}

const handleBtnsContainerClick = (event) => {

  if (event.target.classList.contains(BTN) && !event.target.classList.contains(BTN_ACTIVE)) {
    const [prevActiveButton] = btns.filter((button) => button.classList.contains(BTN_ACTIVE));
    prevActiveButton.classList.remove(BTN_ACTIVE);

    event.target.classList.add(BTN_ACTIVE);
    pianoKeys.forEach((pianoKey) => {
      pianoKey.classList.add(`${PIANO_KEY_PSEUDO}-${event.target.dataset.pseudocontent}`);
      pianoKey.classList.remove(`${PIANO_KEY_PSEUDO}-${prevActiveButton.dataset.pseudocontent}`);
    })
  }
}

const handleFullScreenClick = () => {
  if (!isFullSCreenActive) {
    isFullSCreenActive = true;
    document.body.requestFullscreen();
  } else {
    isFullSCreenActive = false;
    document.exitFullscreen();
  }
}

piano.addEventListener('mousedown', handleMouseActivateKey);
window.addEventListener('mouseup', handleMouseDeactivateKey);

piano.addEventListener('mouseover', handleMouseActivateKey)
piano.addEventListener('mouseout', handleMouseDeactivateKey);

window.addEventListener('keydown', handleKeyDown)
window.addEventListener('keyup', handleKeyUp)

btnsContainer.addEventListener('click', handleBtnsContainerClick)

fullscreenButton.addEventListener('click', handleFullScreenClick)