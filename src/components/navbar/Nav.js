/* This will be navbar for the entire app. */
import React from 'react';
import logo from "../../images/mini-pc.jpg";
import userProfilePic from "../../images/user-profile.png";
import './Nav.css';

function Nav() {
    return (
        <div className='Nav'>
            <nav>
                <ul>
                    <li><a href="#"><img src={logo}/> Introvert PC</a></li>
                    <li><a href="#">Home</a></li>
                    <li><a href="#"><img src={userProfilePic}/></a></li>
                </ul>
            </nav>
        </div>
    );
}

export default Nav;
