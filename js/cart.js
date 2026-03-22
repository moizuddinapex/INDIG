
// cart.js

// Get cart from localStorage or initialize
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Cart sidebar container
const cartContainer = document.getElementById("cart-items-container");
const cartTotal = document.getElementById("cart-total-price");

// Render cart sidebar
function renderCart() {
    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty</p>";
        if (cartTotal) cartTotal.innerText = "$0.00";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <div class="cart-product-details">
                <span>${item.name}</span>
                <span>Size: ${item.size}</span>
            </div>
            <div class="cart-price">
                $${item.price.toFixed(2)} x ${item.quantity}
            </div>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartContainer.appendChild(div);
    });

    if (cartTotal) cartTotal.innerText = `$${total.toFixed(2)}`;

    // Remove item handler
    document.querySelectorAll(".remove-item").forEach(btn => {
        btn.addEventListener("click", e => {
            const idx = parseInt(e.target.dataset.index);
            cart.splice(idx, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        });
    });
}

// Add item to cart
function addToCart(name, price, size) {
    // Check if same product & size exists
    const existingIndex = cart.findIndex(
        item => item.name === name && item.size === size
    );

    if (existingIndex >= 0) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            name: name,
            price: parseFloat(price),
            size: size,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart(); // Update sidebar immediately
}

// Hook add-to-cart buttons
document.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", function () {
        const productBox = this.closest(".product-box");
        const title = productBox.querySelector(".product-title").innerText;
        const price = productBox.querySelector(".price").innerText.replace("$", "");
        const size = productBox.querySelector(".size-selected")?.innerText || "MED";

        addToCart(title, price, size);
    });
});

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});
