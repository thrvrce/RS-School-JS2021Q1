const filterContainer = document.querySelector('.filters');
const img = document.querySelector('img');
const saveButton = document.querySelector('.btn-save');

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

  document.querySelectorAll('input[type="range"]').forEach(inputElement => {
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
