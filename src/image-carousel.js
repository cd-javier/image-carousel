function imgCarousel(targetId, timeoutDelay) {
  const carouselContainer = document.getElementById(`${targetId}`);
  const nextArrow = carouselContainer.querySelector('.arrow-r');
  const prevArrow = carouselContainer.querySelector('.arrow-l');
  const imgArr = carouselContainer.querySelectorAll('img');
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
    if (timeoutDelay) restartTimeout(); // Restarts the timer if there is one
  }

  // Scrolls to next/prev image
  function scrollNextImg() {
    scrollImg(getNextImg());
  }

  function scrollPrevImg() {
    scrollImg(getPrevImg());
  }

  nextArrow.addEventListener('click', scrollNextImg);
  prevArrow.addEventListener('click', scrollPrevImg);
}

export default imgCarousel;
