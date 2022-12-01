/* This will be where user build their PC */

import React from 'react';
import './BuildPC.css';
import { useState, useEffect } from 'react';
import logo from '../../assets/mini-pc.jpg';
import axios from 'axios'; 
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { ref, getDownloadURL } from "firebase/storage"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBjqL4c6rUKhHjwJwR1dxMmTZ1R9X3HfmE",
    authDomain: "introvertpc-a8c64.firebaseapp.com",
    projectId: "introvertpc-a8c64",
    storageBucket: "introvertpc-a8c64.appspot.com",
    messagingSenderId: "31681504808",
    appId: "1:31681504808:web:7cc7fc32bf7dde3381371d",
    measurementId: "G-DM1TC0KH5W"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://introvertpc-a8c64.appspot.com");

function BuildPC({setCartItems, cartItems}) {
    
    /* get all files from storage */
    const [CPUs, setCPUs] = useState([]);
    const [GPUs, setGPUs] = useState([]);
    const [RAMs, setRAMs] = useState([]);
    const [Motherboards, setMotherboards] = useState([]);
    const [Storages, setStorages] = useState([]);
    const [Cases, setCases] = useState([]);
    const [PowerSupplies, setPowerSupplies] = useState([]);
    const [Coolings, setCoolings] = useState([]);

    // every file has a Name, Price, i.e "$1,396.99\u00a0\u2013", Link, Picture

    useEffect(() => {
        //const storageRef = ref(storage);
        // get neweggCPU.json from storage
        getDownloadURL(ref(storage, 'neweggCPU.json'))
        .then((url) => {
            axios.get(url)
            .then((response) => {
                setCPUs(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        )

        // get neweggGPU.json from storage
        getDownloadURL(ref(storage, 'neweggGPU.json'))
        .then((url) => {
            axios.get(url)
            .then((response) => {
                setGPUs(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        )

        // get neweggRAM.json from storage
        getDownloadURL(ref(storage, 'neweggRAM.json'))
        .then((url) => {
            axios.get(url)
            .then((response) => {
                setRAMs(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        )

        // get neweggMotherboard.json from storage
        getDownloadURL(ref(storage, 'neweggMotherboard.json'))
        .then((url) => {
            axios.get(url)
            .then((response) => {
                setMotherboards(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        )

        // get neweggStorage.json from storage
        getDownloadURL(ref(storage, 'neweggStorage.json'))
        .then((url) => {
            axios.get(url)
            .then((response) => {
                setStorages(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        )

        // get neweggCase.json from storage
        getDownloadURL(ref(storage, 'neweggCase.json'))
        .then((url) => {
            axios.get(url)
            .then((response) => {
                setCases(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        )

        // get neweggPowerSupply.json from storage
        getDownloadURL(ref(storage, 'neweggPowerSupply.json'))
        .then((url) => {
            axios.get(url)
            .then((response) => {
                setPowerSupplies(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        )

        // get neweggCPUCooler.json from storage
        getDownloadURL(ref(storage, 'neweggCPUCooler.json'))
        .then((url) => {
            axios.get(url)
            .then((response) => {
                setCoolings(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        )

    }, []);

    const toggleSidebar = () =>{
        document.getElementById("sidebar").classList.toggle('active');
        document.getElementById("wrapper").classList.toggle('active');
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
        /* if user click outside of sidebar, close sidebar */
        const componentDidMount = () =>{
            document.addEventListener('click', handleClickOutside, true);
        }
        const componentWillUnmount = () => {
            document.removeEventListener('click', handleClickOutside, true);
        }
        componentDidMount();
        return componentWillUnmount;
    }, []);
    const cleanShelf = () => {
        document.getElementsByClassName('products')[0].innerHTML = "";
    }
    const loadCasesToProducts = () => {
        cleanShelf();
        let shelf = document.getElementsByClassName('products')[0];
        for (let i = 0; i < Cases.length; i++){
            Cases[i].Specs = "<ul>" + Cases[i].Specs.replace('[', '').replace(']', '').replace(/,/g, '') + "</ul>";
            shelf.innerHTML += `
                <div class="grid">
                    <img src="${Cases[i].Picture}" alt="case">
                    <div class="product-info">
                        <p class="product-name">${Cases[i].Name}</p>
                        <p class="product-price">${priceParser(Cases[i].Price)}</p>
                        <div class="product-specs">${Cases[i].Specs}</div>
                        <a href="${Cases[i].Link}"><button class="product-description">View More</button></a>
                        <div class="category">Case</div>
                    </div>
                </div>
                `
        }
        
        addExpandableFunctions();
        btnAddToCart();
    }
    const loadCoolingToProducts = () => {
        cleanShelf();
        let shelf = document.getElementsByClassName('products')[0];
        // Specs is a list of <li> elements in string format, remove [ and ] and wrap them with ul
        for (let i = 0; i < Coolings.length; i++){
            Coolings[i].Specs = "<ul>" + Coolings[i].Specs.replace('[', '').replace(']', '').replace(/,/g, '') + "</ul>";
            shelf.innerHTML += `
                <div class="grid">
                    <img src="${Coolings[i].Picture}" alt="Cooling">
                    <div class="product-info">
                        <p class="product-name">${Coolings[i].Name}</p>
                        <p class="product-price">${priceParser(Coolings[i].Price)}</p>
                        <div class="product-specs">${Coolings[i].Specs}</div>
                        <a href="${Coolings[i].Link}"><button class="product-description">View More</button></a>
                        <div class="category">Cooling</div>
                    </div>
                </div>
                `
        }
                        
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
        for (let i = 0; i < CPUs.length; i++){
            CPUs[i].Specs = "<ul>" + CPUs[i].Specs.replace('[', '').replace(']', '').replace(/,/g, '') + "</ul>";
            shelf.innerHTML += `
                <div class="grid">
                    <img src="${CPUs[i].Picture}" alt="CPUs">
                    <div class="product-info">
                        <p class="product-name">${CPUs[i].Name}</p>
                        <p class="product-price">${priceParser(CPUs[i].Price)}</p>
                        <div class="product-specs">${CPUs[i].Specs}</div>
                        <a href="${CPUs[i].Link}"><button class="product-description">View More</button></a>
                        <div class="category">CPU</div>
                    </div>
                </div>
                `
        }
        addExpandableFunctions();
        btnAddToCart();
    }
    const loadGPUsToProducts = () => {
        cleanShelf();
        let shelf = document.getElementsByClassName('products')[0];
        for (let i = 0; i < GPUs.length; i++){
            GPUs[i].Specs = "<ul>" + GPUs[i].Specs.replace('[', '').replace(']', '').replace(/,/g, '') + "</ul>";
            shelf.innerHTML += `
                <div class="grid">
                    <img src="${GPUs[i].Picture}" alt="GPUs">
                    <div class="product-info">
                        <p class="product-name">${GPUs[i].Name}</p>
                        <p class="product-price">${priceParser(GPUs[i].Price)}</p>
                        <div class="product-specs">${GPUs[i].Specs}</div>
                        <a href="${GPUs[i].Link}"><button class="product-description">View More</button></a>
                        <div class="category">GPU</div>
                    </div>
                </div>
                `
        }
        addExpandableFunctions();
        btnAddToCart();
    }
    const loadRAMToProducts = () => {
        cleanShelf();
        let shelf = document.getElementsByClassName('products')[0];
        for (let i = 0; i < RAMs.length; i++){
            RAMs[i].Specs = "<ul>" + RAMs[i].Specs.replace('[', '').replace(']', '').replace(/,/g, '') + "</ul>";
            shelf.innerHTML += `
                <div class="grid">
                    <img src="${RAMs[i].Picture}" alt="RAMs">
                    <div class="product-info">
                        <p class="product-name">${RAMs[i].Name}</p>
                        <p class="product-price">${priceParser(RAMs[i].Price)}</p>
                        <div class="product-specs">${RAMs[i].Specs}</div>
                        <a href="${RAMs[i].Link}"><button class="product-description">View More</button></a>
                        <div class="category">RAM</div>
                    </div>
                </div>
                `
        }
        addExpandableFunctions();
        btnAddToCart();
    }
    const loadStorageToProducts = () => {
        cleanShelf();
        let shelf = document.getElementsByClassName('products')[0];
        for (let i = 0; i < Storages.length; i++){
            Storages[i].Specs = "<ul>" + Storages[i].Specs.replace('[', '').replace(']', '').replace(/,/g, '') + "</ul>";
            shelf.innerHTML += `
                <div class="grid">
                    <img src="${Storages[i].Picture}" alt="Storages">
                    <div class="product-info">
                        <p class="product-name">${Storages[i].Name}</p>
                        <p class="product-price">${priceParser(Storages[i].Price)}</p>
                        <div class="product-specs">${Storages[i].Specs}</div>
                        <a href="${Storages[i].Link}"><button class="product-description">View More</button></a>
                        <div class="category">Storage</div>
                    </div>
                </div>
                `
        }
        addExpandableFunctions();
        btnAddToCart();
    }
    const loadMotherboardToProducts = () => {
        cleanShelf();
        let shelf = document.getElementsByClassName('products')[0];
        for (let i = 0; i < Motherboards.length; i++){
            Motherboards[i].Specs = "<ul>" + Motherboards[i].Specs.replace('[', '').replace(']', '').replace(/,/g, '') + "</ul>";
            shelf.innerHTML += `
                <div class="grid">
                    <img src="${Motherboards[i].Picture}" alt="Motherboards">
                    <div class="product-info">
                        <p class="product-name">${Motherboards[i].Name}</p>
                        <p class="product-price">${priceParser(Motherboards[i].Price)}</p>
                        <div class="product-specs">${Motherboards[i].Specs}</div>
                        <a href="${Motherboards[i].Link}"><button class="product-description">View More</button></a>
                        <div class="category">Motherboard</div>
                    </div>
                </div>
                `
        }
        addExpandableFunctions();
        btnAddToCart();
    }
    const loadPowerSupplyToProducts = () => {
        cleanShelf();
        let shelf = document.getElementsByClassName('products')[0];
        for (let i = 0; i < PowerSupplies.length; i++){
            PowerSupplies[i].Specs = "<ul>" + PowerSupplies[i].Specs.replace('[', '').replace(']', '').replace(/,/g, '') + "</ul>";
            shelf.innerHTML += `
                <div class="grid">
                    <img src="${PowerSupplies[i].Picture}" alt="PowerSupplies">
                    <div class="product-info">
                        <p class="product-name">${PowerSupplies[i].Name}</p>
                        <p class="product-price">${priceParser(PowerSupplies[i].Price)}</p>
                        <div class="product-specs">${PowerSupplies[i].Specs}</div>
                        <a href="${PowerSupplies[i].Link}"><button class="product-description">View More</button></a>
                        <div class="category">Power Supply</div>
                    </div>
                </div>
                `
        }
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
    // const addExpandableFunctions = () => {
    //     //when one expands, all others collapse
    //     let grids = document.getElementsByClassName('grid');
    //     for (let i = 0; i < grids.length; i++){
    //         grids[i].addEventListener('click', () => {
    //             for (let j = 0; j < grids.length; j++){
    //                 grids[j].classList.remove('expand');
    //             }
    //             grids[i].classList.toggle('expand');
    //         })
    //     }
    // } 
    // // click outside of grid, remove grid expand, else do nothing
    // document.addEventListener('click', (e) => {
    //     let grids = document.getElementsByClassName('grid');
    //     for (let i = 0; i < grids.length; i++){
    //         if (grids[i].classList.contains('expand') && !grids[i].contains(e.target)){
    //             grids[i].classList.remove('expand');
    //         }
    //     }
    // })

    // each row there are 4 grids, now click on one grid, it will expand all the grids in the same row
    const addExpandableFunctions = () => {
        let grids = document.getElementsByClassName('grid');
        for (let i = 0; i < grids.length; i++){
            grids[i].addEventListener('click', () => {
                // if the grid is already expanded, then do nothing
                if (grids[i].classList.contains('expand')){
                    return;
                }
                let row = Math.floor(i / 4);
                for (let j = 0; j < 4; j++){
                    grids[row * 4 + j].classList.toggle('expand');
                }
                //for the grids not in the same row, remove the expand class
                for (let k = 0; k < grids.length; k++){
                    if (Math.floor(k / 4) !== row){
                        grids[k].classList.remove('expand');
                    }
                }
            })
        }
    }

    function priceParser(price){
        // price looks like "$229.99&nbsp;–", "$159.99&nbsp;(15 Offers)–", make it $229.99, $159.99
        return price.split('&nbsp')[0];
    }

    const toast = (message) => {
        let toast = document.getElementById('toast');
        toast.innerHTML = message;
        toast.classList.add('show');
        // add a button in toast that can close the toast
        toast.innerHTML += `<button class="close-toast">X</button>`;
        let closeToast = document.getElementsByClassName('close-toast')[0];
        closeToast.addEventListener('click', () => {
            toast.classList.remove('show');
        }
        )
    }

    const checkWhatsLeft = () => {
        /* check if anything is missing from current cart: CPU, 
        GPU, RAM, Motherboard, Storage, Case, Power Supply, Accessories */
        let CPUInCart = false;
        let GPUInCart = false;
        let RAMInCart = false;
        let MotherboardInCart = false;
        let StorageInCart = false;
        let CaseInCart = false;
        let PowerSupplyInCart = false;
        let AccessoriesInCart = false;
        let cart = JSON.parse(localStorage.getItem('cart'));
        for (let i = 0; i < cart.length; i++){
            if (cart[i].category === 'CPU'){
                CPUInCart = true;
            }
            if (cart[i].category === 'GPU'){
                GPUInCart = true;
            }
            if (cart[i].category === 'RAM'){
                RAMInCart = true;
            }
            if (cart[i].category === 'Motherboard'){
                MotherboardInCart = true;
            }
            if (cart[i].category === 'Storage'){
                StorageInCart = true;
            }
            if (cart[i].category === 'Case'){
                CaseInCart = true;
            }
            if (cart[i].category === 'Power Supply'){
                PowerSupplyInCart = true;
            }
            if (cart[i].category === 'Accessories'){
                AccessoriesInCart = true;
            }
        }
        let toastString = "";
        if (!CPUInCart){
            toastString += "CPU";
        }
        if (!GPUInCart){
            toastString += " GPU";
        }
        if (!RAMInCart){
            toastString += " RAM";
        }
        if (!MotherboardInCart){
            toastString += " Motherboard";
        }
        if (!StorageInCart){
            toastString += " Storage";
        }
        if (!CaseInCart){
            toastString += " Case";
        }
        if (!PowerSupplyInCart){
            toastString += " Power Supply";
        }
        if (toastString !== ""){
            toast("You are still missing: " + toastString);
        }else{
            toast("You are all set!");
            if (AccessoriesInCart){
                toast("Want some accessories?");
            }
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
                let specs = product.getElementsByClassName('product-specs')[0].innerHTML;
                let category = document.getElementsByClassName('category')[0].innerHTML;
                // generate a random id for each product
                let id = Math.floor(Math.random() * 100000000);
                setCartItems( arr => [...arr, {name, price, image, id, specs, category}]);
                //toast('Added to Cart');
                checkWhatsLeft();
            }
            product.appendChild(btn);
        }
    }

    // call btnAddAllToCart() only once when page loads
    useEffect(() => {
        function helperAddAllToCart(theJson, i){
            let name = theJson.Name;
            let price = theJson.Price;
            let image = theJson.Picture;
            let specs = theJson.Specs;
            // switch for category
            let category = "";
            switch (i){
                case 0:
                    category = "CPU";
                    break;
                case 1:
                    category = "GPU";
                    break;
                case 2:
                    category = "RAM";
                    break;
                case 3:
                    category = "Motherboard";
                    break;
                case 4:
                    category = "Storage";
                    break;
                case 5:
                    category = "Case";
                    break;
                case 6:
                    category = "Power Supply";
                    break;
                case 7:
                    category = "Cooling";
                    break;
            }
            let id = Math.floor(Math.random() * 100000000);
            setCartItems( arr => [...arr, {name, price, image, id, specs, category}]);
        }
        const btnAddAllToCart = () => {
            // for all button className=".addAllToCart", add onclick event listener
            let addAllToCart = document.getElementsByClassName('.addAllToCart');
            let components = document.getElementsByClassName('featured-product-components');
            for (let i = 0; i < addAllToCart.length; i++){
                addAllToCart[i].classList.add('clicked');
                addAllToCart[i].addEventListener('click', () => {
                    // make sure this function is only called once per click
                    if (addAllToCart[i].classList.contains('clicked')){
                        console.log(i);
                        // get all compoents from components[i]
                        let CPUcomponent = components[i].getElementsByClassName('featured-product-CPU')[0];
                        let GPUcomponent = components[i].getElementsByClassName('featured-product-GPU')[0];
                        let RAMcomponent = components[i].getElementsByClassName('featured-product-RAM')[0];
                        let Motherboardcomponent = components[i].getElementsByClassName('featured-product-Motherboard')[0];
                        let Storagecomponent = components[i].getElementsByClassName('featured-product-Storage')[0];
                        let Casecomponent = components[i].getElementsByClassName('featured-product-Case')[0];
                        let PowerSupplycomponent = components[i].getElementsByClassName('featured-product-PowerSupply')[0];
                        let Coolingcomponent = components[i].getElementsByClassName('featured-product-Cooling')[0];
    
                        // take innerText of each component, translate to json
                        let CPUJSON = JSON.parse("{"+CPUcomponent.innerText+"}");
                        let GPUJSON = JSON.parse("{"+GPUcomponent.innerText+"}");
                        let RAMJSON = JSON.parse("{"+RAMcomponent.innerText+"}");
                        let MotherboardJSON = JSON.parse("{"+Motherboardcomponent.innerText+"}");
                        let StorageJSON = JSON.parse("{"+Storagecomponent.innerText+"}");
                        let CaseJSON = JSON.parse("{"+Casecomponent.innerText+"}");
                        let PowerSupplyJSON = JSON.parse("{"+PowerSupplycomponent.innerText+"}");
                        let CoolingJSON = JSON.parse("{"+Coolingcomponent.innerText+"}");
    
                        let jsonList = [CPUJSON, GPUJSON, RAMJSON, MotherboardJSON, StorageJSON, CaseJSON, PowerSupplyJSON, CoolingJSON];
                        for (let j = 0; j < jsonList.length; j++){
                            helperAddAllToCart(jsonList[j], j);
                        }
    
    
    
                        toast('All items added to Cart');
                        // remove clicked class from button
                        addAllToCart[i].classList.remove('clicked');
                    }
                })
            }
        }
        btnAddAllToCart();
    }, [])

    // update the cart items
    useEffect(() => {
        if(cartItems.length!==0) localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);
    useEffect(() => {
        if(localStorage.getItem('cart')!==null){
            let cart = JSON.parse(localStorage.getItem('cart'));
            setCartItems(cart);
        }
    }, []);





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
                <div id="toast"></div>
                <div className='products four-by-four-grids'>
                    <div className='introduction-in-store'>
                        <h1>Welcome to our store <img src={logo} alt="logo"></img></h1>
                        <div className="featured">
                            <h2>Featured Products</h2>
                            <p>For people new to building PC, you can select a prebuilt and modify it</p>
                            <div className="featured-products">
                                <div className="featured-product">
                                    <h3>Budget Build</h3>
                                    <div>
                                        <p> Total: 531.88</p>
                                        <button className=".addAllToCart">Add to Cart</button>
                                    </div>
                                    <p>For people who with limited budget</p>
                                    <ul>
                                        <li>CPU : AMD Ryzen 5 4600G</li>
                                        <li>CPU Cooler: JONSBO CR1000 GT CPU Cooler</li>
                                        <li>GPU : RX580 8G 2048SP 256-Bit GDDR5</li>
                                        <li>RAM : Neo Forza FAYE 16GB (2x8GB)</li>
                                        <li>Motherboard : MSI MPG Z590 GAMING FORCE LGA 1200 Intel Z590</li>
                                        <li>Storage : KingSpec SSD Internal Solid State Drive 128GB M.2 NVMe</li>
                                        <li>Case : Rosewill SPECTRA D100 ATX Mid Tower Gaming Case</li>
                                        <li>Power Supply : Rosewill CFZ Series, CFZ500, 500W, Semi-Modular Power Supply</li>
                                    </ul>
                                    <div className="featured-product-components">
                                        <div className="featured-product-CPU">
                                        "Name": "AMD Ryzen 5 4600G - Ryzen 5 4000 G-Series Renoir (Zen 2) 6-Core 3.7 GHz Socket AM4 65W AMD Radeon Graphics Desktop Processor - 100-100000147BOX",
        "Price": "$103.95\u00a0(7 Offers)\u2013",
        "Link": "https://www.newegg.com/amd-ryzen-5-4600g-ryzen-5-4000-g-series/p/N82E16819113744?Description=CPU&cm_re=CPU-_-19-113-744-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/19-113-744-V01.jpg",
        "Specs": "[<li>7nm Renoir (Zen 2) 65W \n</li>, <li>8MB L3 Cache \n</li>, <li>3MB L2 Cache \n</li>, <li>AMD Radeon Graphics</li>]"
                                        </div>
                                        <div className="featured-product-Cooling">
                                        "Name": "JONSBO CR1000 GT CPU Cooler , 5V Addressable RGB Computer Air Cooler CPU Heatsink,H:158mm, 4 Copper Heatpipes AM4/AM5 /Intel LGA1700/115X,120mm PWM Fan with Detachable Fan blade, Lighting Top, Black",
        "Price": "$29.99\u00a0\u2013",
        "Link": "https://www.newegg.com/jonsbo-cr1000-gt-air-cooler-series/p/2RM-00A4-00008?Item=9SIAY3SESB0154&Description=CPU Cooler&cm_re=CPU_Cooler-_-9SIAY3SESB0154-_-Product&cm_sp=SP-_-1012295-_-0-_-1-_-9SIAY3SESB0154-_-CPU Cooler-_-cooler|cpu-_-1",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/AY3SS220310kMOoJ.jpg",
        "Specs": "[<li>[4 Copper Heat Pipe Tower Radiator ]  4 pcs of  \u00d86MM vacuum heat pipes were combined with 44 pcs of radiating fins by the Insert FIN process, brings a good balance between cooling efficiency and price.</li>, <li>[CPU Cooler size ]  158 x 128 x76mm</li>, <li>[5V 3Pin Rainbow ARGB ]  Be made of the Grille type Rainbow RGB and acrylic lighting material, the RGB system of this RGB CPU Cooler can synchronize with the PCB of the PC. And it can achieve various of lighting modes, such as colorful, breathing, monochrome and audio linkage. 16 million lighting effects can be totally provided.</li>, <li>[120mm PWM Speed controlled Color Fan ]  Effectiveness and quiet can be easily faced,Colored lights work with soft light blades to find different beauty</li>, <li>[Top Luminous Design ]  Design of luminous nameplate at the top of cooling tower</li>, <li>[ Platform Support ]   Intel LGA1700/1200/1150/1151/1155/1156, AMD AM2/AM2+/AM3/AM3+/AM4/AM5/FM1/FM2/FM2+</li>]"
                                        </div>
                                        <div className="featured-product-GPU">
                                        "Name": "RX580 8G 2048SP 256-Bit GDDR5 PCI Express 3.0 x16 DirectX 12 Gaming Video Card Gaming GPU",
        "Price": "$134.99\u00a0\u2013",
        "Link": "https://www.newegg.com/p/27N-008E-00005?Item=9SIB601J6Z3595&Description=GPU&cm_re=GPU-_-9SIB601J6Z3595-_-Product&cm_sp=SP-_-1378669-_-0-_-2-_-9SIB601J6Z3595-_-GPU-_-gpu-_-1",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/B601S2209240Q9ZVGBE.jpg",
        "Specs": "[<li>8GB 256-Bit GDDR5</li>, <li>Chipset: AMD Radeon RX 580 (2048SP)</li>, <li>Boost / Base Core Clock: 1284MHz</li>, <li>Memory Interface: 256-bit; Bus: PCI-Express 3.0</li>, <li>Recommended psu is 550 watts.</li>, <li>Directx version support is 12.</li>]"
                                        </div>
                                        <div className="featured-product-RAM">
                                        "Name": "Neo Forza FAYE 16GB (2x8GB) 288-Pin DDR4 3200 (PC4 25600) SDRAM Desktop Memory Model NMUD480E82-3200DG20",
        "Price": "$42.99\u00a0\u2013",
        "Link": "https://www.newegg.com/neo-forza-16gb-288-pin-ddr4-sdram/p/0RN-0097-00019?Description=RAM&cm_re=RAM-_-9SIAC0ECPE6383-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/AC0ES211102cbIfT.jpg",
        "Specs": "[<li>DDR4 3200 (PC4 25600)</li>, <li>Timing 16-18-18-36</li>, <li>CAS Latency 16</li>, <li>Voltage 1.35V</li>, <li>LifeTime Warranty (Purchase on NewEgg, with manufacturer involvement)</li>, <li>See product gallery for your free or discounted Steam keycode of Kukoos - The Lost Pets</li>]"
                                        </div>
                                        <div className="featured-product-Motherboard">
                                        "Name": "MSI MPG Z590 GAMING FORCE LGA 1200 Intel Z590 SATA 6Gb/s ATX Intel Motherboard",
        "Price": "$109.99\u00a0(6 Offers)\u2013",
        "Link": "https://www.newegg.com/p/N82E16813144386?Description=Motherboard&cm_re=Motherboard-_-13-144-386-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/13-144-386-05.jpg",
        "Specs": "[<li>Intel Z590 \n</li>, <li>Supports 11th / 10th Gen Intel Core processors</li>, <li>Supports Intel Pentium Gold / Celeron processors \n</li>, <li>DDR4 1R 3200 / 2933 / 2666 / 2133 for 11th Gen Intel CPU (by JEDEC &amp; POR)</li>, <li>DDR4 1R 2933 / 2666 / 2133 for 10th Gen Intel CPU (by JEDEC &amp; POR)</li>, <li>Max overclocking frequency:</li>, <li>1DPC 1R Max speed up to 5333</li>, <li>1DPC 2R Max speed up to 4700+</li>, <li>2DPC 1R Max speed up to 4400+</li>, <li>2DPC 2R Max speed up to 4000+</li>]"
                                        </div>
                                        <div className="featured-product-Storage">
                                        "Name": "KingSpec SSD Internal Solid State Drive 128GB M.2 NVMe 2280 PCIe Computer Disk Data Storage NAND Flash Hard Drives PC Desktop Laptop Ultrabook Upgrade for CoRe Ryzen Motherboard",
        "Price": "$19.99\u00a0\u2013",
        "Link": "https://www.newegg.com/kingspec-128gb/p/0D9-000D-00150?Item=9SIB1V8HP68400&Description=Storage&cm_re=Storage-_-9SIB1V8HP68400-_-Product&cm_sp=SP-_-1316771-_-0-_-2-_-9SIB1V8HP68400-_-Storage-_-storage-_-1",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/B1V8S2205060GIT9Q4B.jpg",
        "Specs": "[<li>KingSpec NVMe SSD is one of ideal data storage solution for desktop and laptop.M.2 SSD NMVe SSD dramatically improves your PC's performance and speeds up the loading of your applications.Internal Solid State Drive Enhance your work efficiency and enrich your gaming pleasure. </li>, <li>Kingspec M.2 NVMe PCIe SSD , Powered by KingSpec NAND Flash technology and upgraded with the ultimate performance.It makes this internal SSD have better stability and reliability.</li>, <li>KingSpec's advanced heat spreader design on the NVMe Solid State Drive enable superior heat dissipation.KingSpec M.2 NVMe PCIe SSD speeds of up to 3000MB/S sequential read and up to 2000MB/S sequential write.</li>, <li>SSD internal hard drive offers up to 5x the speed of SATA SSD.Whether you're working, gaming casually, or crunching large amounts of data, you can do more and faster with this powerful M. 2 PCIe SS high speed.</li>, <li>Warranty: 3-year or TBW limited warranty.Technical Support and Customer Service on KingSpec  official website.</li>]"
                                        </div>
                                        <div className="featured-product-Case">
                                        "Name": "Rosewill SPECTRA D100 ATX Mid Tower Gaming Case With Tempered Glass Side Panel",
        "Price": "$49.99\u00a0\u2013",
        "Link": "https://www.newegg.com/p/N82E16811147308",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/11-147-308-V01.jpg",
        "Specs": "[<li>Tempered Glass Side Panel\n</li>, <li>Top-Mounted I/O Ports: USB 3.0 x 2 + USB 2.0 x 1\n</li>, <li>Pre-installed 4 RGB LED Ring Fans\n</li>, <li>Supports up to 6 Fans\n</li>, <li>Supports up to 350 mm Long VGA Card\n</li>, <li>Supports up to 170 mm High CPU Cooler\n</li>, <li>Supports up to 360 mm Long Liquid-cooling Radiator in the Front, and 240 mm long Liquid-cooling Radiator on the Top</li>]"
                                        </div>
                                        <div className="featured-product-PowerSupply">
                                        "Name": "Rosewill CFZ Series, CFZ500, 500W, Semi-Modular Power Supply, 80 PLUS BRONZE Certified, Auto Fan Speed Control, SLI & CrossFire Ready, Black",
        "Price": "$39.99\u00a0(2 Offers)\u2013",
        "Link": "https://www.newegg.com/rosewill-pmg-series-pmg-1200-1200w/p/N82E16817182428?Description=Power Supply&cm_re=Power_Supply-_-17-182-428-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/17-182-428-V81.jpg",
        "Specs": "[<li>80 PLUS Bronze certified and delivers up to 85% efficient performance under typical loads. Allows your PC to save energy, stay cooler, have quieter fans, and prolongs the lifespan of your PSU. Ideal for gaming PCs.\n</li>, <li>A semi-modular PSU design comes with only the essential cables pre-attached. This allows for some customization of additional cables, plus reduced clutter and better airflow compared to non-modular PSUs within your computer case or system.\n</li>, <li>Single rail with overcurrent protection to protect against overheating or fires. Enjoy your gaming sessions with peace of mind.\n</li>, <li>4th Gen ready, Crossfire ready, SLI ready</li>]"
                                        </div>
                                    </div>
                                </div>
                                <div className="featured-product">
                                    <h3>Intro Build</h3>
                                    <div>
                                        <p> Total: 944.93</p>
                                        <button className=".addAllToCart">Add to Cart</button>
                                    </div>
                                    <p>For people who are just into PC building world</p>
                                    <ul>
                                        <li>CPU : Intel Core i5-12400</li>
                                        <li>CPU Cooler: JONSBO HX7280 TDP280W Performance CPU Cooler</li>
                                        <li>GPU : GIGABYTE GeForce RTX 3050</li>
                                        <li>RAM : Neo Forza FAYE 16GB (2x8GB)</li>
                                        <li>Motherboard : ASUS ROG STRIX Z590-E GAMING WIFI LGA 1200 Intel Z590</li>
                                        <li>Storage : Silicon Power 1TB NVMe PCIe Gen3 x4 M.2</li>
                                        <li>Case : Rosewill SPECTRA D100 ATX Mid Tower Gaming Case</li>
                                        <li>Power Supply : Rosewill HIVE Series, HIVE-550S, 550W Fully Modular Power Supply</li>
                                    </ul>
                                    <div className="featured-product-components">
                                        <div className="featured-product-CPU">
                                        "Name": "Intel Core i5-12400 - Core i5 12th Gen Alder Lake 6-Core 2.5 GHz LGA 1700 65W Intel UHD Graphics 730 Desktop Processor - BX8071512400",
        "Price": "$185.99\u00a0(18 Offers)\u2013",
        "Link": "https://www.newegg.com/intel-core-i5-12400f-core-i5-12th-gen/p/N82E16819118358?Description=CPU&cm_re=CPU-_-19-118-358-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/19-118-358-S02.jpg",
        "Specs": "[<li>Intel 7 Alder Lake Processor Base Power: 65W\n</li>, <li>Maximum Turbo Power: 117W \n</li>, <li>18MB L3 Cache \n</li>, <li>7.5MB L2 Cache \n</li>, <li>Intel UHD Graphics 730 \n</li>, <li>Windows 11 Supported\n</li>, <li>Intel Laminar RM1 CPU Cooler</li>]"
                                        </div>
                                        <div className="featured-product-Cooling">
                                        "Name": "JONSBO HX7280 TDP280W Performance CPU Cooler, 7 Copper Heatpipes Twin Tower Radiator,H:160MM, 2+1 Fans, LGA1700 Support, FDB Dynamic Hydraulic Bearing,Standard 1g German Silicone Grease, Black",
        "Price": "$78.99\u00a0\u2013",
        "Link": "https://www.newegg.com/jonsbo-hx7280-air-cooler-series/p/13C-005F-00072?Item=9SIAY3SFJN5781&Description=CPU Cooler&cm_re=CPU_Cooler-_-9SIAY3SFJN5781-_-Product&cm_sp=SP-_-1012275-_-0-_-0-_-9SIAY3SFJN5781-_-CPU Cooler-_-cooler|cpu-_-6",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/AY3SS220113lKbjk.jpg",
        "Specs": "[<li>JONSBO HX7280 TDP280W Performance CPU Cooler</li>, <li>[ 7 Heatpipes ] 7 Copper Heat Pipe Twin Towers with 56 layers of high density fins, Strong antipyretic with 7459 c?  large cooling area.</li>, <li>[ FDB Dynamic Hydraulic Bearing] Lower shaft noise and longer service life,5-year Warranty</li>, <li>[2+1 Fan ] Fans : 140mm x2 +120mm x1 ,They can be combined according to the memory height and heat dissipation requirements.</li>, <li>[Tower Body Blackening Treatment ] </li>, <li>[ Fin Bidirectional Memory Avoidance Design ]</li>, <li>[ Compatible with INTEL AMD HEDT High-End Hardware Platform ]</li>, <li>[ Win-win co-operation ] Standard 1g German Thermal Grizzly Hydronau  silicone grease</li>, <li>[ All Metal Clasp]</li>, <li>[ Size ] Product L140x W155 x H160mm , Heatsink Group L140x W127 x H160mm </li>, <li>[ CPU Compatibility ] Intel: LGA 115X/1200/2011/2066 / LGA1700     </li>, <li>                                      AMD : AM4</li>]"
                                        </div>
                                        <div className="featured-product-GPU">
                                        "Name": "GIGABYTE GeForce RTX 3050 GAMING OC 8G Graphics Card, 3x WINDFORCE Fans, 8GB GDDR6 128-bit GDDR6, GV-N3050GAMING OC-8GD Video Card",
        "Price": "$319.00\u00a0(8 Offers)\u2013",
        "Link": "https://www.newegg.com/gigabyte-geforce-rtx-3050-gv-n3050gaming-oc-8gd/p/N82E16814932496?Description=GPU&cm_re=GPU-_-14-932-496-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/14-932-496-S01.jpg",
        "Specs": "[<li>NVIDIA Ampere Streaming Multiprocessors\n</li>, <li>2nd Generation RT Cores\n</li>, <li>3rd Generation Tensor Cores\n</li>, <li>Powered by GeForce RTX 3050\n</li>, <li>Integrated with 8GB GDDR6 128-bit memory interface\n</li>, <li>WINDFORCE 3X Cooling System with alternate spinning fans\n</li>, <li>RGB Fusion 2.0\n</li>, <li>Protective back plate\n</li>, <li>2x HDMI 2.1, 2x Display Port 1.4a</li>]"
                                        </div>
                                        <div className="featured-product-RAM">
                                        "Name": "Neo Forza FAYE 16GB (2x8GB) 288-Pin DDR4 3200 (PC4 25600) SDRAM Desktop Memory Model NMUD480E82-3200DG20",
        "Price": "$42.99\u00a0\u2013",
        "Link": "https://www.newegg.com/neo-forza-16gb-288-pin-ddr4-sdram/p/0RN-0097-00019?Description=RAM&cm_re=RAM-_-9SIAC0ECPE6383-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/AC0ES211102cbIfT.jpg",
        "Specs": "[<li>DDR4 3200 (PC4 25600)</li>, <li>Timing 16-18-18-36</li>, <li>CAS Latency 16</li>, <li>Voltage 1.35V</li>, <li>LifeTime Warranty (Purchase on NewEgg, with manufacturer involvement)</li>, <li>See product gallery for your free or discounted Steam keycode of Kukoos - The Lost Pets</li>]"
                                        </div>
                                        <div className="featured-product-Motherboard">
                                        "Name": "ASUS ROG STRIX Z590-E GAMING WIFI LGA 1200 Intel Z590 SATA 6Gb/s ATX Intel Motherboard",
        "Price": "$169.99\u00a0(8 Offers)\u2013",
        "Link": "https://www.newegg.com/asus-rog-strix-z590-e-gaming-wifi/p/N82E16813119367?Description=Motherboard&cm_re=Motherboard-_-13-119-367-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/13-119-367-08.jpg",
        "Specs": "[<li>Intel LGA 1200 socket: Designed to unleash the maximum performance of 11th Gen Intel Core processors \n</li>, <li>AI Motherboard: AI Overclocking, AI cooling, AI networking and AI noise cancelation\n</li>, <li>Robust Power Solution: 14+2 power stages with ProCool II power connector, high-quality alloy chokes and durable capacitors to support multi-core processors\n</li>, <li>Optimized Thermal Design: VRM and aluminum I/O heatsink, L-shaped heatpipe, four onboard M.2 heatsinks and an M.2 backplate for the PCIe 4.0 M.2 slot\n</li>, <li>High-performance Gaming Networking: On-board Intel WiFi 6E AX210 and dual Intel 2.5Gb Ethernet with ASUS LANGuard\n</li>, <li>Best Gaming Connectivity: Supports HDMI 2.0 and DisplayPort 1.4 output, and featuring quad M.2 and USB 3.2 Gen 2 Type-A and Type-C connectors\n</li>, <li>Industry-leading Gaming Audio: High fidelity audio with ALC4080 with Savitech SV3H712 amplifier, along with DTS Sound Unbound and Sonic Studio III</li>]"
                                        </div>
                                        <div className="featured-product-Storage">
                                        "Name": "Silicon Power 1TB NVMe PCIe Gen3 x4 M.2 2280 TLC SSD (SP001TBP34A60M28)",
        "Price": "$51.99\u00a0(3 Offers)\u2013",
        "Link": "https://www.newegg.com/silicon-power-p34a60-1tb/p/N82E16820301428?Description=Storage&cm_re=Storage-_-20-301-428-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/20-301-428-03.jpg",
        "Specs": "[<li>PCIe Gen 3x4 interface</li>, <li>LDPC (Low-Density Parity Check) error correction code (ECC) technology, End-To-End (E2E) data protection, and RAID engine for enhanced data integrity and stability</li>, <li>Supports NVMe 1.3, Host Memory Buffer (HMB), and SLC Cache to deliver high and efficient performance</li>, <li>Small form factor M.2 2280 (80mm) allows for easy installation in laptops, small form factor PC systems, and some ultrabooks</li>, <li>Compatible devices: Desktop</li>, <li>The warranty terms on all of its SSDs are based on whether the warranty length or TBW limit occurs first</li>]"
                                        </div>
                                        <div className="featured-product-Case">
                                        "Name": "Rosewill SPECTRA D100 ATX Mid Tower Gaming Case With Tempered Glass Side Panel",
        "Price": "$49.99\u00a0\u2013",
        "Link": "https://www.newegg.com/p/N82E16811147308",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/11-147-308-V01.jpg",
        "Specs": "[<li>Tempered Glass Side Panel\n</li>, <li>Top-Mounted I/O Ports: USB 3.0 x 2 + USB 2.0 x 1\n</li>, <li>Pre-installed 4 RGB LED Ring Fans\n</li>, <li>Supports up to 6 Fans\n</li>, <li>Supports up to 350 mm Long VGA Card\n</li>, <li>Supports up to 170 mm High CPU Cooler\n</li>, <li>Supports up to 360 mm Long Liquid-cooling Radiator in the Front, and 240 mm long Liquid-cooling Radiator on the Top</li>]"
                                        </div>
                                        <div className="featured-product-PowerSupply">
                                        "Name": "Rosewill HIVE Series, HIVE-550S, 550W Fully Modular Power Supply, 80 PLUS BRONZE Certified, Single +12V Rail, SLI & CrossFire Ready, Black",
        "Price": "$45.99\u00a0(2 Offers)\u2013",
        "Link": "https://www.newegg.com/rosewill-hive-series-hive-550-550w/p/N82E16817182131?Description=Power Supply&cm_re=Power_Supply-_-17-182-131-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/17-182-131-V81.jpg",
        "Specs": "[<li>550 Watt Power Supply\n</li>, <li>ATX12V v2.31 / EPS 12V v2.92 100 - 240V 50 / 60 Hz\n</li>, <li>SLI Ready / CrossFire Ready / Intel 4th Gen CPU Certified\n</li>, <li>80 PLUS BRONZE Certified \n</li>, <li>Full Modular Design\n</li>, <li>Silent 135 mm Fan\n</li>, <li>Strong Single +12V Rail</li>]"
                                        </div>
                                    </div>
                                </div>
                                <div className="featured-product">
                                    <h3>Median Build</h3>
                                    <div>
                                        <p> Total: 1510.93</p>
                                        <button className=".addAllToCart">Add to Cart</button>
                                    </div>
                                    <p>For people who are into PC world with some money</p>
                                    <ul>
                                        <li>CPU : AMD Ryzen 5 7600X</li>
                                        <li>CPU Cooler: ASUS ROG Strix LC II 240 All-in-one AIO Liquid CPU Cooler 240mm Radiator</li>
                                        <li>GPU : ZOTAC GAMING GeForce RTX 3060 Ti</li>
                                        <li>RAM : v-color Manta XSky DDR5 32GB (16GBx2) 6000MHz</li>
                                        <li>Motherboard : ASUS ROG STRIX Z590-E GAMING WIFI LGA 1200 Intel Z590</li>
                                        <li>Storage : Silicon Power 1TB NVMe PCIe Gen3 x4 M.2</li>
                                        <li>Case : Fractal Design Meshify C White - White Steel</li>
                                        <li>Power Supply : Super Flower Leadex III ARGB 850W</li>
                                    </ul>
                                    <div className="featured-product-components">
                                        <div className="featured-product-CPU">
                                        
        "Name": "AMD Ryzen 5 7600X - 6-Core 4.7 GHz - Socket AM5 - 105W Desktop Processor (100-100000593WOF)",
        "Price": "$249.00\u00a0(17 Offers)\u2013",
        "Link": "https://www.newegg.com/amd-ryzen-5-7600x-ryzen-5-7000-series/p/N82E16819113770?Description=CPU&cm_re=CPU-_-19-113-770-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/19-113-770-S01.jpg",
        "Specs": "[<li>5nm 105W \n</li>, <li>32MB L3 Cache \n</li>, <li>Windows 11 Supported\n</li>, <li>Cooling Device not Included - Processor Only</li>]"
    
                                        </div>
                                        <div className="featured-product-Cooling">
                                        "Name": "ASUS ROG Strix LC II 240 All-in-one AIO Liquid CPU Cooler 240mm Radiator, Intel LGA1700, 115x/2066 and AMD AM4/TR4 Support, 2x120mm 4-pin PWM Fans",
        "Price": "$159.99\u00a0(8 Offers)\u2013",
        "Link": "https://www.newegg.com/asus-liquid-cooling-system/p/N82E16835101075?Description=CPU Cooler&cm_re=CPU_Cooler-_-35-101-075-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/35-101-075-V01.jpg",
        "Specs": "[<li>Seventh Gen Asetek pump delivers exceptional cooling and minimal noise with an operating range starting at 840 rpm\n</li>, <li>ROG-designed radiator fans for optimized airflow and static pressure\n</li>, <li>Individually addressable RGB and NCVM-coating pump over accentuates the sleep, modern aesthetics\n</li>, <li>Styled to complement ROG motherboard, at the center stage of your build\n</li>, <li>Reinforced, sleeved tubing for increased durability \n</li>, <li>CPU Socket Support: AMD: AM4, TR4 Intel: LGA 1700, 1200, 115x, 1366, 2011, 2011-3, 2066\n</li>, <li>Pair with ASUS Z690 Motherboards, designed with dual mounting holes compatible with both Intel LGA 1700 and LGA 1200 brackets</li>]"
                                        </div>
                                        <div className="featured-product-GPU">
                                        "Name": "ZOTAC GAMING GeForce RTX 3060 Ti AMP White Edition LHR 8GB GDDR6 PCI Express 4.0 ATX Video Card ZT-A30610F-10PLHR",
        "Price": "$409.99\u00a0\u2013",
        "Link": "https://www.newegg.com/zotac-geforce-rtx-3060-ti-zt-a30610f-10plhr/p/N82E16814500524?Description=GPU&cm_re=GPU-_-14-500-524-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/ADGES2110191pJA3.jpg",
        "Specs": "[<li>White Limited Edition</li>, <li>2nd Gen Ray Tracing Cores</li>, <li>3rd Gen Tensor Cores </li>, <li>White LED Lighting</li>, <li>IceStorm 2.0 Advanced Cooling</li>, <li>Active Fan Control with FREEZE Fan Stop</li>, <li>Metal Wraparound Backplate</li>, <li>FireStorm Utility</li>, <li>VR Ready</li>, <li>LHR 25 MH/s ETH hash rate (est.)</li>]"
                                        </div>
                                        <div className="featured-product-RAM">
                                        "Name": "v-color Manta XSky DDR5 32GB (16GBx2) 6000MHz (PC5-48000) CL36 Gaming Desktop Ram Memory Dual Rank 1.25V High End Jet Black Heatsink- Jet Black (TMXSL1660836KWK)",
        "Price": "$229.99\u00a0\u2013",
        "Link": "https://www.newegg.com/p/0RN-00MB-00099?Description=RAM&cm_re=RAM-_-9SIAMCMHCA4257-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/AMCMS220504IvEIG.jpg",
        "Specs": "[<li>Product Spec: 32GB(16GBx2) |DDR5 6000MHz(PC5- 48000) | Cas Latency(CL) 36-38-38-76 | 1.25V | Hynix IC</li>, <li>DDR5 MANTA Memory symbolizes v-colors breakthrough in the development of gaming memory for the next generation DDR5.</li>, <li>Advanced Tech of On-die ECC to detect and correct errors in DRAM cell for performance reliability.</li>, <li>RGB Light bar redesigned with advanced tech for ultra smooth and bright lighting, allowing users to create a symphony of colors.</li>, <li>Personalize and control the lighting the way you want through major motherboard brands RGB software</li>]"
                                        </div>
                                        <div className="featured-product-Motherboard">
                                        "Name": "ASUS ROG STRIX Z590-E GAMING WIFI LGA 1200 Intel Z590 SATA 6Gb/s ATX Intel Motherboard",
        "Price": "$169.99\u00a0(8 Offers)\u2013",
        "Link": "https://www.newegg.com/asus-rog-strix-z590-e-gaming-wifi/p/N82E16813119367?Description=Motherboard&cm_re=Motherboard-_-13-119-367-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/13-119-367-08.jpg",
        "Specs": "[<li>Intel LGA 1200 socket: Designed to unleash the maximum performance of 11th Gen Intel Core processors \n</li>, <li>AI Motherboard: AI Overclocking, AI cooling, AI networking and AI noise cancelation\n</li>, <li>Robust Power Solution: 14+2 power stages with ProCool II power connector, high-quality alloy chokes and durable capacitors to support multi-core processors\n</li>, <li>Optimized Thermal Design: VRM and aluminum I/O heatsink, L-shaped heatpipe, four onboard M.2 heatsinks and an M.2 backplate for the PCIe 4.0 M.2 slot\n</li>, <li>High-performance Gaming Networking: On-board Intel WiFi 6E AX210 and dual Intel 2.5Gb Ethernet with ASUS LANGuard\n</li>, <li>Best Gaming Connectivity: Supports HDMI 2.0 and DisplayPort 1.4 output, and featuring quad M.2 and USB 3.2 Gen 2 Type-A and Type-C connectors\n</li>, <li>Industry-leading Gaming Audio: High fidelity audio with ALC4080 with Savitech SV3H712 amplifier, along with DTS Sound Unbound and Sonic Studio III</li>]"
                                        </div>
                                        <div className="featured-product-Storage">
                                        "Name": "Silicon Power 1TB NVMe PCIe Gen3 x4 M.2 2280 TLC SSD (SP001TBP34A60M28)",
        "Price": "$51.99\u00a0(3 Offers)\u2013",
        "Link": "https://www.newegg.com/silicon-power-p34a60-1tb/p/N82E16820301428?Description=Storage&cm_re=Storage-_-20-301-428-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/20-301-428-03.jpg",
        "Specs": "[<li>PCIe Gen 3x4 interface</li>, <li>LDPC (Low-Density Parity Check) error correction code (ECC) technology, End-To-End (E2E) data protection, and RAID engine for enhanced data integrity and stability</li>, <li>Supports NVMe 1.3, Host Memory Buffer (HMB), and SLC Cache to deliver high and efficient performance</li>, <li>Small form factor M.2 2280 (80mm) allows for easy installation in laptops, small form factor PC systems, and some ultrabooks</li>, <li>Compatible devices: Desktop</li>, <li>The warranty terms on all of its SSDs are based on whether the warranty length or TBW limit occurs first</li>]"
                                        </div>
                                        <div className="featured-product-Case">
                                        "Name": "Fractal Design Meshify C White - White Steel / Tempered Glass ATX Mid Tower High-Airflow Compact Clear Tempered Glass Computer Case",
        "Price": "$99.99\u00a0(3 Offers)\u2013",
        "Link": "https://www.newegg.com/fractal-design-meshify-c-white-tg-atx-mid-tower/p/N82E16811352087",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/11-352-087-V01.jpg",
        "Specs": "[<li>Dark tinted tempered glass side panel</li>, <li>Streamlined high-airflow design</li>, <li>Distinctive new styling with sharp, stealthy aesthetic</li>, <li>Newly designed angular mesh front panel maximizes air intake</li>, <li>Performance and capacity of a full tower in a compact mid-tower size</li>, <li>Power supply shroud conceals drive cage and excess cabling</li>, <li>3 radiator positions with up to triple fan in front and dual fan up top</li>, <li>Fully adjustable and removable drive cage holds 2 x 3.5\"/2.5\" HDD/SSD</li>, <li>SSD plate behind motherboard tray supports up to 3 x 2.5\" drives</li>, <li>Easy-to-clean front-access removable filters on front, top and base</li>]"
                                        </div>
                                        <div className="featured-product-PowerSupply">
                                        "Name": "Super Flower Leadex III ARGB 850W 80+ Gold, 10 Years Warranty, Addressable LEDs With 5V Motherboard Sync/Analog Controlled, ECO Fanless & Silent Mode, Full Modular Power Supply, SF-850F14RG",
        "Price": "$139.99\u00a0\u2013",
        "Link": "https://www.newegg.com/Super-Flower-Leadex-III-ARGB-SF-850F14RG-750W/p/1HU-024C-00001?cm_sp=SH-_-960452-_-8-_-1-_-9SIAMNPAY15888-_-Power+Supply-_-power%7Csupply-_-2&Item=9SIAMNPAY15888",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/1HU-024C-00001-S02.jpg",
        "Specs": "[<li>ATX12V / EPS12V </li>, <li>Full Modular </li>, <li>80 PLUS GOLD Certified </li>, <li>10 Years Warranty</li>, <li>+3.3V@20A, +5V@20A, +12V@70.8A, -12V@0.5A, +5VSB@3A</li>]"
                                        </div>
                                    </div>
                                </div>
                                <div className="featured-product">
                                    <h3>Pro Build</h3>
                                    <div>
                                        <p> Total: 2658.90</p>
                                        <button className=".addAllToCart">Add to Cart</button>
                                    </div>
                                    <p>For people who are competitive PC builders</p>
                                    <ul>
                                        <li>CPU : AMD Ryzen 9 5950X</li>
                                        <li>CPU Cooler: CORSAIR iCUE H150i ELITE LCD Display Liquid CPU Cooler</li>
                                        <li>GPU : Yeston RTX 3080</li>
                                        <li>RAM : v-color Manta XSky DDR5 32GB (16GBx2)</li>
                                        <li>Motherboard : MSI PRO Z790-A WIFI LGA 1700 Intel</li>
                                        <li>Storage : SAMSUNG 980 PRO Heatsink M.2 2280 1TB</li>
                                        <li>Case : Corsair iCUE 5000X RGB Tempered Glass Mid-Tower ATX</li>
                                        <li>Power Supply : Super Flower Leadex Gold SE 1300W</li>
                                    </ul>
                                    <div className="featured-product-components">
                                        <div className="featured-product-CPU">
                                        "Name": "AMD Ryzen 9 5950X - Ryzen 9 5000 Series Vermeer (Zen 3) 16-Core 3.4 GHz Socket AM4 105W Desktop Processor - 100-100000059WOF",
        "Price": "$553.95\u00a0(13 Offers)\u2013",
        "Link": "https://www.newegg.com/amd-ryzen-9-5950x/p/N82E16819113663?Description=CPU&cm_re=CPU-_-19-113-663-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/19-113-663-V01.jpg",
        "Specs": "[<li>7nm Vermeer (Zen 3) 105W \n</li>, <li>64MB L3 Cache \n</li>, <li>8MB L2 Cache \n</li>, <li>Windows 11 Supported</li>]"
                                        </div>
                                        <div className="featured-product-Cooling">
                                        "Name": "CORSAIR iCUE H150i ELITE LCD Display Liquid CPU Cooler",
        "Price": "$239.99\u00a0(3 Offers)\u2013",
        "Link": "https://www.newegg.com/corsair-liquid-cooling-system-h150i-elite-lcd/p/N82E16835181265?Description=CPU Cooler&cm_re=CPU_Cooler-_-35-181-265-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/35-181-265-01.jpg",
        "Specs": "[<li>Premium All-in-One LCD CPU Cooler\n</li>, <li>Brilliant IPS LCD Display\n</li>, <li>Decide Your Display Theme\n</li>, <li>High-Performance Pump Head with RGB LED Ring\n</li>, <li>CORSAIR iCUE COMMANDER CORE Included\n</li>, <li>ML RGB ELITE Fans Elevate Your CPU Cooling\n</li>, <li>Extreme CPU Cooling\n</li>, <li>Specialized Cooling Modes for Quiet Operation\n</li>, <li>Powerful CORSAIR iCUE Software\n</li>, <li>Split-Flow Copper Cold Plate\n</li>, <li>Low-Noise Centrifugal Pump</li>]"
                                        </div>
                                        <div className="featured-product-GPU">
                                        "Name": "Yeston RTX 3080 10GB GDDR6X 320bit LHR Graphics cards Nvidia pci express x16 4.0 HDMI 2.1*1 + DP1.4a*3 video cards Desktop computer PC video gaming graphics card",
        "Price": "$769.00\u00a0\u2013",
        "Link": "https://www.newegg.com/yeston-geforce-rtx-3080-rtx3080-10g-d6x-ya/p/1FT-007N-00071?Description=GPU&cm_re=GPU-_-9SIAZUEHMN7535-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/AZUES220425vpbtX.jpg",
        "Specs": "[<li>This version is LHR version(LHR:Lite Hash Rate)Not recommended for mining</li>, <li>Unified shaders: 8704</li>, <li>Core frequency: 1440/1710MHz    </li>, <li>Memory capacity and specification: 10G/320bit/GDDR6X</li>, <li>3D features: DirectX12/Ansel/Highlights/G-Sync/VulkanApi/OpenGL4.6/8K/DLSS</li>, <li>OS features: windows7/8/8.1/10(only 64bit)</li>, <li>Bus interface: PCI Express 4.0 x 16</li>, <li>Output interface: DP*3+HDMI compatible*1</li>, <li>External power supply: 8 Pin * 2</li>, <li>Recommended power supply: rated more than 800W </li>, <li>Size / weight of graphics card: 301*132*49mm</li>]"
                                        </div>
                                        <div className="featured-product-RAM">
                                        "Name": "v-color Manta XSky DDR5 32GB (16GBx2) 6000MHz (PC5-48000) CL36 Gaming Desktop Ram Memory Dual Rank 1.25V High End Jet Black Heatsink- Jet Black (TMXSL1660836KWK)",
        "Price": "$229.99\u00a0\u2013",
        "Link": "https://www.newegg.com/p/0RN-00MB-00099?Description=RAM&cm_re=RAM-_-9SIAMCMHCA4257-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/AMCMS220504IvEIG.jpg",
        "Specs": "[<li>Product Spec: 32GB(16GBx2) |DDR5 6000MHz(PC5- 48000) | Cas Latency(CL) 36-38-38-76 | 1.25V | Hynix IC</li>, <li>DDR5 MANTA Memory symbolizes v-colors breakthrough in the development of gaming memory for the next generation DDR5.</li>, <li>Advanced Tech of On-die ECC to detect and correct errors in DRAM cell for performance reliability.</li>, <li>RGB Light bar redesigned with advanced tech for ultra smooth and bright lighting, allowing users to create a symphony of colors.</li>, <li>Personalize and control the lighting the way you want through major motherboard brands RGB software</li>]"
                                        </div>
                                        <div className="featured-product-Motherboard">
                                        "Name": "MSI PRO Z790-A WIFI LGA 1700 Intel Z790 SATA 6Gb/s DDR5 ATX Motherboard",
        "Price": "$336.99\u00a0\u2013",
        "Link": "https://www.newegg.com/p/N82E16813144569?Item=9SIAYTVJ9X7579&Description=Motherboard&cm_re=Motherboard-_-9SIAYTVJ9X7579-_-Product&cm_sp=SP-_-1272231-_-0-_-2-_-9SIAYTVJ9X7579-_-Motherboard-_-motherboard-_-6",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/13-144-569-15.jpg",
        "Specs": "[<li>Supports 12th/13th Gen Intel Core Processors, Pentium Gold and Celeron Processors.\n</li>, <li>Latest DDR5 Memory: A huge step of DDR performance enhancement with the latest DDR5 memory. \n</li>, <li>Lightning Gen 5: The latest PCIE 5.0 solution with up to 128 GB/s bandwidth for maximum transfer speed. \n</li>, <li>Wi-fi 6E: the latest wireless solution supports 6GHz spectrum. MU-MIMO and BSS color technology, delivering speeds up to 2400 Mbps. \n</li>, <li>Lightning USB 20G: Build in USB 3.2 Gen 2X2 port. offers 20 Gbps transmission speed 4X faster than USB 3.2 Gen1. \n</li>, <li>Extened Heatsink Design. \n</li>, <li>M.2 Shield FROZR.\n</li>, <li>2.5G Network solution.\n</li>, <li>Pre-installed I/0 Shielding. \n</li>, <li>Frozr AI cooling: Detect CPU &amp; GPU temperatures and automatically adjust system fan duty to a proper value. \n</li>, <li>Core Boost: with premium layout and fully digital power design to support more cores and provide better performance.</li>]"
                                        </div>
                                        <div className="featured-product-Storage">
                                        "Name": "SAMSUNG 980 PRO Heatsink M.2 2280 1TB PCI-Express 4.0 x4 V6(12xL) V-NAND 3bit MLC Internal Solid State Drive (SSD) MZ-V8P1T0CW. A Perfect Fits for PS5/PC",
        "Price": "$119.99\u00a0(14 Offers)\u2013",
        "Link": "https://www.newegg.com/samsung-1tb-980-pro/p/N82E16820147825?Description=Storage&cm_re=Storage-_-20-147-825-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/20-147-825-12.jpg",
        "Specs": "[<li>Next Level Performance With Maximum Heat Control</li>, <li>Maximum Speed</li>, <li>A Winning Combination</li>, <li>Smart Thermal Control</li>, <li>A Perfect Fit For Playstation 5</li>, <li>Samsung Magician Software</li>, <li>World's No.1 Flash Memory Brand</li>]"
                                        </div>
                                        <div className="featured-product-Case">
                                        "Name": "Corsair iCUE 5000X RGB Tempered Glass Mid-Tower ATX PC Smart Case, Black, CC-9011212-WW",
        "Price": "$179.99\u00a0\u2013",
        "Link": "https://www.newegg.com/black-corsair-icue-5000x-rgb-atx-mid-tower/p/N82E16811139163",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/11-139-163-20.jpg",
        "Specs": "[<li>Clear, Clean, and Cool\n</li>, <li>Four Tempered Glass Panels\n</li>, <li>CORSAIR RapidRoute Cable Management System\n</li>, <li>Three Included 120mm RGB Fans\n</li>, <li>Smart RGB Lighting Out-of-the-Box\n</li>, <li>Motherboard Tray with Customizable Fan Mounts\n</li>, <li>Maximum Cooling Potential\n</li>, <li>Modern Front Panel I/O\n</li>, <li>All the Storage You Need: Fits up to 4x 2.5in SSDs and 2x 3.5in HDDs</li>]"
                                        </div>
                                        <div className="featured-product-PowerSupply">"Name": "Super Flower Leadex Gold SE 1300W 80+ Gold, 10 Years Warranty, ECO Fanless & Silent Mode, Full Modular Power Supply, Dual Ball Bearing Fan, SF-1300F14MG",
        "Price": "$229.00\u00a0\u2013",
        "Link": "https://www.newegg.com/Super-Flower-Leadex-Gold-SF-1300F14MG-V2-1300W/p/1HU-024C-00040?cm_sp=SH-_-960452-_-8-_-1-_-9SIAMNPED27528-_-Power+Supply-_-power%7Csupply-_-3&Item=9SIAMNPED27528",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/AMNPS210715MTVXY.jpg",
        "Specs": "[<li>ATX12V / EPS12V </li>, <li>Full Modular </li>, <li>80 PLUS GOLD Certified </li>, <li>10 Years Warranty</li>, <li>+3.3V@24A, +5V@24A, +12V@108.3, -12V@0.5A, +5Vsb@3A</li>]"</div>
                                    </div>
                                </div>
                                <div className="featured-product">
                                    <h3>Ultra Build</h3>
                                    <div>
                                        <p> Total: 5349.90</p>
                                        <button className=".addAllToCart">Add to Cart</button>
                                    </div>
                                    <p>For people who want to be the alphas</p>
                                    <ul>
                                        <li>CPU : Intel Core i9-13900K</li>
                                        <li>CPU Cooler: ASUS ROG RYUJIN II 360 ARGB All-in-one Liquid CPU Cooler</li>
                                        <li>GPU : ZOTAC Gaming GeForce RTX 4090</li>
                                        <li>RAM : v-Color DDR5 XPrism Hynix A-DIE 32GB(16GBx2) 7200MHz</li>
                                        <li>Motherboard : MSI MEG Z590 GODLIKE LGA 1200 Intel</li>
                                        <li>Storage : SAMSUNG 980 PRO Heatsink M.2 2280 1TB</li>
                                        <li>Case : Corsair iCUE 5000X RGB Tempered Glass Mid-Tower ATX</li>
                                        <li>Power Supply : Super Flower Leadex Titanium 1600W</li>
                                    </ul>
                                    <div className="featured-product-components">
                                        <div className="featured-product-CPU">
                                        "Name": "Intel Core i9-13900K - Core i9 13th Gen Raptor Lake 24-Core (8P+16E) P-core Base Frequency: 3.0 GHz E-core Base Frequency: 2.2 GHz LGA 1700 125W Intel UHD Graphics 770 Desktop Processor - BX8071513900",
        "Price": "$659.98\u00a0(7 Offers)\u2013",
        "Link": "https://www.newegg.com/intel-core-i9-13900k-core-i9-13th-gen/p/N82E16819118412?Description=CPU&cm_re=CPU-_-19-118-412-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/19-118-412-V01.jpg",
        "Specs": "[<li>Raptor Lake 125W \n</li>, <li>36MB L3 Cache \n</li>, <li>32MB L2 Cache \n</li>, <li>Intel UHD Graphics 770 \n</li>, <li>Windows 11 Supported</li>]"
                                        </div>
                                        <div className="featured-product-Cooling">
                                        "Name": "ASUS ROG RYUJIN II 360 ARGB All-in-one Liquid CPU Cooler",
        "Price": "$359.99\u00a0\u2013",
        "Link": "https://www.newegg.com/ASUS-Liquid-Cooling-System/p/N82E16835101087?cm_sp=SH-_-943307-_-8-_-2-_-9SIAYTVJ947252-_-CPU+Cooler-_-cooler%7Ccpu-_-1&Item=9SIAYTVJ947252",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/35-101-087-01.jpg",
        "Specs": "[<li>600-2200 RPM +/- 10% 70.07 CFM \n</li>, <li>Fan Dim. 120.00 x 120.00 x 25.00 mm \n</li>, <li>Fan Noise 36.45 dB(A)</li>]"
                                        </div>
                                        <div className="featured-product-GPU">
                                        "Name": "ZOTAC Gaming GeForce RTX 4090 Trinity OC 24GB GDDR6X PCI Express 4.0 Video Card ZT-D40900J-10P",
        "Price": "$2,899.99\u00a0\u2013",
        "Link": "https://www.newegg.com/zotac-geforce-rtx-4090-zt-d40900j-10p/p/N82E16814500540?Description=GPU&cm_re=GPU-_-9SIB1AHJPA7760-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/14-500-540-08.jpg",
        "Specs": "[<li>24GB 384-Bit GDDR6X \n</li>, <li>Boost Clock 2535 MHz \n</li>, <li>1 x HDMI 2.1 3 x DisplayPort 1.4a \n</li>, <li>16384 CUDA Cores \n</li>, <li>PCI Express 4.0</li>]"
                                        </div>
                                        <div className="featured-product-RAM">
                                        "Name": "v-Color DDR5 XPrism Hynix A-DIE 32GB(16GBx2) 7200MHz 2Gx8 CL36 1.45V Compatible for Intel(7200Mhz) and AMD(6200MHz) RGB Gaming Desktop Upgrade RAM Memory Module - Mirrored Silver(TMXPL1672836SWK)",
        "Price": "$379.99\u00a0\u2013",
        "Link": "https://www.newegg.com/p/0RN-00MB-000A3?Description=RAM&cm_re=RAM-_-9SIAMCMJ9V0399-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/AMCMS22102504MKBP29.jpg",
        "Specs": "[<li>Product Spec for Intel XMP: 32GB(16GBx2) |DDR5 7200MHz(PC5-57600)| CL 36 | Timing 36-46-46-105 | 1.45V</li>, <li>Product Spec for AMD EXPO: 32GB(16GBx2) |DDR5 6200MHz(PC5-49600) | CL 34 | Timing 34-38-38-80 | 1.35V</li>, <li>DDR5 MANTA Memory symbolizes v-colors breakthrough in the development of gaming memory for the next generation DDR5.</li>, <li>Superior Speed at 7200 for Intel and Max speed at 6200 for AMD System. Edge Cutting Performance cannot be missed</li>, <li>A- DIE Hynix IC for superb overclocking performance, great stability, and a high tolerance for heavy workloads.</li>, <li>RGB Light bar redesigned with advanced tech for ultra smooth and bright lighting, allowing users to create a symphony of colors.</li>, <li>Premuim Tailored Metalic Mirrored Silver Heatsink Built to perform- Hgh Quality Heatsink ensuring heat-dissipation for uncompromised performance under extreme loads.</li>]"
                                        </div>
                                        <div className="featured-product-Motherboard">
                                        "Name": "MSI MEG Z590 GODLIKE LGA 1200 Intel Z590 SATA 6Gb/s Extended ATX Intel Motherboard",
        "Price": "$399.98\u00a0\u2013",
        "Link": "https://www.newegg.com/p/N82E16813144381?Item=9SIAYTVHHJ6260&Description=Motherboard&cm_re=Motherboard-_-9SIAYTVHHJ6260-_-Product&cm_sp=SP-_-1272231-_-0-_-2-_-9SIAYTVHHJ6260-_-Motherboard-_-motherboard-_-1",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/13-144-381-09.jpg",
        "Specs": "[<li>Intel Z590 \n</li>, <li>Supports 11th Gen Intel Core Processors</li>, <li>Supports 10th Gen Intel Core Processors</li>, <li>Supports Pentium Gold and Celeron Processors \n</li>, <li>DDR4 5600(OC)/ 5333(OC)/ 5000(OC)/ 4800(OC)/ 4600(OC)/ 4533(OC)/ 4400(OC)/ 4300(OC)/ 4266(OC)/ 4200(OC)/ 4133(OC)/ 4000(OC)/ 3866(OC)/ 3733(OC)/ 3600(OC)/ 3466(OC)/ 3400(OC)/ 3333(OC)/ 3300(OC)/ 3200(OC)/ 3000(OC) / 2933(JEDEC)/ 2666(JEDEC)/ 2400(JEDEC)/ 2133(JEDEC) MHz</li>]"
                                        </div>
                                        <div className="featured-product-Storage">
                                        "Name": "SAMSUNG 980 PRO Heatsink M.2 2280 1TB PCI-Express 4.0 x4 V6(12xL) V-NAND 3bit MLC Internal Solid State Drive (SSD) MZ-V8P1T0CW. A Perfect Fits for PS5/PC",
        "Price": "$119.99\u00a0(14 Offers)\u2013",
        "Link": "https://www.newegg.com/samsung-1tb-980-pro/p/N82E16820147825?Description=Storage&cm_re=Storage-_-20-147-825-_-Product",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/20-147-825-12.jpg",
        "Specs": "[<li>Next Level Performance With Maximum Heat Control</li>, <li>Maximum Speed</li>, <li>A Winning Combination</li>, <li>Smart Thermal Control</li>, <li>A Perfect Fit For Playstation 5</li>, <li>Samsung Magician Software</li>, <li>World's No.1 Flash Memory Brand</li>]"
                                        </div>
                                        <div className="featured-product-Case">
                                        "Name": "Corsair iCUE 5000X RGB Tempered Glass Mid-Tower ATX PC Smart Case, Black, CC-9011212-WW",
        "Price": "$179.99\u00a0\u2013",
        "Link": "https://www.newegg.com/black-corsair-icue-5000x-rgb-atx-mid-tower/p/N82E16811139163",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/11-139-163-20.jpg",
        "Specs": "[<li>Clear, Clean, and Cool\n</li>, <li>Four Tempered Glass Panels\n</li>, <li>CORSAIR RapidRoute Cable Management System\n</li>, <li>Three Included 120mm RGB Fans\n</li>, <li>Smart RGB Lighting Out-of-the-Box\n</li>, <li>Motherboard Tray with Customizable Fan Mounts\n</li>, <li>Maximum Cooling Potential\n</li>, <li>Modern Front Panel I/O\n</li>, <li>All the Storage You Need: Fits up to 4x 2.5in SSDs and 2x 3.5in HDDs</li>]"
                                        </div>
                                        <div className="featured-product-PowerSupply">
                                        "Name": "Super Flower Leadex Titanium 1600W 80+ Titanium, 10 Years Warranty,  ECO Fanless & Silent Mode, Full Modular Power Supply, Dual Ball Bearing Fan, SF-1600F14HT",
        "Price": "$349.99\u00a0\u2013",
        "Link": "https://www.newegg.com/Super-Flower-Leadex-Titanium-SF-1600F14HT-1600W/p/1HU-024C-00014?cm_sp=SH-_-960452-_-8-_-1-_-9SIAMNPB0A4085-_-Power+Supply-_-power%7Csupply-_-1&Item=9SIAMNPB0A4085",
        "Picture": "https://c1.neweggimages.com/ProductImageCompressAll300/1HU-024C-00014-01.jpg",
        "Specs": "[<li>Full Modular </li>, <li>+3.3V@24A, +5V@24A, +12V@133.3A, -12V@0.5A, +5Vsb@3A</li>, <li>10 Years Warranty</li>, <li>This item requires a specially designated medical grade power cord, therefore, please refer to the following term : </li>, <li>1. Please purchase the PSU from Super Flower official seller store (Medical grade power cord included). </li>, <li>2. Do not use this item purchased from other countries.</li>]"
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            </div>
            </div>
    );  
}

export default BuildPC;