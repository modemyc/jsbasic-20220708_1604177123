import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    this._elem = createElement(this._template());
    this._initCarouselEvents();
  }

  get elem() {
    return this._elem;
  }

  _template() {
    return `
    <div class="carousel">
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    <div class="carousel__inner">
    ${this.slides
      .map(
        (element) => `
    <div class="carousel__slide" data-id=${element.id}>
      <img src="/assets/images/carousel/${
        element.image
      }" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${parseInt(element.price).toFixed(
          2
        )}</span>
        <div class="carousel__title">${element.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
    `
      )
      .join("")}
    </div>
  </div>
  `;
  }

  _initCarouselEvents() {
    const carousel = this._elem;
    const carouselArrowLeft = carousel.querySelector(".carousel__arrow_left");
    const carouselArrowRight = carousel.querySelector(".carousel__arrow_right");
    const carouselPlussButton = carousel.querySelectorAll(".carousel__button");

    carouselArrowLeft.style.display = "none";
    carouselArrowRight.style.userSelect = "none";
    carouselArrowLeft.style.userSelect = "none";

    carouselArrowLeft.addEventListener('click', this._carouselScrolling);
    carouselArrowLeft.addEventListener('click', this._carouselArrowButtonVisibility);

    carouselArrowRight.addEventListener('click', this._carouselScrolling);
    carouselArrowRight.addEventListener('click', this._carouselArrowButtonVisibility);

    for (let buttonElem of carouselPlussButton) {
      buttonElem.addEventListener('click', this._PlusButtonClickEvent);
    }
  }

  _carouselScrolling(event) {
    const carousel = event.currentTarget.closest(".carousel");
    let currentScrollState = parseInt(carousel.dataset.currentScrollState, 10) || 0;

    if (event.currentTarget.matches(".carousel__arrow_left"))
    currentScrollState++;
    if (event.currentTarget.matches(".carousel__arrow_right"))
    currentScrollState--;

    carousel.dataset.currentScrollState = currentScrollState;

    const carousel__inner = carousel.querySelector(".carousel__inner");
    carousel__inner.style.transform = `translateX(${
      carousel__inner.clientWidth * currentScrollState
    }px)`;
  }

  _carouselArrowButtonVisibility(event) {
    const carousel = event.currentTarget.closest(".carousel");
    const carouselArrowLeft = carousel.querySelector(".carousel__arrow_left");
    const carouselArrowRight = carousel.querySelector(".carousel__arrow_right");

    const currentScrollState = parseInt(
      carousel.dataset.currentScrollState,
      10
    );
    const carouselChildrenElementsCount = carousel.querySelector(".carousel__inner").childElementCount;

    carouselArrowLeft.style.display = !currentScrollState ? "none" : "";
    carouselArrowRight.style.display =
      -currentScrollState === carouselChildrenElementsCount - 1 ? "none" : "";
  }

  _PlusButtonClickEvent(event) {
    event.target.dispatchEvent(
      new CustomEvent ("product-add", {
        detail: event.target.closest(".carousel__slide").dataset.id,
        bubbles: true,
      })
    )
  }

}
