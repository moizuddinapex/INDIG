
// ==== CART HANDLER ====
const cartSidebar = document.getElementById("cartSidebar");
const cartToggle = document.querySelector(".cart-toggle");
const closeCartBtn = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartCount = document.querySelector(".cart-count");
const cartTotalPrice = document.getElementById("cart-total-price");
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==== RENDER CART ====
function renderCart() {
    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
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
        cartItemsContainer.appendChild(div);
    });

    // Update counts
    cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
    cartTotalPrice.textContent = totalPrice;
    localStorage.setItem("cart", JSON.stringify(cart));

    // Quantity buttons
    document.querySelectorAll(".qty-btn").forEach(btn => {
        btn.onclick = () => {
            const idx = parseInt(btn.dataset.index);
            const action = btn.dataset.action;
            if (action === "increase") cart[idx].quantity++;
            if (action === "decrease") cart[idx].quantity--;
            if (cart[idx].quantity <= 0) cart.splice(idx, 1);
            renderCart();
        };
    });
}

// ==== ADD TO CART (uses existing size text) ====
addToCartBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const productCard = btn.closest(".product-card");
        const productName = productCard.querySelector(".product-name").textContent;
        const productPrice = parseFloat(productCard.querySelector(".product-price").textContent.replace(/[^0-9]/g,""));
        const sizeText = productCard.querySelector(".selected-size")?.textContent || "MED"; // fallback if no span

        const existing = cart.find(i => i.name === productName && i.size === sizeText);
        if (existing) existing.quantity++;
        else cart.push({ name: productName, price: productPrice, size: sizeText, quantity: 1 });

        renderCart();
        cartSidebar.classList.add("open");
    });
});

// ==== TOGGLE CART ====
cartToggle.addEventListener("click", () => cartSidebar.classList.toggle("open"));

// ==== CLOSE BUTTON ====
closeCartBtn.addEventListener("click", () => cartSidebar.classList.remove("open"));

// ==== INITIAL RENDER ====
renderCart();
