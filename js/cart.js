


// Cart array to store items
let cart = [];

// Load cart from localStorage when page loads
function loadCart() {
    const savedCart = localStorage.getItem('indigCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
        updateCartCount();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('indigCart', JSON.stringify(cart));
}

// Add item to cart with real-time update
function addToCartWithSize(productName, price, imageUrl, productId, selectedSize) {
    // Get the selected size from the size display for this product
    let size = 'MED'; // default size
    const sizeDisplay = document.getElementById(`size-display-${productId}`);
    if (sizeDisplay) {
        const sizeText = sizeDisplay.innerText;
        size = sizeText.replace('Size: ', '');
    }
    
    // Create cart item object
    const cartItem = {
        id: Date.now() + Math.random(), // unique ID for each cart item
        name: productName,
        price: price,
        image: imageUrl,
        size: size,
        quantity: 1
    };
    
    // Check if item with same name and size already exists
    const existingItemIndex = cart.findIndex(item => 
        item.name === productName && item.size === size
    );
    
    if (existingItemIndex !== -1) {
        // Item exists, increment quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // Add new item
        cart.push(cartItem);
    }
    
    // Save to localStorage
    saveCart();
    
    // Update UI in real-time
    updateCartDisplay();
    updateCartCount();
    
    // Show a quick notification
    showAddToCartNotification(productName, size);
}

// Update the cart sidebar display
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items-container');
    const totalPriceElement = document.getElementById('cart-total-price');
    
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-center text-gray-400 py-8">Your cart is empty</p>';
        if (totalPriceElement) totalPriceElement.innerText = '$0.00';
        return;
    }
    
    let total = 0;
    let cartHtml = '';
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartHtml += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-info">
                    <h4>${item.name}</h4>
                    <p>Size: ${item.size}</p>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
    });
    
    cartContainer.innerHTML = cartHtml;
    if (totalPriceElement) totalPriceElement.innerText = `$${total.toFixed(2)}`;
}

// Update cart count badge
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.innerText = `(${totalItems})`;
    }
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
    updateCartCount();
}

// Clear entire cart
function clearCart() {
    cart = [];
    saveCart();
    updateCartDisplay();
    updateCartCount();
}

// Open cart sidebar
function openCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    if (sidebar && overlay) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    }
    updateCartDisplay();
}

// Close cart sidebar
function closeCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    if (sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
}

// Show quick notification when item is added
function showAddToCartNotification(productName, size) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <div style="position: fixed; bottom: 20px; right: 20px; background: #c5a059; color: black; padding: 12px 24px; border-radius: 4px; z-index: 10000; font-family: monospace; font-size: 14px; animation: slideIn 0.3s ease;">
            ✓ Added ${productName} (Size ${size}) to cart
        </div>
    `;
    
    if (!document.querySelector('#cart-notification-style')) {
        const style = document.createElement('style');
        style.id = 'cart-notification-style';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Go to checkout
function goToCheckout() {
    if (cart.length === 0) {
        showAddToCartNotification('', 'empty');
        return;
    }
    alert('Proceeding to checkout with ' + cart.reduce((sum, item) => sum + item.quantity, 0) + ' items');
}

// Event listeners for cart
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    
    const overlay = document.getElementById('cartOverlay');
    const closeBtn = document.getElementById('closeCart');
    
    if (overlay) {
        overlay.addEventListener('click', closeCart);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCart);
    }
    
    const sidebar = document.getElementById('cartSidebar');
    if (sidebar) {
        sidebar.addEventListener('click', (e) => e.stopPropagation());
    }
});
