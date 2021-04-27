const filterContainer = document.querySelector('.filters');
const img = document.querySelector('img');
const saveButton = document.querySelector('.btn-save');
const resetButton = document.querySelector('.btn-reset');
const openFileButton = document.querySelector('.btn-load--input');
const fullScreenleButton = document.querySelector('.fullscreen');
const filterInputCollection = document.querySelectorAll('input[type="range"]');

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

resetButton.addEventListener('click', () => {
  filterInputCollection.forEach(inputElement => {
    inputElement.value = inputElement.getAttribute('value');
    inputElement.dispatchEvent(new Event('input', { bubbles: true }))

  })
})

openFileButton.addEventListener('change', (event) => {
  const allowedFileTypes = ['jpg', 'jpeg', 'png', 'gif']
  const file = event.target.files[0];
  if (file) {
    if (!allowedFileTypes.includes(fileType => `image/${fileType}` === file.type)) {
      alert(`${file.type} не является ${allowedFileTypes.toString()}`)
    } else {
      console.log(file)
      const reader = new FileReader();
      reader.onload = async () => {
        img.src = reader.result;
      }
      reader.readAsDataURL(file);
    }
  }
});

fullScreenleButton.addEventListener('click', () => {

  if (!document.fullscreenElement) {
    document.body.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
})