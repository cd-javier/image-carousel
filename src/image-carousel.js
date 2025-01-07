function imageCarousel(targetId, timeoutDelay) {
  const carouselContainer = document.getElementById(`${targetId}`);
  const nextArrow = carouselContainer.querySelector('.arrow-r');
  const prevArrow = carouselContainer.querySelector('.arrow-l');
  const imgArr = carouselContainer.querySelectorAll('img');
  const dotNavWrapper = carouselContainer.querySelector(
    '.dot-navigation-wrapper'
  );
  const carouselLength = imgArr.length - 1;
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

  // Updates the value of currentImg counter and returns is value
  function getNextImg() {
    if (currentImg < carouselLength) {
      currentImg++;
    } else {
      currentImg = 0;
    }
    return currentImg;
  }

  function getPrevImg() {
    if (currentImg > 0) {
      currentImg--;
    } else {
      currentImg = carouselLength;
    }
    return currentImg;
  }

  // Scrolls to selected image
  function scrollImg(i) {
    imgArr[i].scrollIntoView();
    selectDot(i);
    if (timeoutDelay) restartTimeout(); // Restarts the timer if there is one
  }

  // Scrolls to next/prev image
  function scrollNextImg() {
    scrollImg(getNextImg());
  }

  function scrollPrevImg() {
    scrollImg(getPrevImg());
  }

  // Adds dot navigation
  imgArr.forEach(() => {
    const singleDot = document.createElement('div');
    singleDot.classList.add('nav-dot');
    dotNavWrapper.appendChild(singleDot);
  });
  const dotArr = dotNavWrapper.querySelectorAll('.nav-dot');

  // Adds class to the corresponding dot
  function selectDot(i) {
    dotArr.forEach((dot) => dot.classList.remove('selected-dot'));
    dotArr[i].classList.add('selected-dot');
  }

  nextArrow.addEventListener('click', scrollNextImg);
  prevArrow.addEventListener('click', scrollPrevImg);
  selectDot(0);
}

export default imageCarousel;
