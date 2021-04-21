

const sideBar = document.querySelector('.sidebar');

const handleResize = () => {
  // двигат сайдбар в зависимости от положения эдемента с выбором видео
  const windowWidth = document.documentElement.offsetWidth;
  cameraSelector = document.querySelector('.animal-camera__video-selector');
  let sidebarLeft = '';
  if (windowWidth >= 1600) {
    sidebarLeft = '';
  }
  if (windowWidth < 1600) {
    sidebarLeft = cameraSelector.getBoundingClientRect().x - 72 - 90 ;
  }
  if (windowWidth < 1000) {
    sidebarLeft = cameraSelector.getBoundingClientRect().x - 72 - 33;
  }

  sideBar.style.left = sidebarLeft + 'px';
}

window.addEventListener('load', handleResize)
window.addEventListener('resize', handleResize);