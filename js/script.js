// Function to update cart count in the header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.length; // Get the length of the cart array
    document.querySelector('.cart-count').textContent = cartCount; // Update the cart count in the header
}

// Function to add item to cart
function addToCart(name, price, image) {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Get current cart items
    const existingItemIndex = cart.findIndex(item => item.name === name); // Check if item already exists

    if (existingItemIndex > -1) {
        // If item exists, increase the quantity
        cart[existingItemIndex].quantity += 1; // Increase quantity
    } else {
        // If item does not exist, add it with quantity 1 and image
        cart.push({ name, price, quantity: 1, image });
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
    updateCartCount(); // Update cart count
}



// Event listener for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name'); // Get the product name
        const price = parseFloat(button.getAttribute('data-price')); // Get the product price
        addToCart(name, price); // Add the product to the cart
        alert(`${name} has been added to your cart!`); // Alert user
    });
});

// Update cart count on page load
updateCartCount();
