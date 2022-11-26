/* This will be where user build their PC */

import React from 'react';
import './BuildPC.css';
import { useState, useEffect } from 'react';
import menuIcon from '../../assets/menu.png';



class BuildPC extends React.Component{

    /*
    $("#sidebarToggle").click(function(e) {
    e.preventDefault();
    $("#sidebar").toggleClass("active");
    $("#wrapper").toggleClass("active");
    });
    */

    toggleSidebar = () => {
        document.getElementById("sidebar").classList.toggle('active');
        document.getElementById("wrapper").classList.toggle('active');
    }

    /* if user click outside of sidebar, close sidebar */
    componentDidMount(){
        document.addEventListener('click', this.handleClickOutside, true);
    }

    componentWillUnmount(){
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    handleClickOutside = (event) => {
        if (document.getElementById("sidebar").contains(event.target)){
            return;
        }
        document.getElementById("sidebar").classList.remove('active');
        document.getElementById("wrapper").classList.remove('active');
    }

    render(){
        return (
            <div className="build-pc">

            <button id="sidebarToggle" onClick={this.toggleSidebar}/>
            <div id="wrapper">
            <div id="sidebar"> 
                <ul>
                    <li>
                        <a href="#">
                        Case
                        <span className="pull-right"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        Cooling
                        <span className="pull-right"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        Cables
                        <span className="pull-right"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        CPU
                        <span className="pull-right"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        GPU
                        <span className="pull-right"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        Memory
                        <span className="pull-right"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        Motherboard 
                        <span className="pull-right"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        Power Supply
                        <span className="pull-right"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        Accessories
                        <span className="pull-right"></span>
                        </a>
                    </li>
                
                </ul>
                <ul className="footer">
                <li><a href="#">About</a></li>
                <li><a href="#">Help</a></li>
                <li><a href="#">Legal</a></li>
                </ul>
            </div>
            <div id="wrapperContent">
                <p className="well lead">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam tempora facere, cum error, tempore sequi. Saepe error alias reprehenderit at blanditiis voluptas quaerat sed. 
                </p> 
            </div>

            </div>
            </div>
        )
    }
}

export default BuildPC;