
// ===== SAFE CART FIX =====

// Elements (match YOUR HTML)
const cartSidebar = document.getElementById("cartSidebar");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartCount = document.querySelector(".cart-count");
const cartTotalPrice = document.getElementById("cart-total-price");
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
const cartToggle = document.querySelector(".cart-toggle");
const closeCartBtn = document.getElementById("closeCart");

// Load cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===== RENDER CART (KEY FIX) =====
function renderCart() {
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const itemDiv = document.createElement("div");
        itemDiv.innerHTML = `
            <div>${item.name}</div>
            <div>Size: ${item.size}</div>
            <div>
                <button onclick="changeQty(${index}, -1)">-</button>
                ${item.quantity}
                <button onclick="changeQty(${index}, 1)">+</button>
            </div>
            <div>Rs ${item.price * item.quantity}</div>
            <hr>
        `;

        cartItemsContainer.appendChild(itemDiv);
    });

    // Update totals
    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
    }

    if (cartTotalPrice) {
        cartTotalPrice.textContent = total;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

// ===== CHANGE QUANTITY =====
function changeQty(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    renderCart();
}

// ===== ADD TO CART =====
addToCartBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".product-card");

        const name = card.querySelector(".product-name").innerText;
        const price = parseFloat(card.querySelector(".product-price").innerText.replace(/[^0-9]/g,""));

        // VERY IMPORTANT: your page currently has static size
        const sizeText = card.innerText.includes("Size:") 
            ? card.innerText.split("Size:")[1].trim().split("\n")[0]
            : "MED";

        const existing = cart.find(i => i.name === name && i.size === sizeText);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ name, price, size: sizeText, quantity: 1 });
        }

        renderCart(); // 🔥 THIS FIXES YOUR ISSUE
        cartSidebar.classList.add("open");
    });
});

// ===== TOGGLE =====
if (cartToggle) {
    cartToggle.addEventListener("click", () => {
        cartSidebar.classList.toggle("open");
    });
}

if (closeCartBtn) {
    closeCartBtn.addEventListener("click", () => {
        cartSidebar.classList.remove("open");
    });
}

// ===== INITIAL LOAD =====
renderCart();
