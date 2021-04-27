const filterContainer = document.querySelector('.filters');
const img = document.querySelector('img');
const saveButton = document.querySelector('.btn-save');
const resetButton = document.querySelector('.btn-reset');
const openFileButton = document.querySelector('.btn-load--input');
const fullScreenleButton = document.querySelector('.fullscreen');
const nextButton = document.querySelector('.btn-next');
const filterInputCollection = document.querySelectorAll('input[type="range"]');
const periodsOfDay = {
  night: 'night',
  morning: 'morning',
  day: 'day',
  evening: 'evening',
}
let lastPeriodOfDay = '';
let lastUsedImageNumber = 0;

const setImageFilter = (filter) => {
  const root = document.documentElement;
  root.style.setProperty(`--${filter.name}`, `${filter.value}${filter.sizing}`);
}

const handleFilterChange = (event) => {
  const currentTarget = event.target;
  const changedFilter = {
    name: currentTarget.name,
    value: currentTarget.value,
    sizing: currentTarget.dataset.sizing,
  };

  const filterOutputElement = currentTarget.parentNode.querySelector('output');
  filterOutputElement.value = changedFilter.value;

  setImageFilter(changedFilter);
}

filterContainer.addEventListener('input', handleFilterChange);
saveButton.addEventListener('click', () => {
  const filterValues = {};
  let filtersStrng = '';

  filterInputCollection.forEach(inputElement => {
    const canvasFilterName = inputElement.name === 'hue' ? 'hue-rotate' : inputElement.name;
    filtersStrng += ` ${canvasFilterName}(${inputElement.value + inputElement.dataset.sizing})`;
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  ctx.filter = filtersStrng;
  ctx.drawImage(img, 0, 0);

  var link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
})

const getPeriodOfDay = (currentHour) => {
  if (currentHour >= 0 && currentHour <= 5) {
    return periodsOfDay.night;
  }
  if (currentHour >= 6 && currentHour <= 11) {
    return periodsOfDay.morning;
  }
  if (currentHour >= 12 && currentHour <= 17) {
    return periodsOfDay.day;
  }
  if (currentHour >= 18 && currentHour <= 23) {
    return periodsOfDay.evening;
  }
}

resetButton.addEventListener('click', () => {
  filterInputCollection.forEach(inputElement => {
    inputElement.value = inputElement.getAttribute('value');
    inputElement.dispatchEvent(new Event('input', { bubbles: true }))

  })
})

openFileButton.addEventListener('input', (event) => {
  const clearInputValue = () => event.target.value = '';
  const allowedFileTypes = ['jpg', 'jpeg', 'png', 'gif']
  let file = event.target.files[0];
  if (file) {
    if (!allowedFileTypes.includes(file.type.slice('image/'.length))) {
      alert(`${file.type} не является ${allowedFileTypes.toString()}`)
      clearInputValue(event);
    } else {
      const reader = new FileReader();
      reader.onload = async () => {
        img.src = reader.result;

        img.onload = clearInputValue;
        img.onerror = clearInputValue;
      }
      reader.readAsDataURL(file);
    }
  } else {
    clearInputValue();
  }
});

fullScreenleButton.addEventListener('click', () => {

  if (!document.fullscreenElement) {
    document.body.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
})



nextButton.addEventListener('click', () => {
  const curentHour = (new Date()).getHours();
  const curentPeriodOfDay = getPeriodOfDay(curentHour);
  if (lastPeriodOfDay) {
    lastPeriodOfDay = getPeriodOfDay(curentHour);
  }

  if (lastPeriodOfDay !== curentPeriodOfDay) {
    lastUsedImageNumber = 0;
    lastPeriodOfDay = curentPeriodOfDay;
  }

  lastUsedImageNumber += 1;
  let imageNumber = lastUsedImageNumber % 20 ? lastUsedImageNumber % 20 : 20;
  imageNumber = imageNumber < 10 ? `0${imageNumber}` : `${imageNumber}`;
  const imageURL = ` https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${curentPeriodOfDay}/${imageNumber}.jpg`;

  img.setAttribute('crossOrigin', 'anonymous');
  img.src = imageURL;
})