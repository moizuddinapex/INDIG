// ==========================
// GLOBAL CART STATE
// ==========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ==========================
// OPEN / CLOSE SIDEBAR
// ==========================
function toggleCart(show = true) {

    const drawer = document.getElementById("cart-sidebar");
    const overlay = document.getElementById("cart-overlay");

    if (!drawer || !overlay) {
        console.log("Cart elements missing");
        return;
    }

    if (show) {
        drawer.classList.add("active");
        overlay.classList.add("active");
        renderCart();
    } else {
        drawer.classList.remove("active");
        overlay.classList.remove("active");
    }
}


// ==========================
// ADD TO CART
// ==========================
function addToCart(name, price, image) {

    cart.push({ name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
    toggleCart(true);
}


// ==========================
// RENDER CART
// ==========================
function renderCart() {

    const container = document.getElementById("cart-items-container");
    const totalElement = document.getElementById("cart-total-price");
    const countElement = document.getElementById("cart-count");

    if (!container) return;

    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML =
            `<div class="empty-msg">Your bag is empty</div>`;
    } else {

        cart.forEach((item, index) => {

            total += item.price;

            container.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" />
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>Rs ${item.price.toLocaleString()}</p>
                        <button onclick="removeItem(${index})">Remove</button>
                    </div>
                </div>
            `;
        });
    }

    if (totalElement)
        totalElement.innerText = "Rs " + total.toLocaleString();

    if (countElement)
        countElement.innerText = `(${cart.length})`;
}


// ==========================
// REMOVE ITEM
// ==========================
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}


// ==========================
// CHECKOUT REDIRECT
// ==========================
function goToCheckout() {
    window.location.href = "checkout-shirt1.1.1.html";
}


// ==========================
// INIT EVENTS
// ==========================
document.addEventListener("DOMContentLoaded", () => {

    renderCart();

    // BAG ICON CLICK
    const bagIcon =
        document.querySelector(".bag-icon") ||
        document.querySelector(".fa-shopping-bag") ||
        document.querySelector(".header__icon--cart");

    if (bagIcon) {
        bagIcon.addEventListener("click", (e) => {
            e.preventDefault();
            toggleCart(true);
        });
    } else {
        console.log("Bag icon not found");
    }

    // CLOSE EVENTS
    document.getElementById("cart-overlay")
        ?.addEventListener("click", () => toggleCart(false));

    document.getElementById("closeCart")
        ?.addEventListener("click", () => toggleCart(false));
});




