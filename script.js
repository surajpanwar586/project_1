document.addEventListener('DOMContentLoaded', () => {

    // --- Product Data ---
    // This is our "database". We can add as many products as we want here.
    const products = [
        {
            image: 'https://m.media-amazon.com/images/I/51cKQW7WMeL._AC_UL320_.jpg',
            name: 'Xmart India Multipurpose 6-in-1 Masala Box for Kitchen',
            rating: 5,
            reviews: 159,
            price: '170.10',
            mrp: '299'
        },
        {
            image: 'https://m.media-amazon.com/images/I/71DTJ0ifKGL._AC_UL320_.jpg',
            name: 'Allextreme 425 GSM Microfiber Cloth Reusable',
            rating: 5,
            reviews: 149,
            price: '329',
            mrp: '399'
        },
        {
            image: 'https://m.media-amazon.com/images/I/516wVCNVMhL._AC_UL320_.jpg',
            name: 'OPTIFINE Modern Hexagonal Faux Marble End Table',
            rating: 5,
            reviews: 147,
            price: '299',
            mrp: '999'
        },
        {
            image: 'https://m.media-amazon.com/images/I/61L2lXI35pL._AC_UL320_.jpg',
            name: 'Xmart India Bite Buddy Lunch Box with 4 Compartments',
            rating: 5,
            reviews: 140,
            price: '199',
            mrp: '399'
        },
        {
            image: 'https://m.media-amazon.com/images/I/81OdwcKIvdL._AC_UL320_.jpg',
            name: 'TEKCOOL Wardrobe Organizer For Storage Box',
            rating: 5,
            reviews: 136,
            price: '379',
            mrp: '1,999'
        },
         {
            image: 'https://m.media-amazon.com/images/I/61oiJdVVJ9L._AC_UL320_.jpg',
            name: 'TEKCOOL Automatic Water Dispenser Pump for 20 Litre Bottle',
            rating: 5,
            reviews: 132,
            price: '329',
            mrp: '999'
        },
         {
            image: 'https://m.media-amazon.com/images/I/61L8nYmwekL._AC_UL320_.jpg',
            name: 'TEKCOOL Premium Soft Silicone Back Scrubber Shower Brush',
            rating: 5,
            reviews: 127,
            price: '279',
            mrp: '799'
        },
         {
            image: 'https://m.media-amazon.com/images/I/718gfULrmlL._AC_UL320_.jpg',
            name: 'PROXISM Non-Scratch Dish Wash Cloth (Pack of 6)',
            rating: 5,
            reviews: 124,
            price: '139',
            mrp: '699'
        }
    ];

    const productGrid = document.querySelector('.product-grid');
    const searchInput = document.querySelector('#search-input');
    
    // --- Function to Display Products ---
    function displayProducts(productsToDisplay) {
        productGrid.innerHTML = ''; // Clear existing products
        
        productsToDisplay.forEach(product => {
            // Create the HTML for one product card
            const productCardHTML = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <div class="product-rating">
                        <span>${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</span> (${product.reviews})
                    </div>
                    <p class="price">₹${product.price} <span class="mrp">M.R.P: ₹${product.mrp}</span></p>
                    <button>Add to Cart</button>
                </div>
            `;
            productGrid.innerHTML += productCardHTML;
        });

        // Re-add event listeners to the new buttons
        addCartFunctionality();
    }

    // --- Search Functionality ---
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product => {
            return product.name.toLowerCase().includes(searchTerm);
        });
        displayProducts(filteredProducts);
    });

    // --- Add to Cart Functionality ---
    function addCartFunctionality() {
        const addToCartButtons = document.querySelectorAll('.product-card button');
        const cartCountElement = document.querySelector('.cart-count');
        let cartItemCount = parseInt(cartCountElement.innerText);

        addToCartButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productCard = event.target.closest('.product-card');
                const productTitle = productCard.querySelector('h2').innerText;
                alert(`"${productTitle}" has been added to your cart!`);

                cartItemCount++;
                cartCountElement.innerText = cartItemCount;
            });
        });
    }
    
    // --- Hamburger Menu Functionality ---
    const hamburger = document.querySelector('.hamburger-menu');
    const secondaryNav = document.querySelector('.secondary-nav');

    hamburger.addEventListener('click', () => {
        secondaryNav.classList.toggle('mobile-nav-active');
    });

    // --- Initial Display of Products ---
    displayProducts(products);
});