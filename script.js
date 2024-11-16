// Function to add items to the cart
function addToCart(event) {
  const button = event.target; // Get the clicked button
  const productName = button.getAttribute('data-name'); // Retrieve product name from button's data attribute
  const productPrice = button.getAttribute('data-price'); // Retrieve product price
  const quantityElement = button.parentElement.querySelector('.quantity select'); // Get quantity element, if present
  const quantity = quantityElement ? quantityElement.value : 1; // Default to 1 if no quantity is set

  // Retrieve the cart from localStorage or create a new array if it doesn't exist
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the product is already in the cart
  const existingProductIndex = cart.findIndex(item => item.name === productName);

  if (existingProductIndex !== -1) {
      // Product already exists in the cart, so update the quantity
      cart[existingProductIndex].quantity = parseInt(cart[existingProductIndex].quantity) + parseInt(quantity);
  } else {
      // Add new product to cart
      const product = {
          name: productName,
          price: parseInt(productPrice),
          quantity: parseInt(quantity) // Store quantity as a number
      };
      cart.push(product); // Add product to the cart array
  }

  // Store updated cart in localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Show a success message or alert
  alert(`${productName} added to cart with quantity ${quantity}.`);
}

// Attach event listeners to all "Add To Cart" buttons on page load
document.addEventListener('DOMContentLoaded', function () {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn'); // Class selector for "Add To Cart" buttons
  addToCartButtons.forEach(button => {
      button.addEventListener('click', addToCart); // Attach click event listener to each button
  });
});

