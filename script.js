const products = [
    { id: 1, name: "Her and her cat necklace", price: 9.99, image: "images/anime_inspo_1.jpeg"},
    { id: 2, name: "My Neighbor Totoro", price: 19.99, image: "images/anime_inspo_2.jpeg"},
    { id: 3, name: "Laufey", price: 14.99, image: "images/anime_inspo_3.jpeg"},
    { id: 4, name: "Howls moving Castle necklace", price: 21.99, image: "images/anime_inspo_4.jpeg"},
    { id: 5, name: "Howls moving Castle Earrings", price: 3.99, image: "images/anime_inspo_5.jpeg"},
    { id: 6, name: "Howls moving Castle Necklace", price: 29.99, image: "images/anime_inspo_6.jpeg"},
    { id: 7, name: "Spirited Away keychain", price: 17.99, image: "images/anime_inspo_7.jpeg"},
    { id: 8, name: "Diamond Ring", price: 599.99, image: "images/anime_inspo_8.jpeg"},
    { id: 9, name: "Sapphire Necklace", price: 449.99, image: "images/anime_inspo_9.jpeg"},
    { id: 10, name: "Silver Earrings", price: 129.99, image: "images/ghibli_1.jpeg"},
    { id: 11, name: "Gold Pendant", price: 199.99, image: "images/ghibli_2.jpeg"},
    { id: 12, name: "Crystal Brooch", price: 29.99, image: "images/ghibli_3.jpeg"},
    { id: 13, name: "Bulletproof", price: 19.99, image: "images/ghibli_4.jpeg"},
    { id: 14, name: "Sunset Necklaces", price: 9.99, image: "images/ghibli_5.jpeg"},
    { id: 15, name: "Greenfield", price: 49.99, image: "images/ghibli_6.jpeg"},
    { id: 16, name: "Blue Weird Keychains", price: 6.99, image: "images/keychains_1.jpeg"},
    { id: 17, name: "SatoSugu Keychain", price: 9.99, image: "images/keychains_2.jpeg"},
    { id: 18, name: "Apple n Strawberry Keychain", price: 19.99, image: "images/keychains_3.jpeg"},
    { id: 19, name: "Orange Keychain", price: 19.99, image: "images/keychains_4.jpeg"},
    { id: 20, name: "Yellow Fruits Keychain", price: 9.99, image: "images/keychains_5.jpeg"},
    { id: 21, name: "Fruits Keychain", price: 19.99, image: "images/keychains_6.jpeg"},
    { id: 22, name: "Cat n Dog Keychain", price: 12.99, image: "images/keychains_7.jpeg"},
    { id: 23, name: "Pink n Blue Keychain", price: 19.99, image: "images/keychains_8.jpeg"},
    { id: 24, name: "Black Keychain", price: 23.99, image: "images/keychains_9.jpeg"},
    { id: 25, name: "Red Golden Necklace", price: 39.99, image: "images/necklace_2.jpeg"},
    { id: 26, name: "Pink Diamond Necklace", price: 29.99, image: "images/necklace_3.jpeg"},
    { id: 27, name: "Bear Necklace", price: 19.99, image: "images/necklace_4.jpeg"},
    { id: 28, name: "Strawberry Necklace", price: 19.99, image: "images/necklace_5.jpeg"},
    { id: 29, name: "Bunny Necklace", price: 29.99, image: "images/necklace_6.jpeg"},
    { id: 30, name: "Sanrio Necklace", price: 9.99, image: "images/necklace_7.jpeg"},
    { id: 31, name: "Hello Kitty Necklace", price: 9.99, image: "images/necklace_8.jpeg"},
    { id: 32, name: "Pink Gem Necklace", price: 29.99, image: "images/necklace_9.jpeg"},
    { id: 33, name: "Blue Gem Necklace", price: 19.99, image: "images/necklace_1.jpeg"}
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
                <img  src="${product.image}" alt="${product.name}">
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


