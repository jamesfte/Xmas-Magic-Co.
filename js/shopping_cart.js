// Function to get a cookie
function getCookie(name) {
    const cookie = document.cookie.split('; ').find(row => row.startsWith(name + "="));
    if (cookie) {
        return cookie.split('=')[1];
    }
    return null;
}

// Function to set the cart cookie with the updated cart data
function setCartCookie(cart) {
    const cartString = JSON.stringify(cart);
    const encodedCart = encodeURIComponent(cartString); // URL-encode the cart data
    document.cookie = `cart=${encodedCart}; path=/; max-age=3600`; // cookie expires in 1 hour
}

// Function to display cart items in shopping_cart.html
function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    
    // Retrieve the cart data from cookies
    let cartData = getCookie('cart');
    
    if (cartData) {
        // URL decode the cart data first
        cartData = decodeURIComponent(cartData);
    }

    // Parse the decoded cart data into JSON
    let cart = [];
    try {
        cart = JSON.parse(cartData || '[]'); // Get the cart from cookies (or an empty array if no cart)
    } catch (error) {
        console.error("Error parsing cart data from cookies:", error);
    }

    console.log(cart); // Debugging: Log the cart items to the console

    // If cart is empty, display a message
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        // Clear any previous cart content
        cartContainer.innerHTML = '';

        // Iterate through each item in the cart and display it
        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            
            // Create HTML for each cart item
            cartItemDiv.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Price: RM${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Total: RM${item.totalPrice.toFixed(2)}</p>
                </div>
                <div class="cart-item-remove">
                    <button class="remove-btn" data-name="${item.name}">Remove</button>
                </div>
            `;
            
            // Append each cart item to the container
            cartContainer.appendChild(cartItemDiv);
        });
    }

    // Add event listener for remove buttons
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-name');
            removeItemFromCart(itemName);
        });
    });
}

// Function to remove an item from the cart
function removeItemFromCart(itemName) {
    // Retrieve the cart data from cookies
    let cartData = getCookie('cart');
    
    if (cartData) {
        cartData = decodeURIComponent(cartData); // Decode the cart data
    }

    // Parse the cart data
    let cart = [];
    try {
        cart = JSON.parse(cartData || '[]'); // Get the cart from cookies (or an empty array if no cart)
    } catch (error) {
        console.error("Error parsing cart data from cookies:", error);
    }

    // Filter out the item with the matching name
    const updatedCart = cart.filter(item => item.name !== itemName);

    // Update the cart cookie with the new array
    setCartCookie(updatedCart);

    // Re-render the cart
    displayCart();
}

// Call the function to display cart items
displayCart();

