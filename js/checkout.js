
// Global cart state
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 1. OPEN/CLOSE SIDEBAR
function toggleCart(show = true) {
    const drawer = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    if (show) {
        drawer.classList.add('active');
        overlay.classList.add('active');
        renderCart();
    } else {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
    }
}

// 2. ADD TO CART
function addToCart(name, price, image) {
    cart.push({ name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Slide it open automatically like Diners
    renderCart();
    toggleCart(true); 
}

// 3. DISPLAY ITEMS IN SIDEBAR
function renderCart() {
    const container = document.getElementById("cart-items-container");
    const totalElement = document.getElementById("cart-total-price");
    const countElement = document.getElementById("cart-count");
    
    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = `<div class="empty-msg">Your bag is empty</div>`;
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            container.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>Rs ${item.price.toLocaleString()}</p>
                        <button onclick="removeItem(${index})">Remove</button>
                    </div>
                </div>
            `;
        });
    }

    totalElement.innerText = "Rs " + total.toLocaleString();
    if(countElement) countElement.innerText = `(${cart.length})`;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function goToCheckout() {
    window.location.href = "checkout-shirt1.1.1.html";
}

// Ensure cart count updates on page load
document.addEventListener('DOMContentLoaded', renderCart);
