document.addEventListener('DOMContentLoaded', async () => {
    const sausageList = document.getElementById('sausages-list');

    // Load sausages from backend
    const response = await fetch('http://localhost:3001/api/sausages');
    const sausages = await response.json();

    console.log(sausages);

    const form = document.getElementById('add-sausage-form');
    const toggleButton = document.getElementById('toggle-form-button');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const name = document.getElementById('name-input').value.trim();
        const count = parseInt(document.getElementById('count-input').value);
    
        if (!name || isNaN(count) || count <= 0) {
            alert('Zadej platný název a počet!');
            return;
        }
    
        const response = await fetch('http://localhost:3001/api/sausages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, count })
        });
    
        if (response.ok) {
            const newSausage = await response.json();
            location.reload(); // Nejjednodušší způsob jak znovu načíst seznam
        } else {
            alert('Nepodařilo se přidat klobásu.');
        }
    });


    toggleButton.addEventListener('click', () => {
        // Přepíná viditelnost formuláře
        if (form.style.display === 'none') {
            form.style.display = 'flex'; // nebo block, podle stylu
            toggleButton.textContent = '❌ Zrušit';
        } else {
            form.style.display = 'none';
            toggleButton.textContent = '➕ Přidat klobásu';
        }
    });

    // Display sausages
    sausages.forEach(sausage => {
        const sausageItem = document.createElement('div');
        sausageItem.classList.add('sausage-item');
        sausageItem.id = `sausage-${sausage.id}`;

        sausageItem.innerHTML = `
        <div class="sausage-item-container">
            <span class="sausage-name">${sausage.name}</span>
            <div class="sausage-controls">
                <button class="decrease">-</button>
                <span class="sausage-quantity">${sausage.count}</span>
                <button class="increase">+</button>
                <button class="delete">Odstranit</button> 
            </div>
        </div>
        `;

        // Hide the decrease button when sausage quantity = 0
        const decrease = sausageItem.querySelector(".decrease");
        if (sausage.count <= 0) {
            decrease.style.display = "none";
        }

        sausageList.appendChild(sausageItem);

        // Click on + or - or delete
        sausageItem.querySelector('.increase').addEventListener('click', () => updateQuantity(sausage.id, 1));
        sausageItem.querySelector('.decrease').addEventListener('click', () => updateQuantity(sausage.id, -1));
        sausageItem.querySelector('.delete').addEventListener('click', () => deleteSausage(sausage.id));
    });

    // Update sausage count function
    async function updateQuantity(id, change) {
        const response = await fetch(`http://localhost:3001/api/sausages/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ countChange: change }) 
        });

        const updatedSausage = await response.json();

        // Update sausage count on the page
        const sausageElement = document.querySelector(`#sausage-${updatedSausage.id}`);
        sausageElement.querySelector('.sausage-quantity').textContent = updatedSausage.quantity;
    }

    // Delete sausage function
    async function deleteSausage(id) {
        const response = await fetch(`http://localhost:3001/api/sausages/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
    }
});