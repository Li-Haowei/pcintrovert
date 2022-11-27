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
    Cooling: name: Enermax Liqmax III 240 RGB AIO CPU Liquid Cooler, img: https://m.media-amazon.com/images/I/61fJ8nGgqPL._SL1500_.jpg, price: $54.99
             name: Cooler Master Hyper 212 Black Edition RGB CPU Air Cooler, img:https://m.media-amazon.com/images/I/81gIOOqmS7L._AC_SL1500_.jpg, price: $50.53
             name: Corsair iCUE H150i Elite Capellix Liquid CPU Cooler, img: https://m.media-amazon.com/images/I/51e41U32IWL._AC_SL1000_.jpg, price: $179.99


    
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

    cleanShelf = () => {
        document.getElementsByClassName('products')[0].innerHTML = "";
    }

    loadCasesToProducts = () => {
        this.cleanShelf();
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
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/71eWq2GbhhL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">HYTE Y60 Modern Aesthetic Dual Chamber Panoramic Tempered Glass Mid-Tower ATX Computer Gaming Case</p>
                    <p class="product-price">$159.99</p>
                </div>
            </div>
            `
        this.addExpandableFunctions();
    }

    loadCoolingToProducts = () => {
        this.cleanShelf();
        let shelf = document.getElementsByClassName('products')[0];
        /* create a grid for each case */
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/61fJ8nGgqPL._SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">Enermax Liqmax III 240 RGB AIO CPU Liquid Cooler</p>
                    <p class="product-price">$54.99</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/81gIOOqmS7L._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">Cooler Master Hyper 212 Black Edition RGB CPU Air Cooler</p>
                    <p class="product-price">$50.53</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/71Q10b2FtBL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">Thermaltake UX200 SE 5V Motherboard</p>
                    <p class="product-price">$29.99</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/71irWztV+qL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">Jonsbo CR1400 RGB CPU Air Cooler</p>
                    <p class="product-price">$25.99</p>
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
                        <a href="#" onClick={this.loadCoolingToProducts}>
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