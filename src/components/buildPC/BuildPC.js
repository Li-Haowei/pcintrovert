/* This will be where user build their PC */

import React from 'react';
import './BuildPC.css';
import { useState, useEffect } from 'react';
import menuIcon from '../../assets/menu.png';
import logo from '../../assets/mini-pc.jpg';
import axios from 'axios'; 

function BuildPC({setCartItems, cartItems}) {
    const toggleSidebar = () =>{
        document.getElementById("sidebar").classList.toggle('active');
        document.getElementById("wrapper").classList.toggle('active');
    }
    /* if user click outside of sidebar, close sidebar */
    const componentDidMount = () =>{
        document.addEventListener('click', handleClickOutside, true);
    }
    const componentWillUnmount = () => {
        document.removeEventListener('click', handleClickOutside, true);
    }
    const handleClickOutside = (event) => {
        if (document.getElementById("sidebar").contains(event.target)){
            return;
        }
        document.getElementById("sidebar").classList.remove('active');
        document.getElementById("wrapper").classList.remove('active');
    }
    // call componentDidMount and componentWillUnmount
    useEffect(() => {
        componentDidMount();
        return componentWillUnmount;
    }, []);
    const cleanShelf = () => {
        document.getElementsByClassName('products')[0].innerHTML = "";
    }
    const loadCasesToProducts = () => {
        cleanShelf();
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
        addExpandableFunctions();
        btnAddToCart();
    }
    const loadCoolingToProducts = () => {
        cleanShelf();
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
        addExpandableFunctions();
        btnAddToCart();
    }   
    const loadCablesToProducts = () => {
        cleanShelf();
        let shelf = document.getElementsByClassName('products')[0];
        /* create a grid for each case */
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/71t3daQFuWL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">Antec Power Supply Sleeved Cable</p>
                    <p class="product-price">$29.99</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/91SmjlD+Y1L._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">CORSAIR Premium Individually Sleeved PSU Cables Pro Kit</p>
                    <p class="product-price">$89.20</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/91MEiZL8gjL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">CORSAIR Premium Individually Sleeved PSU Cables Starter Kit</p>
                    <p class="product-price">$58.90</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/6192a7E0byL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">CableGeeker Cat7 Shielded Ethernet Cable 50ft</p>
                    <p class="product-price">$16.99</p>
                </div>
            </div>
            `
        
        addExpandableFunctions();
        btnAddToCart();
    }
    const loadCPUsToProducts = () => {
        cleanShelf();
        let shelf = document.getElementsByClassName('products')[0];
        /* create a grid for each case */
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/616VM20+AzL._AC_SL1384_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">AMD Ryzen 9 5900X 12-core, 24-Thread Unlocked Desktop Processor</p>
                    <p class="product-price">$340.86</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/61vGQNUEsGL._AC_SL1384_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">AMD Ryzen 5 5600X 6-core, 12-Thread Unlocked Desktop Processor with Wraith Stealth Cooler</p>
                    <p class="product-price">$158.98</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/61uI+orDOZL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">Intel Core i9-13900K Desktop Processor 24 cores (8 P-cores + 16 E-cores) 36M Cache, up to 5.8 GHz</p>
                    <p class="product-price">$649.99</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/71LIKeM7GGL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">Intel® Core™ i5-11400F Desktop Processor 6 Cores up to 4.4 GHz LGA1200 (Intel® 500 Series & Select 400 Series Chipset) 65W</p>
                    <p class="product-price">$135.99</p>
                </div>
            </div>
            `
        
        addExpandableFunctions();
        btnAddToCart();
    }
    const loadGPUsToProducts = () => {
        cleanShelf();
        let shelf = document.getElementsByClassName('products')[0];
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/81aYOYQ4vBL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">ASUS TUF Gaming AMD Radeon™ RX 6800 OC Edition Graphics Card</p>
                    <p class="product-price">$469.99</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/81FTVf0jQCL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">PowerColor Red Devil AMD Radeon RX 6950 XT Graphics Card</p>
                    <p class="product-price">$1,103.00</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/81JP9a4rCCS._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">ZOTAC Gaming GeForce RTX™ 3090 Trinity OC 24GB GDDR6X 384-bit 19.5 Gbps PCIE 4.0 Gaming Graphics Card</p>
                    <p class="product-price">$1,298.00</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/7156DLyUsYL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">ZOTAC Gaming GeForce RTX 3060 Twin Edge OC 12GB GDDR6 192-bit 15 Gbps PCIE 4.0 Gaming Graphics Card</p>
                    <p class="product-price">$349.99</p>
                </div>
            </div>
            `

        addExpandableFunctions();
        btnAddToCart();
    }
    const loadRAMToProducts = () => {
        cleanShelf();
        let shelf = document.getElementsByClassName('products')[0];
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/81bIRUg3kmL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">Corsair Vengeance LPX 16GB (2x8GB) DDR4 DRAM 3200MHz C16 Desktop Memory Kit</p>
                    <p class="product-price">$49.99</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/81019udFtML._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">
                    Silicon Power Value Gaming DDR4 RAM 32GB (16GBx2) 3200MHz (PC4 25600) 288-pin CL16 1.35V UDIMM Desktop Memory Module with Heatsink Grey</p>
                    <p class="product-price">$66.97</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/71R65sYfi+L._AC_SL1200_.jpg" alt="case">
                <div class="product-info">  
                    <p class="product-name">CORSAIR VENGEANCE RGB PRO 32GB (2x16GB) DDR4 3600 (PC4-28800) C18 Desktop Memory</p>
                    <p class="product-price">$109.99</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/61mydJ3uPHL._AC_SL1100_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">G.Skill Trident Z NEO Series 64GB (2 x 32GB) 288-Pin SDRAM DDR4 3200 (PC4-25600) CL16-18-18-38 1.35V Dual Channel Desktop Memory</p>
                    <p class="product-price">$219.99</p>
                </div>
            </div>
            `
        addExpandableFunctions();
        btnAddToCart();
    }
    const loadStorageToProducts = () => {
        cleanShelf();
        let shelf = document.getElementsByClassName('products')[0];
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/81r0OmqcaIL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">SABRENT 256GB Rocket NVMe PCIe M.2 2280 Internal SSD High Performance Solid State Drive</p>
                    <p class="product-price">$44.99</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/81JpqaOdiDL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">SABRENT 1TB Rocket NVMe 4.0 Gen4 PCIe M.2 Internal SSD Extreme Performance Solid State Drive</p>
                    <p class="product-price">$129.99</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/61Tn54dVduL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">SK hynix Gold P31 2TB PCIe NVMe Gen3 M.2 2280 Internal SSD l Up to 3500MB/S l Compact M.2 SSD Form Factor SK hynix SSD - Internal Solid State Drive with 128-Layer NAND Flash</p>
                    <p class="product-price">$149.99</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/81kDJcPEPML._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">SAMSUNG 980 PRO SSD 2TB PCIe NVMe Gen 4 Gaming M.2 Internal Solid State Hard Drive Memory Card, Maximum Speed, Thermal Control, MZ-V8P2T0B q</p>
                    <p class="product-price">$216.95</p>
                </div>
            </div>
            `
        addExpandableFunctions();
        btnAddToCart();
    }
    const loadMotherboardToProducts = () => {
        cleanShelf();
        let shelf = document.getElementsByClassName('products')[0];
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/81Q-hxowAqL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">ASUS ROG Strix B550-F Gaming AMD AM4 Zen 3 Ryzen 5000 & 3rd Gen Ryzen ATX Gaming Motherboard (PCIe 4.0, 2.5Gb LAN, BIOS Flashback, HDMI 2.1, Addressable Gen 2 RGB Header and Aura Sync)</p>
                    <p class="product-price">$159.99</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/61dobbaqzbL._AC_SL1280_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">Asus ROG Strix Z590-A Gaming WiFi II LGA1200(Intel 11th/10thGen)ATX WhiteScheme Gaming Motherboard (14+2PowerStages,DDR4 5133,WiFi6 AX201,Intel2.5Gb LAN,Thunderbolt4,3x M.2/NVMe SSD, AURARGB lighting)</p>
                    <p class="product-price">$149.99</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/91ViCwb81mL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">MSI B550 Gaming GEN3 Gaming Motherboard (AMD AM4, DDR4, PCIe 3.0, SATA 6Gb/s, M.2, USB 3.2 Gen 1, HDMI, ATX, AMD Ryzen 5000/4000 Series Processors)</p>
                    <p class="product-price">$161.34</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/813ulZUa22L._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">MSI MPG X570S Edge MAX WiFi Gaming Motherboard (ATX, AMD, Socket AM4. DDR4, PCIe 4, CFX, M.2 Slots, Wi-Fi 6E)</p>
                    <p class="product-price">$234.99</p>
                </div>
            </div>
            `
        addExpandableFunctions();
        btnAddToCart();
    }
    const loadPowerSupplyToProducts = () => {
        cleanShelf();
        let shelf = document.getElementsByClassName('products')[0];
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/71x2zAnwmuL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">EVGA 550 BP, 80+ Bronze 550W, 3 Year Warranty, Compact 120mm Size, Power Supply 100-BP-0550-K1</p>
                    <p class="product-price">$51.99</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/816hgUgi5xL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">Corsair RMX Series (2021), RM750x, 750 Watt, Gold, Fully Modular Power Supply</p>
                    <p class="product-price">$124.45</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/51O0HdyXuwL._AC_SL1001_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">NZXT C850 PSU (2022) - PA-8G1BB-US - 850 Watt PSU - 80+ Gold Certified - Fully Modular - Sleeved Cables - ATX Gaming Power Supply</p>
                    <p class="product-price">$129.99</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/710giQRHyQS._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">Corsair RMX Series (2021), RM1000x, 1000 Watt, Gold, Fully Modular Power Supply,Black</p>
                    <p class="product-price">$167.99</p>
                </div>
            </div>
            `
        addExpandableFunctions();
        btnAddToCart();
    }
    const loadAccessoriesToProducts = () => {
        cleanShelf();
        let shelf = document.getElementsByClassName('products')[0];

        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/81-C7lGtQsL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">STREBITO Screwdriver Sets 142-Piece Electronics Precision Screwdriver with 120 Bits Magnetic Repair Tool Kit for iPhone, MacBook, Computer, Laptop, PC, Tablet, PS4, Xbox, Nintendo, Game Console</p>
                    <p class="product-price">$23.79</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/71ltBPle7VL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">100PCS Reusable Cable Ties - Multi-Purpose Cable management Hook & Loop Cable Straps Wire Ties, Adjustable Fastening Cord Organizer, Cable Organizer for Home, Office and Data Centers,4 Sizes & Black.</p>
                    <p class="product-price">$6.99</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/613PfZba9RL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">6 Ft Surge Protector Power Strip - 8 Widely Outlets with 4 USB Ports, 3 Side Outlet Extender with 6 Feet Extension Cord, Flat Plug, Wall Mount, Desk USB Charging Station, ETL ,White</p>
                    <p class="product-price">$16.98</p>
                </div>
            </div>
            `
        shelf.innerHTML += `
            <div class="grid">
                <img src="https://m.media-amazon.com/images/I/81EDeEs0iGL._AC_SL1500_.jpg" alt="case">
                <div class="product-info">
                    <p class="product-name">Keepsmile 100ft Led Strip Lights (2 Rolls of 50ft) Bluetooth Smart App Music Sync Color Changing RGB Led Light Strip with Remote and Power Adapter,Led Lights for Bedroom Room Home Decor Party Festival</p>
                    <p class="product-price">$16.99</p>
                </div>
            </div>
            `
        addExpandableFunctions();
        btnAddToCart();
    }
    const addExpandableFunctions = () => {
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
    const btnAddToCart = () => {
        //This function will create a button for each product
        //When clicked, it will add the product to TheCart
        let shelf = document.getElementsByClassName('products')[0];
        let grids = shelf.getElementsByClassName('grid');
        for (let i = 0; i < grids.length; i++){
            let product = grids[i].getElementsByClassName('product-info')[0];
            let btn = document.createElement('button');
            btn.classList.add('add-to-cart');
            btn.innerHTML = 'Add to Cart';
            btn.onclick = () => {
                let name = product.getElementsByClassName('product-name')[0].innerHTML;
                let price = product.getElementsByClassName('product-price')[0].innerHTML;
                let image = grids[i].getElementsByTagName('img')[0].src;
                setCartItems( arr => [...arr, {name, price, image}]);
            }
            product.appendChild(btn);
        }
    }
    /* if there is a change in cartItems, log it */
    useEffect(() => {
        if(cartItems.length!==0) localStorage.setItem('cart', JSON.stringify(cartItems));

        // if the there is something in localStorage, update it with the new added items
        if(localStorage.getItem('cart')!==null){
            let cart = JSON.parse(localStorage.getItem('cart'));
            setCartItems(cart);
        }
    }, [cartItems]);
    return (
            <div className="buildPc">

            <button id="sidebarToggle" onClick={toggleSidebar}/>
            <div id="wrapper">
            <div id="sidebar"> 
                <ul>
                    <li>
                        <a href="#Cases" onClick={loadCasesToProducts}>
                        Case
                        <span className="pull-right"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#Cooling" onClick={loadCoolingToProducts}>
                        Cooling
                        <span className="pull-right"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#Cables"  onClick={loadCablesToProducts}>
                        Cables
                        <span className="pull-right"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#CPU" onClick={loadCPUsToProducts}>
                        CPU
                        <span className="pull-right"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#GPU" onClick={loadGPUsToProducts}>
                        GPU
                        <span className="pull-right"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#RAM" onClick={loadRAMToProducts}>
                        RAM
                        <span className="pull-right"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#Disk" onClick={loadStorageToProducts}>
                        Disk
                        <span className="pull-right"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#Motherboard" onClick={loadMotherboardToProducts}>
                        Motherboard 
                        <span className="pull-right"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#PowerSupply" onClick={loadPowerSupplyToProducts}>
                        Power Supply
                        <span className="pull-right"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#Accessories" onClick={loadAccessoriesToProducts}>
                        Accessories
                        <span className="pull-right"></span>
                        </a>
                    </li>
                
                </ul>
                <ul className="footer">
                <li><a href="/about">About</a></li>
                <li><a href="https://github.com/Li-Haowei/pcintrovert/issues">Help</a></li>
                <li><a href="https://github.com/Li-Haowei/pcintrovert">Legal</a></li>
                </ul>
            </div>
            <div id="wrapperContent">
                <div className='products four-by-four-grids'>
                    <div className='introduction-in-store'>
                        <h1>Welcome to our store <img src={logo}></img></h1>
                        <h2><u>Introvert PC</u> has all the components compatible for each other components, so no mistakes could make</h2>
                        <h3>Click on the sidebar to see our products</h3>
                        <h4>Enjoy building</h4>
                    </div>
                </div>
            </div>

            </div>
            </div>
    );  
}

export default BuildPC;