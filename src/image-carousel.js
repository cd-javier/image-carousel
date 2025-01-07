function imgCarousel(targetId) {
  const carouselContainer = document.getElementById(`${targetId}`);
  const nextArrow = carouselContainer.querySelector('.arrow-r');
  const prevArrow = carouselContainer.querySelector('.arrow-l');
  const imgArr = carouselContainer.querySelectorAll('img');
  const carouselLength = imgArr.length - 1;
  let currentImg = 0;

  // Updates the currentImg counter and returns is value
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
