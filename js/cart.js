
// ==== CART HANDLER ====
const cartSidebar = document.getElementById("cartSidebar");
const cartToggle = document.querySelector(".cart-toggle");
const closeCartBtn = document.getElementById("closeCart");
const cartItemsContainer = document.querySelector(".cart-items");
const cartCount = document.querySelector(".cart-count");
const cartTotalPrice = document.querySelector(".cart-total-price");
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==== RENDER CART ====
function renderCart() {
    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
        const li = document.createElement("li");
        li.classList.add("cart-item");
        li.innerHTML = `
            <div>${item.name}</div>
            <div>Size: ${item.size}</div>
            <div>
                Qty: 
                <button class="qty-btn" data-index="${index}" data-action="decrease">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
            </div>
            <div>Rs ${item.price * item.quantity}</div>
        `;
        cartItemsContainer.appendChild(li);
    });

    // Update totals
    cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
    cartTotalPrice.textContent = totalPrice;
    localStorage.setItem("cart", JSON.stringify(cart));

    // Attach quantity buttons
    document.querySelectorAll(".qty-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const idx = parseInt(btn.dataset.index);
            const action = btn.dataset.action;
            if (action === "increase") cart[idx].quantity++;
            if (action === "decrease") cart[idx].quantity--;
            if (cart[idx].quantity <= 0) cart.splice(idx, 1);
            renderCart();
        });
    });
}

// ==== ADD TO CART WITH SIZE ====
document.querySelectorAll(".product-card").forEach(card => {
    const sizeButtons = card.querySelectorAll(".size-option");
    const selectedSizeSpan = card.querySelector(".selected-size");

    // Size click handler
    sizeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            sizeButtons.forEach(o => o.classList.remove("active"));
            btn.classList.add("active");
            selectedSizeSpan.textContent = btn.textContent;
        });
    });

    // Add to cart click
    card.querySelector(".add-to-cart-btn").addEventListener("click", () => {
        const name = card.querySelector(".product-name").textContent;
        const price = parseFloat(card.querySelector(".product-price").textContent.replace(/[^0-9]/g,""));
        const size = selectedSizeSpan.textContent;

        const existing = cart.find(i => i.name === name && i.size === size);
        if (existing) existing.quantity++;
        else cart.push({ name, price, size, quantity: 1 });

        renderCart();
        cartSidebar.classList.add("open");
    });
});

// ==== SIDEBAR TOGGLE ====
cartToggle.addEventListener("click", () => {
    cartSidebar.classList.toggle("open");
});

// ==== CLOSE BUTTON ====
closeCartBtn.addEventListener("click", () => {
    cartSidebar.classList.remove("open");
});

// ==== INITIAL RENDER ====
renderCart();
