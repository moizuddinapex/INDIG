// Size selection functionality
function selectSize(btn, size) {
    event.stopPropagation();
    const tooltip = btn.closest('.size-tooltip');
    const sizeBtns = tooltip.querySelectorAll('.size-btn');
    sizeBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    const sizeDisplay = tooltip.querySelector('.size-display');
    sizeDisplay.textContent = `Size: ${size}`;
    const productCard = btn.closest('.product-card');
    productCard.setAttribute('data-selected-size', size);
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

// Initialize size buttons when page loads
document.addEventListener("DOMContentLoaded", function() {
    // Set MED as default selected
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
