// js/login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // --- Send Data to the Backend API ---
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // If login was successful (status 200)
                alert('Login successful!');
                
                // Save the returned user info to 'currentUser' in localStorage
                localStorage.setItem('currentUser', JSON.stringify(data.user));
                
                // Clear the guest cart after logging in
                localStorage.removeItem('cart_guest');

                // Redirect to the homepage
                window.location.href = 'index.html';
            } else {
                // If there was an error (e.g., invalid credentials, status 400)
                alert(data.message);
            }
        } catch (error) {
            console.error('Login fetch error:', error);
            alert('Could not connect to the server. Please try again later.');
        }
    });
});