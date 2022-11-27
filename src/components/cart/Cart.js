//This will be where all the items user collects will be displayed.
import React from 'react';
import './Cart.css';

function Cart() {
    const localStorageCart = localStorage.getItem('cart');
    const cart = JSON.parse(localStorageCart);

    // /* remove a specific item from the cart, and update the localStorage */
    // const removeItem = (item) => {
    //     const newCart = cart.filter((cartItem) => cartItem.id !== item.id);
    //     localStorage.setItem('cart', JSON.stringify(newCart));
    //     window.location.reload();
    // }



    

    function loadCart() {
        if (cart) {
            return cart.map((item) => {
                return (
                    <div className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>{item.price}</p>
                            <button className="remove-button" onClick={
                                () => {
                                    const newCart = cart.filter((cartItem) => cartItem.name !== item.name);
                                    localStorage.setItem('cart', JSON.stringify(newCart));
                                    window.location.reload();
                                }
                            }>Remove</button>
                        </div>
                    </div>
                )
            })
        }
    }
    function calculateTotal() {
        if (cart) {
            let total = 0;
            cart.forEach((item) => {
                //item.price to number before summation; example: $1,103.00 to 1103, $149.99 to 149.99
                total += Number(item.price.replace(/[^0-9.-]+/g, ""));
            })
            return total;
        }
    }
    return (
        <div className='Cart'>
            <h1>Cart</h1>
            <div className="cart-items">
            {loadCart()}
            </div>
            <div className="cart-total">
                <h3>Total: ${calculateTotal()}</h3>
            </div>
        </div>
    );
}

export default Cart;