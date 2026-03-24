function goToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty');
        return;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "checkout.html";  // Single dynamic checkout page
}
