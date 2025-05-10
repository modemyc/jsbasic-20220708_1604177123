export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
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

