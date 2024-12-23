// Listen for clicks on the dropdown links
document.querySelectorAll('.dropdown-content a').forEach(function(link) {
    link.addEventListener('click', function(e) {
        // Prevent default behavior (going to all.html)
        e.preventDefault();
        
        // Get the category from the clicked link
        var category = this.getAttribute('data-category');
        
        // Call the filterSelection function to filter the content based on category
        filterSelection(category);
        
        // Update the URL to reflect the selected category, without reloading the page
        history.pushState({ category: category }, '', 'all.html?category=' + category);
    });
});

// Call this function to display content based on the selected category
function filterSelection(category) {
    var x = document.getElementsByClassName("column");
    
    // If 'all' is selected, show everything
    if (category === 'all') {
        category = "";
    }
    
    // Loop through all elements to show or hide based on category
    for (var i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(category) > -1 || category === "") {
            w3AddClass(x[i], "show");
        }
    }
    
    // Update the category heading dynamically
    var categoryHeading = {
        '': 'All',
        'puzzles-and-games': 'Puzzles and Games',
        'decorations': 'Decorations',
        'gift_sets': 'Gifts Sets'
    };
    
    document.querySelector('h2').textContent = categoryHeading[category] || 'All';

    // Update the active button
    var buttons = document.querySelectorAll('.btn');
    buttons.forEach(function(btn) {
        btn.classList.remove('active'); // Remove 'active' class from all buttons
    });
    
    // Add 'active' class to the clicked button
    if (category === '' || category === 'all') {
        // Ensure the 'All' button gets active when no category is selected
        document.querySelector('.btn.all').classList.add('active');
    } else {
        // Add active class to the specific category button
        var activeButton = document.querySelector('.btn.' + category);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }
}

// Add class to show elements
function w3AddClass(element, name) {
    var arr1 = element.className.split(" ");
    var arr2 = name.split(" ");
    for (var i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; }
    }
}

// Remove class to hide elements
function w3RemoveClass(element, name) {
    var arr1 = element.className.split(" ");
    var arr2 = name.split(" ");
    for (var i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

// When the page loads, check if there's a category query parameter and filter accordingly
window.addEventListener('load', function() {
    var urlParams = new URLSearchParams(window.location.search);
    var category = urlParams.get('category');
    
    // If a category is provided in the URL, filter the content
    if (category) {
        filterSelection(category);
    } else {
        filterSelection('all'); // Default to 'all' if no category is in the URL
    }
});

