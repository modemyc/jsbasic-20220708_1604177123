import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    // ... ваш код
    const carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]').append(carousel.elem);

    const ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').append(ribbonMenu.elem);

    const stepSlider = new StepSlider({steps: 5, value: 3});
    document.querySelector('[data-slider-holder]').append(stepSlider.elem)

    const productsData = await fetch("products.json");
    let products = [];
    if (productsData.ok){
      products = await productsData.json()
    } 
    const productsGrid = new ProductsGrid(products);
    document.querySelector('[data-products-grid-holder]').append(productsGrid.elem);

    const cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').append(cartIcon.elem);
    const cart = new Cart(cartIcon);

    productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: stepSlider.value,
      category: ribbonMenu.value
    })

    stepSlider.elem.addEventListener('slider-change', (event) => {
      productsGrid.updateFilter({maxSpiciness: event.detail});
    });

    ribbonMenu.elem.addEventListener('ribbon-select', (event) => {
      productsGrid.updateFilter({category: event.detail})
    });

    document.body.addEventListener('product-add', (event) => {
      cart.addProduct(
        products.find((value) => value.id === event.detail)
      )
    });

    let nutsCheckbox = document.querySelector('#nuts-checkbox');
    let vegeterianCheckbox = document.querySelector('#vegeterian-checkbox');

    nutsCheckbox.addEventListener('change', (event) => {
      productsGrid.updateFilter({noNuts: event.target.checked})
    });

    vegeterianCheckbox.addEventListener('change', (event) => {
      productsGrid.updateFilter({vegeterianOnly: event.target.checked})
    });



  }
}
