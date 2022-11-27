//This will be where all the items user collects will be displayed.
import React from 'react';
import './Cart.css';

function Cart() {
    const localStorageCart = localStorage.getItem('cart');
    return (
        <div className='Cart'>
            <h1>Cart</h1>
            <div className="cart-items">
            {localStorageCart}
            </div>
        </div>
    );
}

export default Cart;