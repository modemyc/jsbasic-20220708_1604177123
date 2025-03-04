import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this._steps = steps;
    this._value = value;

    this._slider = createElement(this.template());

    this._spanMaker();
    this._sliderInitEvents();
    this._setValue();
  }

  get elem() {
    return this._slider;
  }

  template() {
    return `
      <div class="slider">

        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb" style="left: 0%;">
          <span class="slider__value">${this._value}</span>
        </div>

        <!--Заполненная часть слайдера-->
        <div class="slider__progress" style="width: 0%;"></div>

        <!--Шаги слайдера-->
        <div class="slider__steps"></div>
      </div>
    `
  };

  _spanMaker() {
    const sliderSteps = this._slider.querySelector('.slider__steps');
    sliderSteps.innerHTML = '';
    for (let index = 0; index < this._steps; index++) {
      sliderSteps.insertAdjacentHTML('beforeend', '<span></span>');
    }
  }

  _sliderInitEvents () {
    const thumb = this._slider.querySelector('.slider__thumb');

    this._slider.addEventListener('click', this._sliderThumbMove.bind(this));
    thumb.addEventListener('pointerdown', this._onPointerDown.bind(this));
  }

  _setValue() {
    const thumb = this._slider.querySelector('.slider__thumb');
    const sliderProgress = this._slider.querySelector('.slider__progress');
    const sliderSpanChildren = this._slider.querySelector('.slider__steps').children;
    const segments = this._steps - 1;

    thumb.style.left = (this._value / segments * 100) + '%';
    sliderProgress.style.width = (this._value / segments * 100) + '%';
    sliderSpanChildren[this._value].classList.add('slider__step-active')

    this._sliderCustomEvent(this._value);
  }

  _onPointerDown(event) {
    event.preventDefault();

    const thumb = this._slider.querySelector('.slider__thumb');
    const sliderProgress = this._slider.querySelector('.slider__progress');
    const sliderSpanChildren = this._slider.querySelector('.slider__steps').children;
    const sliderValue = this._slider.querySelector('.slider__value');
    const segments = this._steps - 1; 

    const shiftX = event.clientX - thumb.getBoundingClientRect().left;

    const _onPointerMove = (event) => {
      let newLeft = event.clientX - this._slider.getBoundingClientRect().left;

      if (newLeft < 0) {
        newLeft = 0;
      }

      if (newLeft > this._slider.offsetWidth) {
        newLeft = this._slider.offsetWidth;
      }

      const segmentPoint = (newLeft / this._slider.offsetWidth * segments);
      const endLeft = Math.round(segmentPoint);

      for (let index = 0; index < sliderSpanChildren.length; index++) {
        sliderSpanChildren[index].className = 
          index === endLeft ? '' : '';
      }

      if (sliderValue) {
        sliderValue.textContent = endLeft;
      }

      sliderProgress.style.width = newLeft + 'px';
      thumb.style.left = newLeft + 'px';
      this._slider.classList.add('slider_dragging');
      
    }

    const _onPointerUp = (event) => {
      document.removeEventListener('pointerup', _onPointerUp);
      document.removeEventListener('pointermove', _onPointerMove);

      let newLeft = event.clientX - shiftX - this._slider.getBoundingClientRect().left;
      const segmentPoint = (newLeft / this._slider.offsetWidth * segments);
      let endLeft = Math.round(segmentPoint);
      this._slider.classList.remove('slider_dragging');

      if (newLeft < 0) {
        endLeft = 0;
      }

      if (newLeft > this._slider.offsetWidth) {
        endLeft = segments;
      }
      
      thumb.style.left = (endLeft / segments * 100) + '%'; //установил значение
      sliderProgress.style.width = (endLeft / segments * 100) + '%'; //установил заливку

      for (let index = 0; index < sliderSpanChildren.length; index++) {
        sliderSpanChildren[index].className = 
          index === endLeft ? 'slider__step-active' : '';
      }

      if (sliderValue) {
        sliderValue.textContent = endLeft;
        this._sliderCustomEvent(endLeft);
      }
    }

    document.addEventListener('pointermove', _onPointerMove);
    document.addEventListener('pointerup', _onPointerUp);
  }

  _sliderThumbMove(event) {
    const thumb = this._slider.querySelector('.slider__thumb');
    const sliderValue = this._slider.querySelector('.slider__value');
    const sliderProgress = this._slider.querySelector('.slider__progress');
    const sliderSpanChildren = this._slider.querySelector('.slider__steps').children;
    const segments = this._steps - 1; 

    let shiftX = event.clientX - this._slider.getBoundingClientRect().left; //позиция клика по оси Х
    let segmentPoint = (shiftX / this._slider.offsetWidth * segments); //высчитал сегмент в котором произошел клик
    let newLeft = Math.round(segmentPoint);

    if (sliderValue) {
      sliderValue.textContent = newLeft;
    }

    thumb.style.left = (newLeft / segments * 100) + '%'; //установил значение
    sliderProgress.style.width = (newLeft / segments * 100) + '%'; //установил заливку

    for (let index = 0; index < sliderSpanChildren.length; index++) {
      sliderSpanChildren[index].className = 
        index === newLeft ? 'slider__step-active' : '';
    }

    if (sliderValue) {
      this._sliderCustomEvent(newLeft);
    }
  }

  _sliderCustomEvent(value) {
    this.elem.dispatchEvent(
      new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: value, // значение 0, 1, 2, 3, 4 ...
        bubbles: true // событие всплывает - это понадобится в дальнейшем
        }
      )
    )
  }
}