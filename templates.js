// templates.js
function getHeaderHTML() {
    return `
        <div class="header-logo"><a href="index.html">Amazone</a></div>
        <div class="hamburger-menu"><div class="bar"></div><div class="bar"></div><div class="bar"></div></div>
        <div class="header-search"><input type="text" id="search-input" placeholder="Search Amazone.in"><button class="search-button">Search</button></div>
        <nav class="header-nav">
            <a href="#" class="nav-link"><span>Hello, sign in</span><strong>Account & Lists</strong></a>
            <a href="#" class="nav-link"><span>Returns</span><strong>& Orders</strong></a>
            <a href="cart.html" class="nav-link cart-link"><span class="cart-count">0</span><strong>Cart</strong></a>
        </nav>
    `;
}

function getFooterHTML() {
    return `
        <div class="footer-links">
            <div class="footer-column"><h3>Get to Know Us</h3><ul><li><a href="#">About Us</a></li><li><a href="#">Careers</a></li><li><a href="#">Press Releases</a></li></ul></div>
            <div class="footer-column"><h3>Connect with Us</h3><ul><li><a href="#">Facebook</a></li><li><a href="#">Twitter</a></li><li><a href="#">Instagram</a></li></ul></div>
            <div class="footer-column"><h3>Make Money with Us</h3><ul><li><a href="#">Sell on Amazone</a></li><li><a href="#">Become an Affiliate</a></li><li><a href="#">Advertise Your Products</a></li></ul></div>
        </div>
        <div class="footer-bottom"><p>&copy; 2024, Amazone.com, Inc. or its affiliates</p></div>
    `;
}