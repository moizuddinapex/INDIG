// Size selection functionality
// sizing.js

function selectSize(button, size) {
    // Remove selected class from all size buttons in the same container
    const sizeOptions = button.parentElement.querySelectorAll('.size-btn');
    sizeOptions.forEach(btn => btn.classList.remove('selected'));
    
    // Add selected class to clicked button
    button.classList.add('selected');
    
    // Find the size display element in the same tooltip
    const tooltip = button.closest('.size-tooltip');
    const sizeDisplay = tooltip.querySelector('.size-display');
    if (sizeDisplay) {
        sizeDisplay.textContent = `Size: ${size}`;
    }
}

// Add to cart with size
function addToCartWithSize(name, price, image, productId) {
    event.stopPropagation();
    
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const productCard = event.target.closest('.product-card');
    let selectedSize = productCard.getAttribute('data-selected-size') || 'MED';
    const productWithSize = `${name} - Size ${selectedSize}`;
    
    const existing = cart.find(i => i.name === productWithSize);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ 
            name: productWithSize, 
            price: price, 
            image: image, 
            qty: 1,
            size: selectedSize 
        });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Call the existing openCart function
    if (typeof openCart === 'function') {
        openCart();
    }
}

// Set default size styling when page loads
document.addEventListener("DOMContentLoaded", function() {
    // Ensure MED is selected by default in each product
    document.querySelectorAll('.size-btn').forEach(btn => {
        if (btn.textContent === 'MED') {
            btn.classList.add('selected');
        }
    });
    
    // Prevent tooltip from closing when clicking inside
    document.querySelectorAll('.size-tooltip').forEach(tooltip => {
        tooltip.addEventListener('click', (e) => e.stopPropagation());
    });
});
