function initCarousel() {
  // ваш код...
  const rightBtn = document.querySelector('.carousel__arrow_right');
  const leftBtn = document.querySelector('.carousel__arrow_left');
  const inner = document.querySelector('.carousel__inner');
  const maxSlide = 4;
  let count = 0;
  hideBtn();
  
  rightBtn.addEventListener('click', () => {
    count--;
    inner.style.transform = 'translateX(' + inner.offsetWidth * count +'px)';
    hideBtn();
  })

  leftBtn.addEventListener('click', () => {
    count++;
    inner.style.transform = 'translateX(' + inner.offsetWidth * count +'px)'
    hideBtn();
  })

  function hideBtn () {
    if (count <= (maxSlide -1)) {
      leftBtn.style.display = '';
      rightBtn.style.display = 'none';
    }
    if (count >= 0) {
      rightBtn.style.display = '';
      leftBtn.style.display = 'none';
    }
    if ((count < 0) && (count > -(maxSlide - 1))) {
      rightBtn.style.display = '';
      leftBtn.style.display = '';
    }
  }
}
