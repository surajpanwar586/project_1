// cart.js

// This function will run when the page loads
async function loadApp() {
    try {
        // 1. Fetch the product data from the JSON file
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();

        // 2. Render shared header and footer
        const header = document.querySelector('.main-header');
        const footer = document.querySelector('footer');
        if (header) header.innerHTML = getHeaderHTML();
        if (footer) footer.innerHTML = getFooterHTML();
        
        // 3. Update the cart icon on all pages
        updateCartIcon();

        // 4. Run the correct script for the current page
        if (document.querySelector('.product-grid')) {
            initHomePage(products);
        }
        if (document.querySelector('#product-details-container')) {
            initProductPage(products);
        }
        if (document.getElementById('cart-items-container')) {
            displayCartItems(products);
        }

        // 5. Add hamburger menu functionality
        const hamburger = document.querySelector('.hamburger-menu');
        const secondaryNav = document.querySelector('.secondary-nav');
        if (hamburger && secondaryNav) {
            hamburger.addEventListener('click', () => {
                secondaryNav.classList.toggle('mobile-nav-active');
            });
        }
    } catch (error) {
        console.error("Could not load the application:", error);
    }
}

// --- Core Cart Functions ---
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || []; 
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
}

function updateCartIcon() {
    const cart = getCart();
    const cartCountElement = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// --- Cart Page Specific Functions ---
function displayCartItems(products) {
    const cartContainer = document.getElementById('cart-items-container');
    if (!cartContainer) return; // This makes sure the code only runs on the cart page

    const cart = getCart();
    const subtotalContainer = document.getElementById('cart-subtotal-container');
    
    cartContainer.innerHTML = ''; // Clear old content
    
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
                        <span>Quantity: ${item.quantity}</span>
                        <button class="remove-button" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            </div>`;
    });
    
    if (subtotalContainer) {
        subtotalContainer.innerHTML = `
            <div class="cart-subtotal">
                <p>Subtotal (${cart.reduce((sum, item) => sum + item.quantity, 0)} items): <strong>₹${subtotal.toFixed(2)}</strong></p>
                <button>Proceed to Buy</button>
            </div>`;
    }
    
    addRemoveFunctionality(products);
}

function addRemoveFunctionality(products) {
    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.id);
            let cart = getCart();
            cart = cart.filter(item => item.id !== productId);
            saveCart(cart);
            displayCartItems(products); // Re-render the cart after removing an item
        });
    });
}

// Start the entire application
document.addEventListener('DOMContentLoaded', loadApp);