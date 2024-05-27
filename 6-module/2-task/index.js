export default class ProductCard {
  constructor(product) {

    this._product = product;
    this._elem = document.createElement("div"); 

    this._fillElem();
    this._setElemListeners();

  }

  _fillElem() {
    this._elem.insertAdjacentHTML(
      "beforeend",
      `<div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${
            this._product.image
          }" class="card__image" alt="product">
          <span class="card__price">€${parseInt(this._product.price).toFixed(2)}</span>
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

  _setElemListeners() {
    this._elem
      .querySelector(".card__button")
      .addEventListener("click", (event) => {
        event.target.dispatchEvent(
          new CustomEvent("product-add", {
            detail: this._product.id,
            bubbles: true,
          })
        )
      })
  }

  get elem() {
    return this._elem;
  }

}