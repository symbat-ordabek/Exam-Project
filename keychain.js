const products = [
    { id: 16, name: "Blue Weird Keychains", price: 6.99, image: "images/keychains_1.jpeg"},
    { id: 17, name: "SatoSugu Keychain", price: 9.99, image: "images/keychains_2.jpeg"},
    { id: 18, name: "Apple n Strawberry Keychain", price: 19.99, image: "images/keychains_3.jpeg"},
    { id: 19, name: "Orange Keychain", price: 19.99, image: "images/keychains_4.jpeg"},
    { id: 20, name: "Yellow Fruits Keychain", price: 9.99, image: "images/keychains_5.jpeg"},
    { id: 21, name: "Fruits Keychain", price: 19.99, image: "images/keychains_6.jpeg"},
    { id: 22, name: "Cat n Dog Keychain", price: 12.99, image: "images/keychains_7.jpeg"},
    { id: 23, name: "Pink n Blue Keychain", price: 19.99, image: "images/keychains_8.jpeg"},
    { id: 24, name: "Black Keychain", price: 23.99, image: "images/keychains_9.jpeg"},
];



// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render Products
const productGrid = document.getElementById('productGrid');
if (productGrid) {
    products.forEach(product => {
        productGrid.innerHTML += `
            <div class="col-md-4">
                <div class="card">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">$${product.price.toFixed(2)}</p>
                        <button class=" addToCart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    });

    // Add to Cart Button Event Listener
    document.querySelectorAll('.addToCart').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === id);
            addToCart(product);
        });
    });
}

// Add to Cart Function
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

// Save Cart
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update Cart Count
function updateCartCount() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.nav-link[href="cart.html"]').textContent = `Cart (${cartCount})`;
}

// Render Cart in Cart Page
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

if (cartItems && cartTotal) {
    renderCart();
}

function renderCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartItems.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td><img src="${item.image}" alt="${item.name}" class="cart-img"></td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" class="form-control cart-quantity" data-index="${index}" value="${item.quantity}" min="1">
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button class="btn btn-danger removeBtn" data-index="${index}">Remove</button></td>
            </tr>
        `;
    });
    cartTotal.textContent = `$${total.toFixed(2)}`;

    // Update Quantity
    document.querySelectorAll('.cart-quantity').forEach(input => {
        input.addEventListener('change', (e) => {
            const index = parseInt(e.target.dataset.index);
            cart[index].quantity = parseInt(e.target.value);
            saveCart();
            renderCart();
        });
    });

    // Remove Item
    document.querySelectorAll('.removeBtn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            cart.splice(index, 1);
            saveCart();
            renderCart();
        });
    });
}

// Checkout Button
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
        } else {
            alert('Thank you for your purchase!');
            cart = [];
            saveCart();
            renderCart();
            updateCartCount();
        }
    });
}

// Initial Update
updateCartCount();

