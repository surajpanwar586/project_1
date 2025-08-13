// js/script.js
function initHomePage(products) {
    const productGrid = document.querySelector('.product-grid');
    const searchInput = document.querySelector('#search-input');
    const sortSelect = document.getElementById('sort-select');
    let currentProducts = [...products];

    function displayProducts(productsToDisplay) {
        productGrid.innerHTML = '';
        productsToDisplay.forEach(product => {
            productGrid.innerHTML += `
                <a href="product.html?id=${product.id}" class="product-card-link">
                    <div class="product-card">
                        <img src="${product.images[0]}" alt="${product.name}">
                        <h2>${product.name}</h2>
                        <div class="product-rating">
                            <span>${'★'.repeat(Math.round(product.rating))}${'☆'.repeat(5 - Math.round(product.rating))}</span> (${product.reviews})
                        </div>
                        <p class="price">₹${product.price.toFixed(2)}</p>
                        <button data-id="${product.id}">Add to Cart</button>
                    </div>
                </a>`;
        });
        addCartFunctionality(products);
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
            currentProducts = [...filteredProducts];
            displayProducts(currentProducts);
        });
    }

    function addCartFunctionality(allProducts) {
        const addToCartButtons = document.querySelectorAll('.product-card button');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const productId = parseInt(event.target.dataset.id);
                addToCart(productId, allProducts);
            });
        });
    }
    
    function addCategoryFiltering(allProducts) {
        const categoryLinks = document.querySelectorAll('.category-link');
        categoryLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const category = event.target.dataset.category;

                if (category === 'All') {
                    currentProducts = [...allProducts];
                } else {
                    currentProducts = allProducts.filter(product => product.category === category);
                }
                sortSelect.value = 'featured'; 
                displayProducts(currentProducts);
            });
        });
    }
    
    function addSortingFunctionality() {
        sortSelect.addEventListener('change', (event) => {
            const sortBy = event.target.value;
            if (sortBy === 'price-asc') {
                currentProducts.sort((a, b) => a.price - b.price);
            } else if (sortBy === 'price-desc') {
                currentProducts.sort((a, b) => b.price - a.price);
            } else if (sortBy === 'rating-desc') {
                currentProducts.sort((a, b) => b.rating - a.rating);
            }
            displayProducts(currentProducts);
        });
    }

    displayProducts(products);
    addCategoryFiltering(products);
    addSortingFunctionality();
}