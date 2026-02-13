// ---------- CART STATE ----------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ---------- SELECT ELEMENTS ----------
const sidebar = document.getElementById("cartSidebar");
const overlay = document.getElementById("cartOverlay");
const closeBtn = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartTotalPrice = document.getElementById("cart-total-price");
const cartCount = document.getElementById("cart-count");

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
        cartItemsContainer.innerHTML = `<p>Your cart is empty</p>`;
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.qty;
            itemCount += item.qty;

            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-info">
                    <h4>${item.name}</h4>
                    <p>Rs ${item.price.toLocaleString()} x ${item.qty}</p>
                    <button onclick="removeItem(${index})" class="remove-btn">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(div);
        });
    }

    cartTotalPrice.innerText = "Rs " + total.toLocaleString();
    
    // Update cart count in navigation
    if (cartCount) {
        cartCount.innerText = `(${itemCount})`;
    }
}

// ---------- ADD ITEM ----------
function addToCart(name, price, image) {
    const existing = cart.find(i => i.name === name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, image, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    openCart();
}

// ---------- REMOVE ITEM ----------
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// ---------- CHECKOUT ----------
function goToCheckout() {
    window.location.href = "checkout-shirt1.1.1.html";
}

// ---------- EVENT LISTENERS ----------
if (closeBtn) {
    closeBtn.addEventListener("click", closeCart);
}

if (overlay) {
    overlay.addEventListener("click", closeCart);
}

// ---------- INITIALIZE ----------
document.addEventListener("DOMContentLoaded", () => {
    renderCart();


document.addEventListener('DOMContentLoaded', () => {
    // 1. Identify your "Buy" button
    // Make sure the class '.buy-btn' matches the class on your button in product2.html
    const buyButton = document.querySelector('.buy-btn'); 

    if (buyButton) {
        buyButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents default jump behavior
            
            // 2. Redirect to the correct file name
            // Note: Use the exact name of your file: checkout-shoes1.1.1.html
            window.location.href = 'checkout-shoes1.1.1.html';
        });
    } else {
        console.error("The Buy button with class '.buy-btn' was not found on this page.");
    }




});




