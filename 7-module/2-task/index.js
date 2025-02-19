import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this._modal = createElement(this.template);

    this._modalTitle = this._modal.querySelector('.modal__title');
    this._modalBody = this._modal.querySelector('.modal__body');
    this._modalCloseBTN = this._modal.querySelector('.modal__close');

    this._initModalEvents();
  }

  template() {
    return `
    <div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>

        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>

    </div>
    `
  };

  _initModalEvents() {
    this._modalCloseBTN.addEventListener('click', this.close);
    document.addEventListener('keyup', (event) => this._closeKeyESC(event));
  };

  open() {
    const body = document.querySelector('body');
    body.append(this._modal);
    body.classList.add('is-modal-open');
  }

  setTitle(node) {
    this._modalTitle.innerHTML = node;
  }

  setBody(node) {
    this._modalBody.innerHTML = '';
    this._modalBody.append(node);
  }

  //добавить закрытие модального окна при клике по крестику и при нажатии ESC
  close() {
    const modal = document.querySelector('.modal');
    const body = document.querySelector('body');

    const onCloseItem = () => {
      body.classList.remove('is-modal-open');
    };

    onCloseItem();
    modal.remove();
  }

  _closeKeyESC(event) {
    const body = document.querySelector('body');
    
    if(event.code == 'Escape' && body.classList.contains('is-modal-open')) {
      this.close();
    }
  }
}
