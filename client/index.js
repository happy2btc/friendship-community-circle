import { supabase } from './lib/supabase';

document.addEventListener('DOMContentLoaded', () => {
    const signInButton = document.getElementById('sign-in-btn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const signUpLink = document.getElementById('sign-up-link');

    if (signInButton) {
        signInButton.addEventListener('click', async () => {
            const email = emailInput.value;
            const password = passwordInput.value;

            if (!email || !password) {
                alert('Please enter both email and password.');
                return;
            }

            signInButton.disabled = true;
            signInButton.textContent = 'Signing In...';

            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
                });

                if (error) {
                    throw error;
                }

                // On successful sign-in, redirect to the home page
                window.location.href = '/home.html';

            } catch (error) {
                alert(`Error: ${error.message}`);
            } finally {
                signInButton.disabled = false;
                signInButton.textContent = 'Sign In';
            }
        });
    }

    if (signUpLink) {
        signUpLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Redirect to a sign-up page if it exists, otherwise show an alert
            window.location.href = '/join-form.html';
        });
    }
});
