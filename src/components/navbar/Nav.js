/* This will be navbar for the entire app. */
import React from 'react';
import logo from "../../assets/mini-pc.jpg";
import cart from "../../assets/cart.png";
import userProfilePic from "../../assets/user-profile.png";
import './Nav.css';

function Nav() {
    return (
        <div className='Nav'>
            <nav>
                <ul className="nav-ul">
                    <li className="nav-li"><a href="#"><img src={logo}/> Introvert PC</a></li>
                    <li className="nav-li"><a href="/mainpage">Home</a></li>
                    <li className="nav-li"><a href="/cart"><img src={cart}/></a></li>
                    <li className="nav-li"><a href="/"><img src={userProfilePic}/></a></li>
                </ul>
            </nav>
        </div>
    );
}

export default Nav;
