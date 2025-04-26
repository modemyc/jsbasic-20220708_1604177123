import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {

    this.products = products;
    this.filters = {};
    this._cards = [];

    this._elem = document.createElement('div');
    this._elem.classList.add('products-grid');

    this._render(this.products);
  }

  get elem() {
    return this._elem
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    let massive = [];
    massive.push(...this.products);

    for (let i = massive.length - 1; i >= 0; i--) {
      const item = massive[i];
      let shouldRemove = false;

      if (this.filters.noNuts && item.nuts === true) {
        shouldRemove = true;
      }
      if (this.filters.vegeterianOnly && !item.vegeterian) {
        shouldRemove = true;
      }
      if (item.spiciness > this.filters.maxSpiciness) {
        shouldRemove = true;
      }
      if (this.filters.category && item.category !== this.filters.category) {
        shouldRemove = true;
      } 
    
      if (shouldRemove) {
        massive.splice(i, 1);
      }
    }

    this._render(massive);
  }

  _render(data) {
    this._elem.innerHTML = '';
    
    let shell = document.createElement('div');
    shell.classList.add('products-grid__inner');
    this._elem.append(shell);

    data.forEach(element => {
      this._cards = new ProductCard(element).elem;
      shell.append(this._cards);
    });
  }
}
