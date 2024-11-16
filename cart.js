// Function to get cart from localStorage or return an empty array if no cart exists
function getCart() {
    let cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Function to save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to remove a product from the cart
function removeFromCart(index) {
    let cart = getCart();
    cart.splice(index, 1); // Remove item from the cart array
    saveCart(cart); // Save updated cart to localStorage
    displayCart(); // Refresh cart display
}

// Function to update the quantity of a product in the cart
function updateQuantity(index, newQuantity) {
    let cart = getCart();
    cart[index].quantity = newQuantity; // Update the quantity
    saveCart(cart); // Save updated cart to localStorage
    displayCart(); // Refresh cart display
}

// Function to calculate and display the total cart price
function calculateTotal() {
    let cart = getCart();
    let total = 0;
    cart.forEach(item => {
        total += item.price * getQuantityValue(item.quantity); // Calculate total based on quantity
    });
    return total;
}

// Helper function to get quantity value in numbers (e.g., '250g' to 0.25, '1kg' to 1)
function getQuantityValue(quantity) {
    switch (quantity) {
        case '250g':
            return 0.25;
        case '1/2kg':
            return 0.5;
        case '1kg':
            return 1;
        default:
            return 1;
    }
}

// Function to display cart items
function displayCart() {
    let cart = getCart();
    let cartItemsContainer = document.getElementById('cart-items');
    let emptyCartMessage = document.getElementById('empty-cart');
    let proceedButton = document.getElementById('proceed-btn');
    let totalPriceContainer = document.createElement('p');
    totalPriceContainer.id = 'total-price';

    // Clear existing cart items
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        // If cart is empty, show the empty message
        emptyCartMessage.classList.remove('hidden');
        proceedButton.classList.add('hidden'); // Hide proceed button
        totalPriceContainer.innerHTML = '';
    } else {
        emptyCartMessage.classList.add('hidden'); // Hide empty message
        proceedButton.classList.remove('hidden'); // Show proceed button

        // Iterate through the cart and display each item
        cart.forEach((item, index) => {
            let cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            let itemTotal = item.price * getQuantityValue(item.quantity); // Calculate total for the item

            cartItem.innerHTML = `
                <img src="${item.image || 'default.jpg'}" alt="${item.name}" class="cart-item-image">
                <div class="details">
                    <h3>${item.name}</h3>
                    <p>Price: ₹${item.price} per kg</p>
                    <p>
                        Quantity: 
                        <select class="quantity-select" data-index="${index}">
                            <option value="250g" ${item.quantity === '250g' ? 'selected' : ''}>250g</option>
                            <option value="1/2kg" ${item.quantity === '1/2kg' ? 'selected' : ''}>1/2kg</option>
                            <option value="1kg" ${item.quantity === '1kg' ? 'selected' : ''}>1kg</option>
                        </select>
                    </p>
                    <p>Total: ₹<span class="item-total">${itemTotal.toFixed(2)}</span></p>
                </div>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;

            cartItemsContainer.appendChild(cartItem);
        });

        // Display total price for all items
        let totalCartPrice = calculateTotal();
        totalPriceContainer.innerHTML = `Total Cart Price: ₹${totalCartPrice.toFixed(2)}`;
        cartItemsContainer.appendChild(totalPriceContainer); // Append the total price at the end of cart items
    }
}

// Handle "Proceed to Pay" button click
document.getElementById('proceed-btn').addEventListener('click', function() {
    alert('Proceeding to payment...');
    window.location.href = "payment.html"; // Replace with your payment page URL
});

// Handle quantity change
document.getElementById('cart-items').addEventListener('change', function(event) {
    if (event.target.classList.contains('quantity-select')) {
        let index = event.target.getAttribute('data-index');
        let newQuantity = event.target.value;
        updateQuantity(index, newQuantity);
    }
});

// Handle remove button click
document.getElementById('cart-items').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-btn')) {
        let index = event.target.getAttribute('data-index');
        removeFromCart(index);
    }
});

// Call displayCart on page load
document.addEventListener('DOMContentLoaded', displayCart);
