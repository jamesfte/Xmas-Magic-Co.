// Product data object with images
const products = {
    1: {
        name: "Monopoly Super Electronic Banking",
        description: [
            "Monopoly Super Electronic Banking is a modern version of the classic game, using an electronic banking unit and debit cards to manage finances, speeding up gameplay and adding digital transactions for property trades.",
            "Include an electronic banking unit, 4 debit cards, a few game cards, a board and two dice."
        ],
        price: "RM160.00",
        images: [
            "images/Monopoly/1.jpg",
            "images/Monopoly/2.jpg",
            "images/Monopoly/3.jpg"
        ]
    },

    2: {
        name: "Pop Up Cartoon Pirate Barrel Toy",
        description: [
            "The Pop Up Cartoon Pirate Barrel Toy is a fun, interactive game where players take turns pushing swords into a barrel. Surprise pirate pops up when the wrong sword is chosen, adding excitement.",
            "Include a barrel, a pirate, a few swords"
        ],
        price: "RM15",
        images: [
            "images/Pirate_Barrel_Toy/1.jpg",
            "images/Pirate_Barrel_Toy/2.jpg",
            "images/Pirate_Barrel_Toy/3.jpg"
        ]
    },

    3: {
        name: "Toilet Toys Biting Billy Board Game with Bitende Honda, Metal Chapel",
        description: [
            "Toilet Toys Biting Billy Board Game features a hilarious, interactive gameplay where players avoid triggering Billy’s bite.",
            "Includes Bitende Honda and Metal Chapel"
        ],
        price: "RM15",
        images: [
            "images/Secure_Dog_Teeth_Toy/1.webp",
            "images/Secure_Dog_Teeth_Toy/2.webp",
            "images/Secure_Dog_Teeth_Toy/3.webp"
        ]
    },

    4: {
        name: "Christmas Tree Building Blocks",
        description: [
            "A few brick to making a shape of santa claus or christmas tree"
        ],
        price: "RM3",
        images: [
            "images/Building_Blocks/1.png",
            "images/Building_Blocks/2.png",
            "images/Building_Blocks/3.png",
            "images/Building_Blocks/4.png"
        ]
    },

    5: {
        name: "Crystal Ball",
        description: [
            "Beautiful crystal balls with colourful LEDs  that are used to decorate the house to add more Christmas vibe to your house.",
            "Use type C cable to charging"
        ],
        price: "RM29.99",
        images: [
            "images/crystal ball/1.webp",
            "images/crystal ball/2.webp",
            "images/crystal ball/3.webp"
        ]
    },

    6: {
        name: "6.56ft Christmas Rattan",
        description: [
            "Perfect for adding a rustic, seasonal touch to your home or holiday display.",
            "total length: 6.56ft"
        ],
        price: "RM8",
        images: [
            "images/Rattan/1.webp",
            "images/Rattan/2.webp",
            "images/Rattan/3.webp"
        ]
    },

    7: {
        name: "50-Pack Classic Style Christmas Ball Ornaments",
        description: [
            "It is suitable for decorate your Christman tree or house",
            "Include 50 balls per pack"
        ],
        price: "RM30",
        images: [
            "images/Christmas_Ball_Ornaments/1.webp",
            "images/Christmas_Ball_Ornaments/2.webp",
            "images/Christmas_Ball_Ornaments/3.webp"
        ]
    },

    8: {
        name: "Treetopia 6ft Virginia Fir Christmas Tree with Twinkly LED Lights",
        description: [
            "The iconic decoration for Christmas",
            "Include LED lights",
            "Height of tree: 6ft"
        ],
        price: "RM88.88",
        images: [
            "images/Christmas_Tree/1.webp",
            "images/Christmas_Tree/2.webp",
            "images/Christmas_Tree/3.webp"
        ]
    },

    9: {
        name: "Giulietta Premium Christmas Hamper 2024",
        description: [
            "Include two box of chocolates",
            "Include two bottle of wines",
            "Include six box of danish cookies",
            "Include tea and coffee"
        ],
        price: "RM338.88",
        images: [
            "images/Giulietta_Premium/1.webp",
            "images/Giulietta_Premium/2.webp",
            "images/Giulietta_Premium/3.webp",
            "images/Giulietta_Premium/4.webp"
        ]
    },

    10: {
        name: "Margareta Classic Christmas Hamper 2024",
        description: [
            "Include two bottle of concentrated juice",
            "Include four can of danish cookies",
            "Include a box of egg roll",
            "Include a wine",
            "Include a box of tea",
            "Include a can of coffee"
        ],
        price: "RM288.88",
        images: [
            "images/Margareta_Classic/1.webp",
            "images/Margareta_Classic/2.webp",
            "images/Margareta_Classic/3.webp",
            "images/Margareta_Classic/4.webp"
        ]
    },

    11: {
        name: "Helga Christmas Hamper 2024",
        description: [
            "Include three can and a box of danish cookies",
            "Include a bottle of wine",
            "Include a box of tea"
        ],
        price: "RM228.88",
        images: [
            "images/Helga/1.webp",
            "images/Helga/2.webp",
            "images/Helga/3.webp",
            "images/Helga/4.webp"
        ]
    },

    12: {
        name: "A Gift Inside Holiday Classic Chocolate, Candy & Crunch Gift Basket",
        description: [
            "Include a pack of popcorn",
            "Include four chocolate",
            "Include sweets",
            "Include gummy sweets",
            "Include pretzels",
            "Include chocolate cookies"
        ],
        price: "RM58.88",
        images: [
            "images/Holiday_Classic/1.jpg",
            "images/Holiday_Classic/2.jpg",
            "images/Holiday_Classic/3.jpg"
        ]
    },
    // Add more products here as needed
};

// Get the product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id'); // Use 'id' from URL query string

// Log the product ID to ensure it's being fetched
console.log("Product ID from URL:", productId);

// If productId is null or invalid, handle that gracefully
if (!productId) {
    console.error("No product ID found in the URL");
}

// Initialize the product details and media index
let currentProduct = products[productId];
let currentMediaIndex = 0;

// Throttle function for preventing rapid clicks
let throttleTimeout;
const throttle = (callback, delay) => {
    if (throttleTimeout) return;
    throttleTimeout = setTimeout(() => {
        callback();
        throttleTimeout = null;
    }, delay);
};

// Lazy load function for images and videos
const lazyLoad = (element, type) => {
    const mediaPath = element.dataset.src;

    if (type === 'image') {
        const imgElement = document.createElement('img');
        imgElement.src = mediaPath;
        imgElement.alt = "Product Image";
        imgElement.style.width = '100%'; // Ensure image fits the container
        element.innerHTML = '';
        element.appendChild(imgElement);
    } else if (type === 'video') {
        const videoElement = document.createElement('video');
        videoElement.src = mediaPath;
        videoElement.controls = true;
        videoElement.autoplay = true;
        videoElement.muted = true; // Optionally mute the video by default to ensure autoplay works
        videoElement.style.width = '100%';
        element.innerHTML = '';
        element.appendChild(videoElement);
    }
};

// Function to display product details and media (image or video)
function displayProductDetails() {
    if (currentProduct) {
        // Set product details (name, price)
        document.getElementById('product-name').textContent = currentProduct.name;
        document.getElementById('product-price').textContent = currentProduct.price;

        // Get the media container (image)
        const mediaContainer = document.getElementById('media-container');
        const mediaPath = currentProduct.images[currentMediaIndex];

        // Clear previous media content
        mediaContainer.innerHTML = '';

        const imageElement = document.createElement('div');
        imageElement.dataset.src = mediaPath;
        imageElement.classList.add('lazy');
        mediaContainer.appendChild(imageElement);

        // Lazy load the image when it's visible in the viewport
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    lazyLoad(entry.target, 'image');
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '200px 0px', threshold: 0.1 });

        observer.observe(imageElement);

        // Display the product descriptions as an unordered list
        const descriptionContainer = document.getElementById('product-description');
        descriptionContainer.innerHTML = ''; // Clear previous description content
        
        const ul = document.createElement('ul'); // Create unordered list
        currentProduct.description.forEach((desc) => {
            const li = document.createElement('li'); // Create a list item for each description
            li.textContent = desc; // Set the text of the list item
            ul.appendChild(li); // Append the list item to the unordered list
        });

        // Append the unordered list to the description container
        descriptionContainer.appendChild(ul);

        // Add event listeners for the quantity buttons
        document.getElementById('decrease-quantity').addEventListener('click', () => {
            const quantityInput = document.getElementById('quantity-input');
            let currentQuantity = parseInt(quantityInput.value);

            if (currentQuantity > 0) { // Prevent going below 0
                quantityInput.value = currentQuantity - 1;
            }
        });

        document.getElementById('increase-quantity').addEventListener('click', () => {
            const quantityInput = document.getElementById('quantity-input');
            let currentQuantity = parseInt(quantityInput.value);

            if (currentQuantity < 100) { // Prevent going above 100
                quantityInput.value = currentQuantity + 1;
            }
        });

        document.getElementById('quantity-input').addEventListener('input', (event) => {
            let currentQuantity = parseInt(event.target.value);
        
            if (isNaN(currentQuantity) || currentQuantity < 0) {
                event.target.value = 0; // Set a minimum value of 0
            } else if (currentQuantity > 100) {
                event.target.value = 100; // Set a maximum value of 100
            }
        });
    } else {
        // If no product is found, display a message
        document.getElementById('product-name').textContent = "Product not found";
        document.getElementById('product-description').textContent = "We couldn't find the product you're looking for.";
        document.getElementById('product-price').textContent = "";
        const mediaContainer = document.getElementById('media-container');
        mediaContainer.innerHTML = "<img src='images/placeholder.jpg' alt='Product Not Found'>";
    }
}

// Call the function to display the product details and media (image)
displayProductDetails();


// Initialize an empty cart array in global scope (in the script)
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve cart from localStorage or initialize it as an empty array

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

    // Retrieve existing cart from localStorage or initialize as empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the item to the global cart array
    cart.push(cartItem);

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Log the cart to check if it's updated correctly
    console.log("Cart data after adding item:", cart);

    // Show a notification
    document.getElementById('cart-notification').style.display = 'block';
    setTimeout(() => {
        document.getElementById('cart-notification').style.display = 'none';
    }, 2000); // Hide after 2 seconds
});

// Get the next and previous buttons
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Function to display the product media based on the current media index
function updateMedia() {
    const mediaContainer = document.getElementById('media-container');
    const mediaPath = currentProduct.images[currentMediaIndex];
    
    mediaContainer.innerHTML = ''; // Clear previous content

    // For images, load only when visible
    const imageElement = document.createElement('div');
    imageElement.dataset.src = mediaPath;
    imageElement.classList.add('lazy');
    mediaContainer.appendChild(imageElement);

    // Load the image when it's visible in the viewport
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lazyLoad(entry.target, 'image');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '200px 0px', threshold: 0.1 });

    observer.observe(imageElement);
}


// Add event listener for the "Previous" button
prevBtn.addEventListener('click', () => {
    if (currentMediaIndex > 0) {
        currentMediaIndex--;
    } else {
        currentMediaIndex = currentProduct.images.length - 1; // Go to the last image
    }
    updateMedia();
});

// Add event listener for the "Next" button
nextBtn.addEventListener('click', () => {
    if (currentMediaIndex < currentProduct.images.length - 1) {
        currentMediaIndex++;
    } else {
        currentMediaIndex = 0; // Go back to the first image
    }
    updateMedia();
});
