const filterContainer = document.querySelector('.filters');

const handleFilterChange = (event) => {
  const currentTarget = event.target;
  const filterType = currentTarget.name;
  const filterValue = currentTarget.value;
  const filterSizing = currentTarget.dataset.sizing;
  const filterOutputElement = currentTarget.parentNode.querySelector('output');
  filterOutputElement.value = filterValue;
}

filterContainer.addEventListener('input', handleFilterChange);