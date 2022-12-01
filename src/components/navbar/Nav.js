/* This will be navbar for the entire app. */
import React from 'react';
import logo from "../../assets/mini-pc.jpg";
import cart from "../../assets/cart.png";
import userProfilePic from "../../assets/user-profile.png";
import './Nav.css';

function Nav() {
    return (
        <div className='Nav'>
            <div id="literally-just-a-blue-banner"></div>
            <nav>
                <ul className="nav-ul">
                    <li className="nav-li"><a href="/pcintrovert/mainpage"><img src={logo} alt="logo"/> Introvert PC</a></li>
                    <li className="nav-li"><a href="/pcintrovert/mainpage" id="home-button">Home</a></li>
                    <li className="nav-li"><a href="/pcintrovert/mainpage">VOID</a></li>
                    <li className="nav-li"><a href="/pcintrovert/cart"><img src={cart} alt="cart"/></a></li>
                    <li className="nav-li"><a href="/pcintrovert"><img src={userProfilePic} alt="userProfilePic"/></a></li>
                </ul>
            </nav>
        </div>
    );
}

export default Nav;
