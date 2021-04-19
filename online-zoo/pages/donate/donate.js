const INPUT_MAX_LENGTH = 4;
const numberInput = document.getElementById('inputNumberElement');


numberInput.addEventListener('input', (event) => {
  event.target.value =
    event.target.value.length > INPUT_MAX_LENGTH
      ? event.target.value.substr(0, INPUT_MAX_LENGTH)
      : event.target.value
});


const input5000 = document.querySelector('[data-ammount="5000"]');
const input2000 = document.querySelector('[data-ammount="2000"]');
const input1000 = document.querySelector('[data-ammount="1000"]');
const input100 = document.querySelector('[data-ammount="100"]');
const handleResize = () => {
  const windowWidth = document.documentElement.offsetWidth;

  if (windowWidth < 1000) {
    input100.click();
  } else {
    input1000.click();
  }


  input5000.style.display = windowWidth >= 1600 ? 'block' : 'none';
  input2000.style.display = windowWidth >= 640 ? 'block' : 'none';
  input1000.style.display = windowWidth >= 640 ? 'block' : 'none';


}

window.addEventListener('load', handleResize)
window.addEventListener('resize', handleResize);