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
                total += Number(item.price.replace(/[^0-9.-]+/g, ""));
                
            })
            // if item.price is 19.999, trim it to 19.99, or $771.9425999999999 to 771.94
            return total.toFixed(2);
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