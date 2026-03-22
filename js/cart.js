
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

// ==== CART RENDER ====
function renderCart() {
    cartItemsContainer.innerHTML = "";
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("cart-item");
        li.innerHTML = `
            <div class="cart-item-name">${item.name}</div>
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

    // Update total count
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Attach quantity buttons
    const qtyBtns = document.querySelectorAll(".qty-btn");
    qtyBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const index = parseInt(btn.dataset.index);
            if (btn.dataset.action === "increase") {
                cart[index].quantity += 1;
            } else if (btn.dataset.action === "decrease") {
                cart[index].quantity -= 1;
                if (cart[index].quantity <= 0) cart.splice(index, 1);
            }
            renderCart();
        });
    });
}

// ==== SIZE SELECTION ====
sizeOptions.forEach(option => {
    option.addEventListener("click", () => {
        sizeOptions.forEach(o => o.classList.remove("active"));
        option.classList.add("active");
        sizeLabel.textContent = option.textContent; // update label immediately
    });
});

// ==== ADD TO CART ====
addToCartBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const productCard = btn.closest(".product-card");
        const productName = productCard.querySelector(".product-name").textContent;
        const productPrice = parseFloat(productCard.querySelector(".product-price").textContent.replace("Rs","").trim());
        const selectedSize = sizeLabel.textContent;

        // Check if product+size exists
        const existingItem = cart.find(item => item.name === productName && item.size === selectedSize);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, size: selectedSize, quantity: 1 });
        }

        renderCart();
        cartSidebar.classList.add("open"); // open sidebar after add
    });
});

// ==== TOGGLE CART SIDEBAR ====
cartToggle.addEventListener("click", () => {
    cartSidebar.classList.toggle("open");
});

// ==== INITIAL RENDER ====
renderCart();
