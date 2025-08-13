// checkout.js
document.addEventListener('DOMContentLoaded', () => {
    const summaryItems = document.getElementById('summary-items');
    const summaryTotal = document.getElementById('summary-total');
    const payButton = document.getElementById('pay-button');
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    
    // Function to display the order summary
    function displayOrderSummary() {
        const cart = getCart(); // This function comes from cart.js
        summaryItems.innerHTML = '';
        
        if (cart.length === 0) {
            summaryItems.innerHTML = '<p>Your cart is empty.</p>';
            payButton.disabled = true;
            return;
        }

        let subtotal = 0;
        cart.forEach(item => {
            summaryItems.innerHTML += `<p>${item.name} (x${item.quantity})</p>`;
            subtotal += item.price * item.quantity;
        });

        summaryTotal.innerHTML = `<h3>Total: ₹${subtotal.toFixed(2)}</h3>`;
    }

    // Function to handle payment option visibility
    function handlePaymentSelection() {
        const selectedValue = document.querySelector('input[name="payment"]:checked').value;
        
        document.getElementById('card-details').style.display = 'none';
        document.getElementById('upi-details').style.display = 'none';
        
        if (selectedValue === 'card') {
            document.getElementById('card-details').style.display = 'block';
        } else if (selectedValue === 'upi') {
            document.getElementById('upi-details').style.display = 'block';
        }
    }

    // Add event listeners to radio buttons
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', handlePaymentSelection);
    });

    // Add event listener to the pay button
    payButton.addEventListener('click', () => {
        const cart = getCart();
        if (cart.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        // Simulate payment success
        alert('Payment successful! Thank you for your order.');
        
        // Clear the cart
        localStorage.removeItem('cart');
        
        // Redirect to a confirmation page (we will create this next)
        window.location.href = 'confirmation.html';
    });

    // Initial setup when the page loads
    displayOrderSummary();
    handlePaymentSelection();
});