// ===== CART FIX FOR YOUR ORIGINAL LAYOUT =====

// Elements (matching YOUR structure)
const cartSidebar = document.getElementById("cartSidebar");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartCount = document.querySelector(".cart-count");
const cartTotalPrice = document.getElementById("cart-total-price");
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
const cartToggle = document.querySelector(".cart-toggle");
const closeCartBtn = document.getElementById("closeCart");

// Load cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===== RENDER CART =====
function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.innerHTML = `
            <p>${item.name}</p>
            <p>Size: ${item.size}</p>
            <div>
                <button onclick="changeQty(${index}, -1)">-</button>
                ${item.quantity}
                <button onclick="changeQty(${index}, 1)">+</button>
            </div>
            <p>Rs ${item.price * item.quantity}</p>
            <hr>
        `;

        cartItemsContainer.appendChild(div);
    });

    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
    }

    if (cartTotalPrice) {
        cartTotalPrice.textContent = total;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

// ===== CHANGE QTY =====
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
        const price = parseFloat(
            card.querySelector(".product-price").innerText.replace(/[^0-9]/g, "")
        );

        // Extract size from text (works with your layout)
        let size = "MED";
        const sizeMatch = card.innerText.match(/Size:\s*(\w+)/);
        if (sizeMatch) size = sizeMatch[1];

        const existing = cart.find(i => i.name === name && i.size === size);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ name, price, size, quantity: 1 });
        }

        renderCart(); // 🔥 REAL-TIME FIX
        cartSidebar.classList.add("open");
    });
});

// ===== TOGGLE =====
if (cartToggle) {
    cartToggle.addEventListener("click", () => {
        cartSidebar.classList.toggle("open");
    });
}

// ===== CLOSE =====
if (closeCartBtn) {
    closeCartBtn.addEventListener("click", () => {
        cartSidebar.classList.remove("open");
    });
}

// ===== INITIAL LOAD =====
renderCart();
