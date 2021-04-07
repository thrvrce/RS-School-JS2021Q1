const INPUT_MAX_LENGTH = 4;
const numberInput = document.getElementById('inputNumberElement');


numberInput.addEventListener('input', (event) => {
  event.target.value =
    event.target.value.length > INPUT_MAX_LENGTH
        ? event.target.value.substr(0, INPUT_MAX_LENGTH)
        : event.target.value
});