const PRICE = 145.00;

const qtyInput = document.getElementById('qty');

qtyInput.addEventListener('input', () => {
    // later you can calculate total here
    console.log('Quantity changed:', qtyInput.value);
});
