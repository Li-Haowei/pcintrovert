//This will be where all the items user collects will be displayed.
import React from 'react';
import './Cart.css';

function Cart() {
    const localStorageCart = localStorage.getItem('cart');
    const cart = JSON.parse(localStorageCart);
    console.log(cart);
    function loadCart() {
        if (cart) {
            return cart.map((item) => {
                // price looks like "$229.99&nbsp;–", "$159.99&nbsp;(15 Offers)–", make it $229.99, $159.99
                let price = 0;
                if(item.price !== undefined) {
                    price = item.price.split('&nbsp')[0];
                }
                return (
                    <div className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>{price}</p>
                            <button className="remove-button" onClick={
                                () => {
                                    // const newCart = cart.filter((cartItem) => cartItem.name !== item.name);
                                    // localStorage.setItem('cart', JSON.stringify(newCart));
                                    // window.location.reload();

                                    //remove based on its unique id
                                    const newCart = cart.filter((cartItem) => cartItem.id !== item.id);
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
                if(item.price !== undefined) {         
                    total += Number(item.price.replace(/[^0-9.-]+/g, ""));
                }
            })
            // if item.price is 19.999, trim it to 19.99, or $771.9425999999999 to 771.94
            return total.toFixed(2);
        }
    }
    function removeAll() {
        localStorage.removeItem('cart');
        window.location.reload();
    }
    return (
        <div className='Cart'>
            <h1>Cart</h1>
            <div className="cart-items">
            {loadCart()}
            </div>
            <div className="cart-total">
                <h3 id="price">Total: ${calculateTotal()}</h3>
            </div>
        </div>
    );
}

export default Cart;