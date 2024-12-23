// Function to set a cookie
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Function to get a cookie
function getCookie(name) {
    const cookie = document.cookie.split('; ').find(row => row.startsWith(name + "="));
    if (cookie) {
        return decodeURIComponent(cookie.split('=')[1]);
    }
    return null;
}

// Add to cart event listener in product.html
document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    const productName = document.getElementById('product-name').textContent;
    const productImage = document.querySelector('#media-container img')?.src;  // Get the first image as the product image
    const productPrice = parseFloat(document.getElementById('product-price').textContent.replace(/[^0-9.-]+/g, ""));
    const quantityInput = document.getElementById('quantity-input');
    const quantity = parseInt(quantityInput.value);

    if (quantity <= 0) {
        alert("Please select a valid quantity (greater than 0) before adding to the cart.");
        return; // Prevent adding to the cart if quantity is 0 or less
    }

    // Calculate total price
    const totalPrice = productPrice * quantity;

    // Create a product object for the cart
    const cartItem = {
        name: productName,
        image: productImage,
        price: productPrice,
        quantity: quantity,
        totalPrice: totalPrice
    };

    // Retrieve existing cart from cookies or initialize as empty array
    let cart = JSON.parse(getCookie('cart') || '[]');

    // Check if the item already exists in the cart (by name)
    var existingItemIndex = cart.findIndex(item => item.name === cartItem.name);

    if (existingItemIndex !== -1) {
        // If the item exists, update the quantity and total price
        var existingItem = cart[existingItemIndex];
        existingItem.quantity += cartItem.quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
    } else {
        // If the item doesn't exist, add it to the cart
        cart.push(cartItem);
    }

    // Save the updated cart to cookies (set cookie with expiration of 7 days)
    setCookie('cart', JSON.stringify(cart), 7);

    // Show a notification
    document.getElementById('cart-notification').style.display = 'block';
    setTimeout(() => {
        document.getElementById('cart-notification').style.display = 'none';
    }, 2000); // Hide after 2 seconds

    // Optionally log the cart for debugging
    console.log(cart);
});
