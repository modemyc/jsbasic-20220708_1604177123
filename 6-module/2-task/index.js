export default class ProductCard {
  constructor(product) {

    this._product = product;
    this._elem = document.createElement("div");

    this.fillElem();
    this.eventInit();
  }

  fillElem() {
    this._elem.insertAdjacentHTML("beforeend", 
      `<div class="card">
        <div class="card__top">
            <img src="/assets/images/products/${this._product.image}" class="card__image" alt="product">
            <span class="card__price">€${parseFloat(this._product.price).toFixed(2)}</span>
        </div>
        <div class="card__body">
            <div class="card__title">${this._product.name}</div>
            <button type="button" class="card__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
        </div>
      </div>`
    )
  }

  eventInit() {
    this._elem.querySelector('.card__button').addEventListener("click", (event) => {
      event.target.dispatchEvent(
        new CustomEvent("product-add", { // имя события должно быть именно "product-add"
          detail: this._product.id, // Уникальный идентификатора товара из объекта товара
          bubbles: true // это событие всплывает - это понадобится в дальнейшем
        }
      ))
    }) 
  }

  get elem() {
    return this._elem;
  }

}
