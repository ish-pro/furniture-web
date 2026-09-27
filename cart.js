/* ==========================================
   SHOPPING CART LOGIC & LOCALSTORAGE
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    renderCartPage();

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('furniqa_cart')) || [];
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert('Order placed successfully! Thank you for shopping with FURNIQA.');
            localStorage.removeItem('furniqa_cart');
            renderCartPage();
            updateCartCountBadge();
        });
    }
});

function renderCartPage() {
    const cartItemsList = document.getElementById('cartItemsList');
    if (!cartItemsList) return;

    let cart = JSON.parse(localStorage.getItem('furniqa_cart')) || [];

    if (cart.length === 0) {
        cartItemsList.innerHTML = `
            <div style="text-align: center; padding: 40px 0;">
                <p style="color: var(--text-muted); margin-bottom: 20px; font-size: 1.1rem;">Your shopping cart is currently empty.</p>
                <a href="shop.html" class="btn btn-primary">EXPLORE SHOP</a>
            </div>
        `;
        document.getElementById('summarySubtotal').textContent = '₹0';
        document.getElementById('summaryDiscount').textContent = '-₹0';
        document.getElementById('summaryTotal').textContent = '₹0';
        return;
    }

    let subtotal = 0;

    cartItemsList.innerHTML = cart.map((item, index) => {
        const itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal;

        return `
            <div class="cart-item-row" style="display: flex; align-items: center; justify-content: space-between; padding: 20px 0; border-bottom: 1px solid var(--border-color);">
                <div style="display: flex; align-items: center; gap: 20px;">
                    <img src="${item.img}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                    <div>
                        <h4 style="font-size: 1.05rem; margin-bottom: 4px; color: var(--primary-color);">${item.name}</h4>
                        <span style="font-size: 0.9rem; color: var(--text-muted);">₹${item.price.toLocaleString('en-IN')}</span>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 30px;">
                    <div class="quantity-selector">
                        <button onclick="updateQty(${index}, -1)">-</button>
                        <input type="text" value="${item.quantity}" readonly style="width: 35px; text-align:center; border:none; background:transparent; font-weight:600;">
                        <button onclick="updateQty(${index}, 1)">+</button>
                    </div>
                    <span style="font-weight: 700; font-family: 'Playfair Display', serif; font-size: 1.1rem; min-width: 90px; text-align: right;">₹${itemSubtotal.toLocaleString('en-IN')}</span>
                    <button onclick="removeItem(${index})" style="background:none; border:none; color: #c62828; font-size: 1.1rem; cursor: pointer;"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
        `;
    }).join('');

    // Calculations
    const discount = subtotal > 999 ? Math.round(subtotal * 0.1) : 0;
    const shipping = subtotal > 999 ? 0 : 150;
    const total = subtotal - discount + (subtotal > 999 ? 0 : shipping);

    document.getElementById('summarySubtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById('summaryShipping').textContent = shipping === 0 ? 'Free' : `₹${shipping}`;
    document.getElementById('summaryDiscount').textContent = `-₹${discount.toLocaleString('en-IN')}`;
    document.getElementById('summaryTotal').textContent = `₹${total.toLocaleString('en-IN')}`;
}

// Global helper functions for cart quantity updates
function updateQty(index, change) {
    let cart = JSON.parse(localStorage.getItem('furniqa_cart')) || [];
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem('furniqa_cart', JSON.stringify(cart));
    renderCartPage();
    updateCartCountBadge();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('furniqa_cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('furniqa_cart', JSON.stringify(cart));
    renderCartPage();
    updateCartCountBadge();
    showToast('Product removed from cart.');
}