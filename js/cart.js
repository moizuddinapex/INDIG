
// Cart array to store items
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to open cart
window.openCart = function() {
    document.getElementById('cartOverlay').classList.add('active');
    document.getElementById('cartSidebar').classList.add('active');
    updateCartDisplay();
};

// Function to close cart
function closeCart() {
    document.getElementById('cartOverlay').classList.remove('active');
    document.getElementById('cartSidebar').classList.remove('active');
}

// Function to select size
window.selectSize = function(button, size) {
    // Remove selected class from all size buttons in the same tooltip
    let sizeOptions = button.closest('.size-options');
    if (sizeOptions) {
        let buttons = sizeOptions.querySelectorAll('.size-btn');
        buttons.forEach(btn => btn.classList.remove('selected'));
    }
    
    // Add selected class to clicked button
    button.classList.add('selected');
    
    // Update the size display
    let sizeDisplay = button.closest('.size-tooltip').querySelector('.size-display');
    if (sizeDisplay) {
        sizeDisplay.textContent = 'Size: ' + size;
    }
};

// Function to add to cart with size
window.addToCartWithSize = function(event, name, price, image, productId) {
    // Prevent event issues
    if (event) {
        event.stopPropagation();
    }
    
    // Find the selected size
    let sizeDisplay = event.currentTarget.closest('.size-tooltip').querySelector('.size-display');
    let selectedSize = 'MED'; // Default size
    
    if (sizeDisplay) {
        selectedSize = sizeDisplay.textContent.replace('Size: ', '');
    }
    
    // Create cart item
    let cartItem = {
        id: productId + '-' + selectedSize + '-' + Date.now(), // Unique ID
        name: name,
        price: price,
        size: selectedSize,
        image: image,
        quantity: 1
    };
    
    // Add to cart array
    cart.push(cartItem);
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show feedback
    alert(name + ' (Size: ' + selectedSize + ') added to cart!');
    
    // Open cart to show the item
    openCart();
};

// Function to update cart count display
function updateCartCount() {
    let cartCount = document.getElementById('cart-count');
    if (cartCount) {
        let totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = '(' + totalItems + ')';
    }
}

// Function to update cart display in sidebar
function updateCartDisplay() {
    let container = document.getElementById('cart-items-container');
    let totalPriceSpan = document.getElementById('cart-total-price');
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="text-gray-400 text-center py-8">Your cart is empty</p>';
        totalPriceSpan.textContent = '$0';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        
        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/60'">
                <div class="cart-info">
                    <h4>${item.name}</h4>
                    <p>Size: ${item.size}</p>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    totalPriceSpan.textContent = '$' + total.toFixed(2);
}

// Function to remove item from cart
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
};

// Function to go to checkout
window.goToCheckout = function() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Proceeding to checkout with ' + cart.length + ' items');
    // You can redirect to checkout page here
    // window.location.href = 'checkout.html';
};

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add close button listener
    let closeBtn = document.getElementById('closeCart');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCart);
    }
    
    // Close on overlay click
    let overlay = document.getElementById('cartOverlay');
    if (overlay) {
        overlay.addEventListener('click', closeCart);
    }
    
    // Update cart count on page load
    updateCartCount();
    
    // Set default selected sizes
    let sizeDisplays = document.querySelectorAll('.size-display');
    sizeDisplays.forEach((display) => {
        display.textContent = 'Size: MED';
    });
});
