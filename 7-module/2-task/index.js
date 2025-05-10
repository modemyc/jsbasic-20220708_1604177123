import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this._modal = createElement(this.template());
    this._modalTitle = this._modal.querySelector('.modal__title');
    this._modalBody = this._modal.querySelector('.modal__body');
    this._modalCloseBTN = this._modal.querySelector('.modal__close');
    
    this._handleCloseClick = this.close.bind(this);
    this._handleKeyDown = this._closeKeyESC.bind(this);
  }

  template() {
    return `
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
      </div>
    </div>`;
  }

  setTitle(title) {
    this._modalTitle.textContent = title;
  }

  setBody(node) {
    this._modalBody.innerHTML = '';
    this._modalBody.append(node);
  }

  open() {
    if (this._isOpen) return;
    
    document.body.append(this._modal);
    document.body.classList.add('is-modal-open');
    
    this._modalCloseBTN.addEventListener('click', this._handleCloseClick);
    document.addEventListener('keydown', this._handleKeyDown);
    this._isOpen = true;
  }

  close() {
    if (!this._isOpen) return;
    
    document.body.classList.remove('is-modal-open');
    this._modal.remove();
    
    this._modalCloseBTN.removeEventListener('click', this._handleCloseClick);
    document.removeEventListener('keydown', this._handleKeyDown);
    this._isOpen = false;
  }

  _closeKeyESC(event) {
    if (event.code === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }

}
