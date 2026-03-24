function clearCartAndRedirect() {
    // Get cart data and customer info
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const customerName = document.getElementById('fullname').value.trim();
    
    // Store order data in sessionStorage (survives redirect)
    sessionStorage.setItem('orderData', JSON.stringify({
        items: cart,
        customerName: customerName,
        total: cartTotal,
        orderDate: new Date().toISOString()
    }));
    
    // Clear the cart from localStorage
    localStorage.removeItem('cart');
    
    // Redirect to success page
    window.location.href = 'success.html';
}
