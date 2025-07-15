class Produk {
    constructor(id, image, name, price, description) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.price = price;
        this.description = description;
    }
}

class CartItem {
    constructor(produk, quantity) {
        this.produk = produk;
        this.quantity = quantity;
    }

    getTotal() {
        return this.produk.price * this.quantity;
    }

    getTotalAll(){

    }
}

const products = [
    new Produk(1, "https://i.pinimg.com/736x/86/c1/71/86c171b7f1f3871ae8c8dd460393592d.jpg", "Kaos", 100000, "incidunt molestiae, pariatur voluptates laboriosam, suscipit dolorereiciendis ullam aut!"),
    new Produk(2, "https://i.pinimg.com/736x/86/c1/71/86c171b7f1f3871ae8c8dd460393592d.jpg", "Celana", 100000, "incidunt molestiae, pariatur voluptates laboriosam, suscipit dolorereiciendis ullam aut!"),
    new Produk(3, "https://i.pinimg.com/736x/86/c1/71/86c171b7f1f3871ae8c8dd460393592d.jpg", "Jaket", 100000, "incidunt molestiae, pariatur voluptates laboriosam, suscipit dolorereiciendis ullam aut!"),
    new Produk(4, "https://i.pinimg.com/736x/86/c1/71/86c171b7f1f3871ae8c8dd460393592d.jpg", "Jaket", 100000, "incidunt molestiae, pariatur voluptates laboriosam, suscipit dolorereiciendis ullam aut!"),
    new Produk(5, "https://i.pinimg.com/736x/86/c1/71/86c171b7f1f3871ae8c8dd460393592d.jpg", "Jaket", 100000, "incidunt molestiae, pariatur voluptates laboriosam, suscipit dolorereiciendis ullam aut!"),
    new Produk(6, "https://i.pinimg.com/736x/86/c1/71/86c171b7f1f3871ae8c8dd460393592d.jpg", "Jaket", 100000, "incidunt molestiae, pariatur voluptates laboriosam, suscipit dolorereiciendis ullam aut!"),
];

let cart = [];

const produkList = document.getElementById('produk-items');
const totalCart = document.getElementById('cart-count');
const cartItems = document.getElementById('modal-cart-content');
const modalViewDetail = document.getElementById('modal-view-detail');
const modalCartCount = document.getElementById('modal-cart-count');
const cartIcon = document.getElementById('cart-icon');

document.addEventListener('DOMContentLoaded', ()=>{
    updateDisplay();
})

function displayProduk() {
    products.forEach(product => {
        const button = document.createElement('button');
        button.textContent = 'Add To Cart';
        const div = document.createElement('div');
        div.classList.add('list-produk');
        div.innerHTML = `<img src="${product.image}" alt="${product.name}" id="image-produk">
        <div><b>Nama Produk  :</b> <span id="nama-produk">${product.name}</span> </div>
        <div><b>Harga Produk :</b> <span id="harga-produk">${product.price}</span> </div>`;
        div.onclick = () => viewDetail(product);
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(product);
        })
        div.appendChild(button);
        produkList.appendChild(div);
    });
   
}

function updateDisplay() {
    modalCartCount.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('modal-cart-content');
    div.textContent = cart.length < 1 ? 'Cart is empty' : `Total items in cart: ${cart.length}`;
    totalPrice = 0;
    cart.forEach(cartItem => {
        const itemTotalPrice = cartItem.getTotal();
        totalPrice += itemTotalPrice;
        const modalCart = document.createElement('div');
        modalCart.classList.add('modal-cart')
        modalCart.innerHTML = `
      <section>
      <img src="${cartItem.produk.image}" alt="${cartItem.produk.name}">
      <span id="produk">${cartItem.produk.name}</span>
      <span>x</span>
      <span id="jumlah">${cartItem.quantity}</span>
      <span id="harga">: Rp. ${cartItem.getTotal()}</span>
      </section>
      <button class="delete-btn" onclick="deleteItem(${cartItem.produk.id})">Delete</button>
      `;
        div.appendChild(modalCart);

    })
    const span = document.createElement('span');
    span.classList.add('total-price');
    span.textContent = cart.length < 1 ? '': `Total Harga: Rp. ${totalPrice}` ;
    div.appendChild(span);
    
    modalCartCount.appendChild(div);
    document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function deleteItem(id) {
    cart = cart.filter(item => item.produk.id !== id);
    updateDisplay();
}

function addToCart(product) {
    let found = cart.find(item => item.produk.id === product.id);
    if (found) {
        found.quantity++;
    } else {
        found = new CartItem(product, 1);
        cart.push(found);
    }

    updateDisplay();
}

function viewDetail(product) {
    modalViewDetail.style.display = 'flex';
    modalViewDetail.innerHTML = '';
    const modalViewContent = document.createElement('div');
    modalViewContent.classList.add('modal-view-content');
    modalViewContent.innerHTML = `<img src="${product.image}" alt="${product.name}" id="image-produk">
      <div><b>Nama Produk  :</b> <span id="nama-view">${product.name}</span> </div>
      <div><b>Harga Produk :</b> <span id="harga-view">$${product.price}</span> </div>
      <p ><b>Description:</b> <br><span id="detail-produk">${product.description}</span></p>`;
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add To Cart';
    addBtn.addEventListener('click', () => addToCart(product));
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.addEventListener('click', () => closeView());
    modalViewContent.appendChild(addBtn);
    modalViewContent.appendChild(closeBtn);
    modalViewDetail.appendChild(modalViewContent);
}

function closeView() {
    modalViewDetail.style.display = 'none';
}

displayProduk();
console.log(displayProduk);

cartIcon.addEventListener('click', () => {
    document.getElementById('modal-cart-count').style.display = 'flex';
     updateDisplay();
})

window.onclick = function(event) {
    const cartModal = document.getElementById('modal-view-detail');
    const modalCartCount = document.getElementById('modal-cart-count');

    if(event.target == cartModal){
        cartModal.style.display = "none"
    }
    if(event.target == modalCartCount){
        modalCartCount.style.display = "none"
    }
}