// Variables
const cart = document.getElementById('cart');
const products = document.getElementById('list-products');
const products_list = document.querySelector('#cart-list tbody');
const empty_cart_button = document.getElementById('vaciar-carrito');


// Listeners
load_event_listeners();
function load_event_listeners() {

  products.addEventListener('click', buy_product);

  cart.addEventListener('click', remove_product);

  empty_cart_button.addEventListener('click', empty_cart);

  document.addEventListener('DOMContentLoaded', read_local_storage);
}


function buy_product(e) {
  e.preventDefault();
  if(e.target.classList.contains('add-cart')) {
    const product = e.target.parentElement.parentElement;
    read_product_data(product);
  }
}

function read_product_data(product) {
  const infoCurso = {
    imagen: product.querySelector('img').src,
    title: product.querySelector('h4').textContent,
    price: product.querySelector('.discount').textContent,
    id: product.querySelector('a').getAttribute('data-id')
  }
  insert_cart(infoCurso);
}

function insert_cart(product) {
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>
  <img src="${product.imagen}" width=100>
  </td>
  <td>${product.title}</td>
  <td>${product.price}</td>
  <td>
  <a href="#" class="delete_product" data-id="${product.id}">X</a>
  </td>
  `;
  products_list.appendChild(row);
  save_product_LocalStorage(product);
}

function remove_product(e) {
  e.preventDefault();
  let product,
      product_Id;
  if(e.target.classList.contains('delete_product') ) {
    e.target.parentElement.parentElement.remove();
    product = e.target.parentElement.parentElement;
    product_Id = product.querySelector('a').getAttribute('data-id');
  }
  remove_product_LocalStorage(product_Id);
}


function empty_cart() {
  while(products_list.firstChild) {
    products_list.removeChild(products_list.firstChild);
  }
  remove_LocalStorage();
  return false;
}

function save_product_LocalStorage(product) {
  let products;
  products = get_product_LocalStorage();
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products) );
}

function get_product_LocalStorage() {
  let products_LS;
  if(localStorage.getItem('products') === null) {
    products_LS = [];
  } else {
    products_LS = JSON.parse( localStorage.getItem('products') );
  }
  return products_LS;
}

function read_local_storage() {
  let products_LS;
  products_LS = get_product_LocalStorage();
  products_LS.forEach(function(product){
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>
  <img src="${product.imagen}" width=100>
  </td>
  <td>${product.title}</td>
  <td>${product.price}</td>
  <td>
  <a href="#" class="delete_product" data-id="${product.id}">X</a>
  </td>
  `;
  products_list.appendChild(row);
  });
}

function remove_product_LocalStorage(product) {
  let products_LS;
  products_LS = get_product_LocalStorage();
  products_LS.forEach(function(product_LS, index) {
    if(product_LS.id === product) {
      products_LS.splice(index, 1);
    }
  });
  localStorage.setItem('products', JSON.stringify(products_LS) );
}

function remove_LocalStorage() {
  localStorage.clear();
}
