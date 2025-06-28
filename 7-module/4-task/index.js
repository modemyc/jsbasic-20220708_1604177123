import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  #steps = 0;
  #value = 0;
  #previousValue = 0;

  elem = null;
  #sliderThumb = null;
  #sliderValue = null;
  #sliderProgress = null;
  #sliderSteps = null;

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = Math.min(value, steps - 1);
    this.#previousValue = this.#value;

    this.elem = createElement(this.#template());
    this.#sliderThumb = this.elem.querySelector(".slider__thumb");
    this.#sliderValue = this.elem.querySelector(".slider__value");
    this.#sliderProgress = this.elem.querySelector(".slider__progress");
    this.#sliderSteps = this.elem.querySelector(".slider__steps");

    this.#sliderThumb.ondragstart = () => false;
    this.elem.addEventListener("pointerdown", this.#mousePointerdown);
    this.elem.addEventListener("click", this.#onSliderClick);

    this.#setStep(this.elem);
    this.#moveToValue();
  }

  #template() {
    let spansHTML = "";
    for (let index = 0; index < this.#steps; index++)
      spansHTML += "<span></span>";

    return `
    <!--Корневой элемент слайдера-->
    <div class="slider">
  
      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: 50%;">
        <span class="slider__value">2</span>
      </div>
  
      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: 50%;"></div>
  
      <!--Шаги слайдера-->
      <div class="slider__steps">
        ${spansHTML}
      </div>
    </div>
      `;
  }

  #onSliderClick = (event) => {
    this.#setNearestValue(event.pageX);
    this.#setStep();
    this.#moveToValue();
    this.#sliderChangeEvent();
  };

  #mousePointerdown = (event) => {
    const moveThumb = (pageX) => {
      this.#sliderThumb.style.left = this.#calcThumbCoords(pageX).pc + "%";
      this.#sliderProgress.style.width = this.#calcThumbCoords(pageX).pc + "%";

    };

    const onPointermove = (event) => {
      moveThumb(event.pageX);
      this.#setNearestValue(event.pageX);
      this.#setStep();
     };

    this.elem.classList.add("slider_dragging");

    document.addEventListener("pointermove", onPointermove);
    document.onpointerup = () => {
      document.removeEventListener("pointermove", onPointermove);
      document.onpointerup = null;

      this.#setStep();
      this.#moveToValue();
      this.#sliderChangeEvent();

      this.elem.classList.remove("slider_dragging");
    };
  };

  #moveToValue(){
    const leftPercents = Math.round((this.#value / (this.#steps - 1)) * 100);
    this.#sliderProgress.style.width = `${leftPercents}%`;
    this.#sliderThumb.style.left = `${leftPercents}%`;
  }

  #calcThumbCoords(pageX) {
    const rect = this.#sliderSteps.getBoundingClientRect();
    let thumbXCoord = pageX - (rect.left + window.pageXOffset);
    thumbXCoord = Math.max(thumbXCoord, 0);
    thumbXCoord = Math.min(thumbXCoord, rect.width);

    return { px: thumbXCoord, pc: (thumbXCoord / rect.width) * 100 };
    
  }
  
  #setStep() {
    this.#sliderValue.innerHTML = this.#value;

    const stepsChildren = this.#sliderSteps.children;
    for (let index = 0; index < stepsChildren.length; index++) {
      stepsChildren[index].className =
        index === this.#value ? "slider__step-active" : "";
    }

  }

  #setNearestValue = (pageX) => {
    this.#value = Math.round(
      this.#calcThumbCoords(pageX).px /
        (this.#sliderSteps.getBoundingClientRect().width / (this.#steps - 1))
    );
  };

  #sliderChangeEvent(){
    if (this.#previousValue !== this.#value) {
      this.elem.dispatchEvent(
        new CustomEvent("slider-change", {
          detail: this.#value, // значение 0, 1, 2, 3, 4
          bubbles: true, // событие всплывает - это понадобится в дальнейшем
        })
      );
      this.#previousValue = this.#value;
    }
  }

}