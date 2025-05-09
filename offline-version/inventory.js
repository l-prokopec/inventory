document.addEventListener('DOMContentLoaded', async () => {
    const sausageList = document.getElementById('sausages-list');

    // Load sausages from backend
    const sausagesJSON = localStorage.getItem('sausages');
    const sausages = sausagesJSON ? JSON.parse(sausagesJSON) : [];

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
    
        // Load sausages
        const sausages = JSON.parse(localStorage.getItem('sausages')) || [];

        const newSausage = {
            id: Date.now(), // jednoduché ID
            name,
            count
        };

        sausages.push(newSausage);
        localStorage.setItem('sausages', JSON.stringify(sausages));

        location.reload();
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
    function updateQuantity(id, change) {
        let sausages = JSON.parse(localStorage.getItem('sausages')) || [];

        sausages = sausages.map(s => {
            if (s.id === id) {
                s.count += change;
                if (s.count < 0) s.count = 0;
            }
            return s;
        });

        localStorage.setItem('sausages', JSON.stringify(sausages));
        location.reload();
    }

    // Delete sausage function
    function deleteSausage(id) {
        let sausages = JSON.parse(localStorage.getItem('sausages')) || [];

        sausages = sausages.filter(s => s.id !== id);

        localStorage.setItem('sausages', JSON.stringify(sausages));
        location.reload();
    }
});