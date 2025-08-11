// script.js
function initHomePage(products) {
    const productGrid = document.querySelector('.product-grid');
    const searchInput = document.querySelector('#search-input');
    
    function displayProducts(productsToDisplay) {
        productGrid.innerHTML = ''; 
        productsToDisplay.forEach(product => {
            const productCardHTML = `
                <a href="product.html?id=${product.id}" class="product-card-link">
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}">
                        <h2>${product.name}</h2>
                        <div class="product-rating">
                            <span>${'★'.repeat(Math.round(product.rating))}${'☆'.repeat(5 - Math.round(product.rating))}</span> (${product.reviews})
                        </div>
                        <p class="price">₹${product.price} <span class="mrp">M.R.P: ₹${product.mrp || ''}</span></p>
                        <button data-id="${product.id}">Add to Cart</button>
                    </div>
                </a>
            `;
            productGrid.innerHTML += productCardHTML;
        });
        addCartFunctionality(products);
    }

    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
            displayProducts(filteredProducts);
        });
    }

    function addCartFunctionality(products) {
        const addToCartButtons = document.querySelectorAll('.product-card button');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault(); 
                const productId = parseInt(event.target.dataset.id);
                addToCart(productId, products);
            });
        });
    }
    
    function addToCart(productId, products) {
        const cart = getCart();
        const productToAdd = products.find(p => p.id === productId);
        if (!productToAdd) return;
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) { existingItem.quantity++; } else { cart.push({ ...productToAdd, quantity: 1 }); }
        saveCart(cart);
        alert(`"${productToAdd.name}" has been added to your cart!`);
    }

    displayProducts(products);
}