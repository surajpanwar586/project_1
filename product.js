// product.js
function initProductPage(products) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (product) {
        const productImage = document.querySelector('.product-image img');
        const productTitle = document.querySelector('.product-title');
        const productRating = document.querySelector('.product-details .product-rating');
        const productPrice = document.querySelector('.product-details .price');
        const productDescription = document.querySelector('.product-description');
        const addToCartButton = document.querySelector('.product-info button');

        document.title = product.name;
        productImage.src = product.image;
        productImage.alt = product.name;
        productTitle.textContent = product.name;
        productRating.innerHTML = `<span>${'★'.repeat(Math.round(product.rating))}${'☆'.repeat(5 - Math.round(product.rating))}</span> (${product.reviews})`;
        productPrice.textContent = `₹${product.price}`;
        productDescription.textContent = product.description;

        addToCartButton.addEventListener('click', () => {
            addToCart(product.id, products);
        });

    } else {
        const container = document.querySelector('#product-details-container');
        if(container) container.innerHTML = '<h1>Product not found!</h1>';
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
}