
// cart.js

// Render the cart sidebar in real-time
function renderCartSidebar() {
    const cartItemsContainer = document.getElementById("cart-items-container");
    const totalPriceElement = document.getElementById("cart-total-price");
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p>Your cart is empty</p>`;
        if (totalPriceElement) totalPriceElement.innerText = "$0.00";
        return;
    }

    let total = 0;
    let html = "";

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        html += `
        <div class="cart-item">
            <div class="cart-product-details">
                <span>${item.name}</span>
                <span>Size: ${item.size || ""}</span>
            </div>
            <div class="cart-price">
                $${item.price.toFixed(2)} x ${item.quantity}
            </div>
            <button class="remove-cart-item" data-index="${index}">Remove</button>
        </div>
        `;
    });

    cartItemsContainer.innerHTML = html;
    if (totalPriceElement) totalPriceElement.innerText = `$${total.toFixed(2)}`;

    // Add remove item handlers
    document.querySelectorAll('.remove-cart-item').forEach(btn => {
        btn.addEventListener('click', function () {
            const idx = parseInt(this.dataset.index);
            cart.splice(idx, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartSidebar();
        });
    });
}

// Add item to cart and immediately update sidebar
function addToCart(productName, price, size = "") {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // look for existing identical item
    const existingIndex = cart.findIndex(item => item.name === productName && item.size === size);

    if (existingIndex >= 0) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: parseFloat(price),
            size: size,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    renderCartSidebar(); // 🔥 This updates cart immediately
}

// Hook add-to-cart buttons
document.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", function () {
        const productBox = this.closest(".product-box");
        const title = productBox.querySelector(".product-title").innerText;
        const price = productBox.querySelector(".price").innerText.replace("$", "");
        // if you have size selection, pass it here
        const sizeText = productBox.querySelector(".size-selected")?.innerText || "";
        addToCart(title, price, sizeText);
    });
});

// Initialize cart on DOM load
document.addEventListener('DOMContentLoaded', () => {
    renderCartSidebar();
});
