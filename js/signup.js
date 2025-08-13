// js/signup.js
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;

        // --- Front-end Validation ---
        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }
        if (password !== passwordConfirm) {
            alert('Passwords do not match. Please try again.');
            return;
        }
        
        // --- Send Data to the Backend API ---
        try {
            const response = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // If signup was successful (status 201)
                alert('Account created successfully! You will now be redirected to the login page.');
                window.location.href = 'login.html';
            } else {
                // If there was an error (e.g., user already exists, status 400)
                alert(data.message);
            }
        } catch (error) {
            console.error('Signup fetch error:', error);
            alert('Could not connect to the server. Please try again later.');
        }
    });
});