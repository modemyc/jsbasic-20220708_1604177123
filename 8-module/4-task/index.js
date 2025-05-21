import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  modal;

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    // this.modal = new Modal();

    this.addEventListeners();
  }

  addProduct(product) {
    if(!this._checkProduct(product)) {
      return;
    };

    let cartItem = this.cartItems.find(item => item.product.id === product.id);

    if (cartItem) {
      cartItem.count += 1;
    } else {
      const cartItem = {product, count: 1}
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);

    cartItem.count += amount || 1;

    if (cartItem.count <= 0) {
      this.cartItems = this.cartItems.filter(
        (item) => item.product.id !== productId
      );
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, val) => sum + val.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (sum, val) => sum + val.count * val.product.price,
      0
    );
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');

    let wrapper = document.createElement('div');

    this.cartItems.forEach(elem => {
      wrapper.append(this.renderProduct(elem.product, elem.count));
    });
    wrapper.append(this.renderOrderForm());
    this.modal.setBody(wrapper);

    this.modal.open();

    const productCard = document.querySelectorAll('.cart-product');

    productCard.forEach((elem) => {
      elem.addEventListener('click', (event) => {
        let cartItem = this.cartItems.find(item => item.product.id === elem.dataset.productId);
        let counter = elem.querySelector('.cart-counter__count');
        const totalPrice = document.querySelector('.cart-buttons__info-price');
        const productPrice = elem.querySelector('.cart-product__price');

        if (event.target.closest('.cart-counter__button_plus')) {
          this.updateProductCount(elem.dataset.productId, 1);
        }
        if(event.target.closest('.cart-counter__button_minus')){
          this.updateProductCount(elem.dataset.productId, -1);
        }

        counter.innerHTML = cartItem.count;
        productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`
        totalPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

        if(productPrice.innerText === '€0.00') {
          elem.remove();
        }
        if(this.cartItems.length === 0){
          this.modal.close();
        }

        this.onProductUpdate(cartItem);
      })
    })
    
    let submitForm = document.querySelector('form');
    submitForm.addEventListener('submit', this.onSubmit)
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
  }

  onSubmit(event){
    event.preventDefault();
    
    let formElem = document.querySelector('.cart-form');

    fetch ('https://httpbin.org/post', {
      method: 'post',
      body: new FormData(formElem)
    })
    .then((response) => {
      if (response.ok){
        // this.modal.close();
        console.log(this.modal);
      }
    })

  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }

  _checkProduct(product) {
    return Object.prototype.toString.apply(product) === '[object Object]'
    && "id" in product 
    && "image" in product
    && "name" in product
    && "price" in product
    && "category" in product
  };
}

