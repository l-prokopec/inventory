document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const button = document.getElementById('submitPasswordButton');
    const input = document.getElementById('passwordInput');
    const responseMessage = document.getElementById('responseMessage');

    // Avoid submit form - default
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Get password from input
        const password = input.value;

        try {

            // Send password to backend
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            });

            // Process response from backend
            const data = await response.json();
            
            // Login success
            if (data.success) {
                window.location.href = 'inventory.html';
            }

            // Login error
            else {
                responseMessage.textContent = data.message || 'Neplatné heslo';
                responseMessage.style.color = 'red';
            }
        }

        catch (error) {
            console.error('Chyba při přihlašování:', error);
            responseMessage.textContent = 'Došlo k chybě. Zkus to znovu.';
            responseMessage.style.color = 'red';
        }
    });
});


