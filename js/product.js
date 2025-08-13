// js/product.js

function initProductPage(products) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (product) {
        // --- Select all elements ---
        const mainImage = document.getElementById('main-product-image');
        const thumbnailList = document.getElementById('thumbnail-list');
        const productTitle = document.querySelector('.product-title');
        const productRating = document.querySelector('.product-details .product-rating');
        const productPrice = document.querySelector('.product-details .price');
        const productDescription = document.querySelector('.product-description');
        const addToCartButton = document.querySelector('.product-info .form-button');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        let currentImageIndex = 0;

        // --- Populate basic product info ---
        document.title = product.name;
        productTitle.textContent = product.name;
        productRating.innerHTML = `<span>${'★'.repeat(Math.round(product.rating))}${'☆'.repeat(5 - Math.round(product.rating))}</span> (${product.reviews})`;
        productPrice.textContent = `₹${product.price.toFixed(2)}`;
        productDescription.textContent = product.description;

        // --- Carousel Logic ---
        function updateCarousel() {
            // Update main image
            mainImage.src = product.images[currentImageIndex];

            // Update active state on thumbnails
            const thumbnails = document.querySelectorAll('.thumbnail-img');
            thumbnails.forEach((img, index) => {
                if (index === currentImageIndex) {
                    img.classList.add('active');
                } else {
                    img.classList.remove('active');
                }
            });
        }
        
        // Build thumbnails
        if (product.images && product.images.length > 0) {
            thumbnailList.innerHTML = ''; // Clear any placeholders
            product.images.forEach((imgSrc, index) => {
                const thumb = document.createElement('img');
                thumb.src = imgSrc;
                thumb.alt = `${product.name} thumbnail ${index + 1}`;
                thumb.classList.add('thumbnail-img');
                thumb.dataset.index = index;
                thumbnailList.appendChild(thumb);
            });
            updateCarousel(); // Set the first image and thumbnail as active
        }

        // Add event listeners
        thumbnailList.addEventListener('click', (e) => {
            if (e.target.classList.contains('thumbnail-img')) {
                currentImageIndex = parseInt(e.target.dataset.index);
                updateCarousel();
            }
        });

        prevBtn.addEventListener('click', () => {
            currentImageIndex--;
            if (currentImageIndex < 0) {
                currentImageIndex = product.images.length - 1; // Loop back to the end
            }
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            currentImageIndex++;
            if (currentImageIndex >= product.images.length) {
                currentImageIndex = 0; // Loop back to the start
            }
            updateCarousel();
        });

        // Add to cart functionality
        addToCartButton.addEventListener('click', () => {
            addToCart(product.id, products);
        });

    } else {
        const container = document.querySelector('#product-details-container');
        if(container) container.innerHTML = '<h1>Product not found!</h1>';
    }
}