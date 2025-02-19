import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this._elem = createElement(this.template());

    this._initRibbonMenuEvents();
  }

  get elem() {
    return this._elem
  }

  template() {
    return `
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <nav class="ribbon__inner">
      ${this.categories.map((element) => 
        `<a href="#" class="ribbon__item" data-id="${element.id}">${element.name}</a>`)
        .join('')}
      </nav>

    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `
  }

  //инициация ивентов
  _initRibbonMenuEvents () {
    const ribbon = this._elem;
    const ribbonInner = ribbon.querySelector('.ribbon__inner');

    ribbon.addEventListener('click', this._ribbonScrolling);
    ribbonInner.addEventListener('scroll', this._ribbonScrollersHide);
    ribbonInner.addEventListener('click', this._ribbonChooseElem);
  }

  //скролл меню
  _ribbonScrolling(event) {
    const ribbonInner = document.querySelector('.ribbon__inner');

    let scrollStep = 0;

    if (event.target.closest('.ribbon__arrow_left')){
      scrollStep--
    };
    if (event.target.closest('.ribbon__arrow_right')){
      scrollStep++
    };
    
    let scrollDirection = (scrollStep * 350);

    ribbonInner.scrollBy(scrollDirection, 0);
  }

  //сокрытие стрелок меню
  _ribbonScrollersHide() {
    const ribbonInner = document.querySelector('.ribbon__inner');
    const buttonLeft = document.querySelector('.ribbon__arrow_left');
    const buttonRight = document.querySelector('.ribbon__arrow_right')

    //отслеживание позиции меню для скрытия левой кнопки
    if (ribbonInner.scrollLeft >= 0) {
      buttonLeft.classList.add('ribbon__arrow_visible');
    } 
    if (ribbonInner.scrollLeft == 0) {
      buttonLeft.classList.remove('ribbon__arrow_visible')
    }

    //вычисление ширины элементы для переменной scrollRight
    let scrollWidth = ribbonInner.scrollWidth;
    let scrollLeft = ribbonInner.scrollLeft;
    let clientWidth = ribbonInner.clientWidth;

    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    //отслеживание позиции меню для скрытия правой кнопки
    if (scrollRight <= 1) {
      buttonRight.classList.remove('ribbon__arrow_visible');
    } else {
      buttonRight.classList.add('ribbon__arrow_visible');
    }
  }

  //выбор элементов меню
  _ribbonChooseElem(event) {
    event.preventDefault();
    
    const ribbonItem = event.target.closest('.ribbon__item');
    const onRibbonItem = (ribbonItemElement) => {
      ribbonItemElement.classList.add('ribbon__item_active')
    };

    if (ribbonItem) {
      onRibbonItem(ribbonItem);
    }
    
    if (this.prewEl !== undefined) {
      this.prewEl.classList.remove('ribbon__item_active');
    };
    this.prewEl = event.target;

    event.target.dispatchEvent(
      new CustomEvent('ribbon-select', { // имя события должно быть именно 'ribbon-select'
        detail: event.target.dataset.id, // уникальный идентификатора категории из её объекта
        bubbles: true // это событие всплывает - это понадобится в дальнейшем
      })
    );
  }
  
}
