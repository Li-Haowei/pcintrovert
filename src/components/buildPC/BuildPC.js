/* This will be where user build their PC */

import React from 'react';
import './BuildPC.css';
import { useState, useEffect } from 'react';
import menuIcon from '../../assets/menu.png';
import axios from 'axios'; 
/*
    Products:
    Cases: name: AMANSON PC CASE ATX Mid Tower Case, img: https://m.media-amazon.com/images/I/81JwnDYiKTL._AC_SL1500_.jpg, price: $88.99
           name: GIM ATX Mid-Tower Case White Gaming PC Case, img: https://m.media-amazon.com/images/I/71vbA44y12L._AC_SL1500_.jpg, price: $127.99
           name: Corsair 4000D Airflow Tempered Glass Mid-Tower ATX PC Case - Black, img: https://m.media-amazon.com/images/I/81hL4tPkXZL._AC_SL1500_.jpg, price: $89.99


    
*/
class BuildPC extends React.Component{
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

    loadCasesToProducts = () => {
        let shelf = document.getElementsByClassName('products')[0];
        /* create a grid for each case */
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/81JwnDYiKTL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">AMANSON PC CASE ATX Mid Tower Case</p>
                    <p class="product-price">$88.99</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/71vbA44y12L._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">GIM ATX Mid-Tower Case White Gaming PC Case</p>
                    <p class="product-price">$127.99</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/81hL4tPkXZL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">Corsair 4000D Airflow Tempered Glass Mid-Tower ATX PC Case - Black</p>
                    <p class="product-price">$89.99</p>
                </div>
            </div>
            `
        this.addExpandableFunctions();
    }

    addExpandableFunctions = () => {
        //when one expands, all others collapse
        let grids = document.getElementsByClassName('grid');
        for (let i = 0; i < grids.length; i++){
            grids[i].addEventListener('click', () => {
                for (let j = 0; j < grids.length; j++){
                    grids[j].classList.remove('expand');
                }
                grids[i].classList.toggle('expand');
            })
        }
    }


    render(){
        return (
            <div className="buildPc">

            <button id="sidebarToggle" onClick={this.toggleSidebar}/>
            <div id="wrapper">
            <div id="sidebar"> 
                <ul>
                    <li>
                        <a href="#" onClick={this.loadCasesToProducts}>
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
                <div className='products four-by-four-grids'>
                </div>
            </div>

            </div>
            </div>
        )
    }
}

export default BuildPC;