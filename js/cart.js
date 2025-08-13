// js/cart.js

// This function is now globally available for other scripts to use
function addToCart(productId, allProducts) {
    const cart = getCart();
    const productToAdd = allProducts.find(p => p.id === productId);
    if (!productToAdd) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        // --- THIS IS THE FIX ---
        // Create a new object for the cart, using the first image from the images array
        const cartProduct = {
            id: productToAdd.id,
            name: productToAdd.name,
            price: productToAdd.price,
            image: productToAdd.images[0], // Use the first image for the cart
            quantity: 1
        };
        cart.push(cartProduct);
    }
    saveCart(cart);
    alert(`"${productToAdd.name}" has been added to your cart!`);
}


async function loadApp() {
    try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
        const products = await response.json();

        // Render all shared components
        const header = document.querySelector('.main-header');
        const secondaryNav = document.querySelector('.secondary-nav');
        const footer = document.querySelector('footer');
        
        if (header) header.innerHTML = getHeaderHTML();
        if (secondaryNav) secondaryNav.innerHTML = getSecondaryNavHTML();
        if (footer) footer.innerHTML = getFooterHTML();
        
        updateCartIcon();

        // Run page-specific logic
        if (document.querySelector('.product-grid')) { initHomePage(products); }
        if (document.querySelector('#product-details-container')) { initProductPage(products); }
        if (document.getElementById('cart-items-container')) { displayCartItems(products); }

        // Hamburger menu and sign-out logic
        const hamburger = document.querySelector('.hamburger-menu');
        if (hamburger && secondaryNav) {
            hamburger.addEventListener('click', () => {
                secondaryNav.classList.toggle('mobile-nav-active');
            });
        }
        const signOutLink = document.getElementById('sign-out-link');
        if (signOutLink) {
            signOutLink.addEventListener('click', (event) => {
                event.preventDefault();
                signOut();
            });
        }
    } catch (error) {
        console.error("Could not load the application:", error);
    }
}

// Helper function to get the correct cart key
function getCartKey() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? `cart_${currentUser.email}` : 'cart_guest';
}

function getCart() {
    const cartKey = getCartKey();
    return JSON.parse(localStorage.getItem(cartKey)) || []; 
}

function saveCart(cart) {
    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(cart));
    updateCartIcon();
}

function signOut() {
    localStorage.removeItem('currentUser');
    updateCartIcon(); 
    window.location.href = 'index.html';
}

function updateCartIcon() {
    const cart = getCart();
    const cartCountElement = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountElement) { cartCountElement.textContent = totalItems; }
}

function displayCartItems(products) {
    const cartContainer = document.getElementById('cart-items-container');
    if (!cartContainer) return;
    const cart = getCart();
    const subtotalContainer = document.getElementById('cart-subtotal-container');
    cartContainer.innerHTML = '';
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        if (subtotalContainer) subtotalContainer.innerHTML = '';
        return;
    }
    let subtotal = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-image"><img src="${item.image}" alt="${item.name}"></div>
                <div class="cart-item-details">
                    <h2>${item.name}</h2>
                    <p class="price">₹${item.price.toFixed(2)}</p>
                    <div class="cart-item-actions">
                        <div class="quantity-controls">
                            <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
                        </div>
                        <button class="remove-button" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            </div>`;
    });
    if (subtotalContainer) {
        subtotalContainer.innerHTML = `
            <div class="cart-subtotal">
                <p>Subtotal (${cart.reduce((sum, item) => sum + item.quantity, 0)} items): <strong>₹${subtotal.toFixed(2)}</strong></p>
                <a href="checkout.html"><button class="form-button">Proceed to Buy</button></a>
            </div>`;
    }
    addCartPageFunctionality(products);
}

function addCartPageFunctionality(products) {
    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.id);
            let cart = getCart();
            cart = cart.filter(item => item.id !== productId);
            saveCart(cart);
            displayCartItems(products);
        });
    });
    document.querySelectorAll('.decrease-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.id);
            changeQuantity(productId, -1, products);
        });
    });
    document.querySelectorAll('.increase-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.id);
            changeQuantity(productId, 1, products);
        });
    });
}

function changeQuantity(productId, change, products) {
    let cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(cartItem => cartItem.id !== productId);
        }
    }
    saveCart(cart);
    displayCartItems(products);
}

document.addEventListener('DOMContentLoaded', loadApp);