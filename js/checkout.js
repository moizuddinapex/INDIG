// ---------- CART STATE ----------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ---------- SELECT ELEMENTS ----------
const sidebar = document.getElementById("cartSidebar");
const overlay = document.getElementById("cartOverlay");
const closeBtn = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartTotalPrice = document.getElementById("cart-total-price");
const cartCount = document.getElementById("cart-count");

// ---------- UPDATE CART COUNTER WITH ANIMATION ----------
function updateCartCounter() {
    if (cartCount) {
        const itemCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
        cartCount.innerText = `(${itemCount})`;
        
        // Add animation
        cartCount.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 200);
    }
}

// ---------- SHOW NOTIFICATION ----------
function showNotification(message) {
    // Remove any existing notification
    const existingNotif = document.querySelector('.cart-notification');
    if (existingNotif) existingNotif.remove();
    
    const notification = document.createElement('div');
    notification.className = 'cart-notification fixed bottom-4 right-4 bg-[#c5a059] text-black px-6 py-3 text-xs tracking-widest z-50 animate-slide-up';
    notification.innerText = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// ---------- OPEN / CLOSE CART ----------
function openCart() {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    renderCart();
}

function closeCart() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
}

// ---------- RENDER CART ----------
function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    let itemCount = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="text-center text-gray-500 py-8">Your cart is empty</p>`;
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.qty;
            itemCount += item.qty;

            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover">
                <div class="cart-info flex-1">
                    <h4 class="text-sm font-light mb-1">${item.name}</h4>
                    <p class="text-[10px] text-gray-400 mb-2">$${item.price.toLocaleString()} x ${item.qty}</p>
                    <button onclick="removeItem(${index})" class="text-[10px] text-gray-500 hover:text-[#c5a059] transition">
                        Remove
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(div);
        });
    }

    cartTotalPrice.innerText = "$" + total.toLocaleString();
    updateCartCounter();
}

// ---------- ADD ITEM (ORIGINAL) ----------
function addToCart(name, price, image) {
    const existing = cart.find(i => i.name === name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, image, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
    showNotification(`${name} added to cart`);
    openCart();
}

// ---------- QUICK ADD FROM HOMEPAGE ----------
function quickAddToCart(name, price, image, category) {
    // Prevent event bubbling
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const existing = cart.find(i => i.name === name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ 
            name: name, 
            price: price, 
            image: image, 
            category: category || 'general',
            qty: 1 
        });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
    showNotification(`${name} added to cart`);
}

// ---------- ADD ITEM WITH SIZE (FOR PRODUCT PAGES) ----------
function addToCartWithSize(name, price, image, productId) {
    if (event) event.stopPropagation();
    
    const productCard = event?.target?.closest('.product-card');
    let selectedSize = productCard?.getAttribute('data-selected-size') || 'MED';
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
    updateCartCounter();
    showNotification(`${name} (Size ${selectedSize}) added to cart`);
    openCart();
}

// ---------- REMOVE ITEM ----------
function removeItem(index) {
    const removedItem = cart[index];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    showNotification(`${removedItem.name} removed from cart`);
}

// ---------- SMART CHECKOUT ----------
function goToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty');
        return;
    }
    
    // Determine checkout page based on first item
    const firstItem = cart[0];
    let checkoutPage = "checkout-shirt1.1.1.html"; // default
    
    const nameLower = firstItem.name.toLowerCase();
    const category = firstItem.category || '';
    
    if (category === 'shoes' || nameLower.includes('derby') || nameLower.includes('loafer') || nameLower.includes('oxford')) {
        checkoutPage = "checkout-shoes1.1.1.html";
    } else if (category === 'pants' || nameLower.includes('chino') || nameLower.includes('trouser') || nameLower.includes('pant')) {
        checkoutPage = "checkout-pant1.1.1.html";
    } else if (category === 'watches' || nameLower.includes('chronograph') || nameLower.includes('watch')) {
        checkoutPage = "checkout-watch1.1.1.html";
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = checkoutPage;
}

// ---------- ADD CSS ANIMATIONS ----------
function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-slide-up {
            animation: slideUp 0.3s ease-out;
        }
        .cart-notification {
            box-shadow: 0 5px 20px rgba(197, 160, 89, 0.3);
            border: 1px solid rgba(197, 160, 89, 0.3);
        }
        #cart-count {
            transition: transform 0.2s ease;
            display: inline-block;
        }
    `;
    document.head.appendChild(style);
}

// ---------- EVENT LISTENERS ----------
if (closeBtn) {
    closeBtn.addEventListener("click", closeCart);
}

if (overlay) {
    overlay.addEventListener("click", closeCart);
}

// Close cart with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar?.classList.contains('active')) {
        closeCart();
    }
});

// ---------- INITIALIZE ----------
document.addEventListener("DOMContentLoaded", () => {
    addStyles();
    renderCart();
    
    // Expose functions globally
    window.openCart = openCart;
    window.closeCart = closeCart;
    window.addToCart = addToCart;
    window.quickAddToCart = quickAddToCart;
    window.addToCartWithSize = addToCartWithSize;
    window.removeItem = removeItem;
    window.goToCheckout = goToCheckout;
});
