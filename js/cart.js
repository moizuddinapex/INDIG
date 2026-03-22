
// ==== CART HANDLER ====
const cartToggle = document.querySelector(".cart-toggle");
const cartSidebar = document.querySelector(".cart-sidebar");
const cartItemsContainer = document.querySelector(".cart-items");
const cartCount = document.querySelector(".cart-count");
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
const sizeOptions = document.querySelectorAll(".size-option");
const sizeLabel = document.querySelector(".selected-size");

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render cart UI
function renderCart() {
    cartItemsContainer.innerHTML = "";
    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ${item.size} x${item.quantity} - $${item.price * item.quantity}
        `;
        cartItemsContainer.appendChild(li);
    });
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Size selection handler
sizeOptions.forEach(option => {
    option.addEventListener("click", () => {
        sizeOptions.forEach(o => o.classList.remove("active"));
        option.classList.add("active");
        sizeLabel.textContent = option.textContent; // update label immediately
    });
});

// Add to cart handler
addToCartBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const productCard = btn.closest(".product-card");
        const productName = productCard.querySelector(".product-name").textContent;
        const productPrice = parseFloat(productCard.querySelector(".product-price").textContent.replace("$",""));
        const selectedSize = sizeLabel.textContent;

        // Check if product + size already exists in cart
        const existingItem = cart.find(item => item.name === productName && item.size === selectedSize);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, size: selectedSize, quantity: 1 });
        }

        renderCart();
        cartSidebar.classList.add("open"); // optionally open sidebar
    });
});

// Toggle cart sidebar
cartToggle.addEventListener("click", () => {
    cartSidebar.classList.toggle("open");
});

// Initial render
renderCart();
