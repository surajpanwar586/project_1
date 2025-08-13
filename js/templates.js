function getHeaderHTML() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let accountLinkHTML = '';
    
    if (currentUser) {
        accountLinkHTML = `
            <a href="#" class="nav-link"><span>Hello, ${currentUser.name}</span><strong>Account & Lists</strong></a>
            <a href="#" id="sign-out-link" class="nav-link"><span>Not ${currentUser.name}?</span><strong>Sign Out</strong></a>
        `;
    } else {
        accountLinkHTML = `<a href="login.html" class="nav-link"><span>Hello, sign in</span><strong>Account & Lists</strong></a>`;
    }

    return `
        <div class="header-logo"><a href="index.html">Amazone</a></div>
        <div class="hamburger-menu"><div class="bar"></div><div class="bar"></div><div class="bar"></div></div>
        <div class="header-search"><input type="text" id="search-input" placeholder="Search Amazone.in"><button class="search-button">Search</button></div>
        <nav class="header-nav">
            ${accountLinkHTML}
            <a href="#" class="nav-link"><span>Returns</span><strong>& Orders</strong></a>
            <a href="cart.html" class="nav-link cart-link"><span class="cart-count">0</span><strong>Cart</strong></a>
        </nav>
    `;
}

function getSecondaryNavHTML() {
    return `
        <ul>
            <li><a href="#" class="category-link" data-category="All">All</a></li>
            <li><a href="#" class="category-link" data-category="Mobiles">Mobiles</a></li>
            <li><a href="#" class="category-link" data-category="Electronics">Electronics</a></li>
            <li><a href="#" class="category-link" data-category="Home & Kitchen">Home & Kitchen</a></li>
            <li><a href="#" class="category-link" data-category="Fashion">Fashion</a></li>
        </ul>
    `;
}

function getFooterHTML() {
    return `
        <div class="footer-links">
            <div class="footer-column"><h3>Get to Know Us</h3><ul><li><a href="#">About Us</a></li><li><a href="#">Careers</a></li></ul></div>
            <div class="footer-column"><h3>Connect with Us</h3><ul><li><a href="#">Facebook</a></li><li><a href="#">Twitter</a></li></ul></div>
            <div class="footer-column"><h3>Make Money with Us</h3><ul><li><a href="#">Sell on Amazone</a></li><li><a href="#">Become an Affiliate</a></li></ul></div>
        </div>
        <div class="footer-bottom"><p>&copy; 2024, Amazone.com, Inc. or its affiliates</p></div>
    `;
}