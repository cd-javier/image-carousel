function imageCarousel(targetId, timeoutDelay, aspectRatio = '16/9') {
  const carouselContainer = document.getElementById(`${targetId}`);
  const nextArrow = carouselContainer.querySelector('.arrow-r');
  const prevArrow = carouselContainer.querySelector('.arrow-l');
  const imgArr = carouselContainer.querySelectorAll('img');

  let currentImg = 0; // Counter to keep track of the image currently being shown
  let autoNextImg; // Variable to store the setTimeout

  if (timeoutDelay) {
    // Only active if the user inputs a value
    autoNextImg = setTimeout(scrollNextImg, timeoutDelay);
  }

  function restartTimeout() {
    clearTimeout(autoNextImg);
    autoNextImg = setTimeout(scrollNextImg, timeoutDelay);
  }

  // Returns the value of the next/prev image
  function getNextImg() {
    if (currentImg < imgArr.length - 1) {
      return currentImg + 1;
    } else {
      return 0;
    }
  }
  function getPrevImg() {
    if (currentImg > 0) {
      return currentImg - 1;
    } else {
      return imgArr.length - 1;
    }
  }

  // Scrolls to selected image
  function scrollImg(i, smoothScroll = true) {
    const behavior = smoothScroll ? 'smooth' : 'instant';
    imgArr[i].scrollIntoView({ behavior: behavior, inline: 'center' });
    selectDot(i);
    unhideImg(i);
    if (timeoutDelay) restartTimeout(); // Restarts the timer if there is one
    currentImg = i;
  }

  // Scrolls to next/prev image
  function scrollNextImg() {
    scrollImg(getNextImg());
  }

  function scrollPrevImg() {
    scrollImg(getPrevImg());
  }

  // Adjust the size of the carousel to respect aspect ratio
  function adjustCarouselHeight() {
    const width = carouselContainer.offsetWidth;
    const ratio = aspectRatio.split('/');
    const height = (width * ratio[1]) / ratio[0];
    carouselContainer.style.height = `${height}px`;
    scrollImg(currentImg, false);
  }

  // Adds dot navigation
  const dotNavWrapper = document.createElement('div');
  dotNavWrapper.classList.add('dot-nav-wrapper');
  imgArr.forEach(() => {
    const singleDot = document.createElement('div');
    singleDot.classList.add('nav-dot');
    dotNavWrapper.appendChild(singleDot);
  });
  carouselContainer.appendChild(dotNavWrapper);

  // Creates an array with every dot
  const dotArr = dotNavWrapper.querySelectorAll('.nav-dot');

  // Adds class to the corresponding dot
  function selectDot(i) {
    dotArr.forEach((dot, index) =>
      dot.classList.toggle('selected-dot', i === index)
    );
  }

  // Hides all images except for corresponding one
  function unhideImg(i) {
    imgArr.forEach((img, index) =>
      img.classList.toggle('visible-img', i === index)
    );
  }

  // Initiates the starting values
  function init() {
    selectDot(0);
    unhideImg(0);
    adjustCarouselHeight();
  }

  // Event listeners
  nextArrow.addEventListener('click', scrollNextImg);
  prevArrow.addEventListener('click', scrollPrevImg);
  dotArr.forEach((dot, index) => {
    dot.addEventListener('click', () => scrollImg(index));
  });
  window.addEventListener('resize', adjustCarouselHeight);

  init();
}

export default imageCarousel;
