// Function to display cart items
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountContainer = document.getElementById('total-amount');
    let totalAmount = 0;

    // Clear previous cart items
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            if (item.name && item.price >= 0) { // Only display valid items
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');

                // Create quantity controls
                const quantityControl = document.createElement('div');
                quantityControl.classList.add('quantity-control');

                const decreaseButton = document.createElement('button');
                decreaseButton.textContent = '-';
                decreaseButton.addEventListener('click', () => {
                    if (item.quantity > 1) {
                        item.quantity--;
                        localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
                        displayCartItems(); // Refresh cart display
                    }
                });

                const quantityDisplay = document.createElement('span');
                quantityDisplay.textContent = item.quantity || 1; // Default to 1 if undefined

                const increaseButton = document.createElement('button');
                increaseButton.textContent = '+';
                increaseButton.addEventListener('click', () => {
                    item.quantity = (item.quantity || 1) + 1; // Increase quantity
                    localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
                    displayCartItems(); // Refresh cart display
                });

                quantityControl.appendChild(decreaseButton);
                quantityControl.appendChild(quantityDisplay);
                quantityControl.appendChild(increaseButton);

                // Create delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Remove';
                deleteButton.addEventListener('click', () => {
                    cart.splice(index, 1); // Remove item from cart
                    localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
                    displayCartItems(); // Refresh cart display
                });

                itemElement.textContent = `${item.name} - $${item.price} `;
                itemElement.appendChild(quantityControl);
                itemElement.appendChild(deleteButton); // Add delete button
                cartItemsContainer.appendChild(itemElement);

                totalAmount += item.price * (item.quantity || 1); // Calculate total amount
            }
        });
    }

    totalAmountContainer.textContent = `Total: $${totalAmount}`;
}

// Event listener for checkout button
document.getElementById('checkout-button').addEventListener('click', () => {
    alert('Proceeding to checkout!');

});

// Display cart items on page load
displayCartItems();
