/* This will be where user build their PC */

import React from 'react';
import './BuildPC.css';
import { useState, useEffect } from 'react';
import menuIcon from '../../assets/menu.png';
import logo from '../../assets/mini-pc.jpg';
import axios from 'axios'; 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"
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
const analytics = getAnalytics(app);
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
        const storageRef = ref(storage);
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
        for (let i = 0; i < Cases.length; i++){
            Cases[i].Specs = "<ul>" + Cases[i].Specs.replace('[', '').replace(']', '').replace(/,/g, '') + "</ul>";
            shelf.innerHTML += `
                <div class="grid">
                    <img src="${Cases[i].Picture}" alt="case">
                    <div class="product-info">
                        <p class="product-name">${Cases[i].Name}</p>
                        <p class="product-price">${Cases[i].Price}</p>
                        <div class="product-specs">${Cases[i].Specs}</div>
                        <a href="${Cases[i].Link}"><button class="product-description">View More</button></a>
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
                    <img src="${Coolings[i].Picture}" alt="case">
                    <div class="product-info">
                        <p class="product-name">${Coolings[i].Name}</p>
                        <p class="product-price">${Coolings[i].Price}</p>
                        <div class="product-specs">${Coolings[i].Specs}</div>
                        <a href="${Coolings[i].Link}"><button class="product-description">View More</button></a>
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
                    <img src="${CPUs[i].Picture}" alt="case">
                    <div class="product-info">
                        <p class="product-name">${CPUs[i].Name}</p>
                        <p class="product-price">${CPUs[i].Price}</p>
                        <div class="product-specs">${CPUs[i].Specs}</div>
                        <a href="${CPUs[i].Link}"><button class="product-description">View More</button></a>
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
                    <img src="${GPUs[i].Picture}" alt="case">
                    <div class="product-info">
                        <p class="product-name">${GPUs[i].Name}</p>
                        <p class="product-price">${GPUs[i].Price}</p>
                        <div class="product-specs">${GPUs[i].Specs}</div>
                        <a href="${GPUs[i].Link}"><button class="product-description">View More</button></a>
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
                    <img src="${RAMs[i].Picture}" alt="case">
                    <div class="product-info">
                        <p class="product-name">${RAMs[i].Name}</p>
                        <p class="product-price">${RAMs[i].Price}</p>
                        <div class="product-specs">${RAMs[i].Specs}</div>
                        <a href="${RAMs[i].Link}"><button class="product-description">View More</button></a>
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
                    <img src="${Storages[i].Picture}" alt="case">
                    <div class="product-info">
                        <p class="product-name">${Storages[i].Name}</p>
                        <p class="product-price">${Storages[i].Price}</p>
                        <div class="product-specs">${Storages[i].Specs}</div>
                        <a href="${Storages[i].Link}"><button class="product-description">View More</button></a>
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
                    <img src="${Motherboards[i].Picture}" alt="case">
                    <div class="product-info">
                        <p class="product-name">${Motherboards[i].Name}</p>
                        <p class="product-price">${Motherboards[i].Price}</p>
                        <div class="product-specs">${Motherboards[i].Specs}</div>
                        <a href="${Motherboards[i].Link}"><button class="product-description">View More</button></a>
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
                    <img src="${PowerSupplies[i].Picture}" alt="case">
                    <div class="product-info">
                        <p class="product-name">${PowerSupplies[i].Name}</p>
                        <p class="product-price">${PowerSupplies[i].Price}</p>
                        <div class="product-specs">${PowerSupplies[i].Specs}</div>
                        <a href="${PowerSupplies[i].Link}"><button class="product-description">View More</button></a>
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
                    if (Math.floor(k / 4) != row){
                        grids[k].classList.remove('expand');
                    }
                }
            })
        }
    }

    const toast = (message) => {
        let toast = document.getElementById('toast');
        toast.innerHTML = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 700);
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
                // generate a random id for each product
                let id = Math.floor(Math.random() * 100000000);
                setCartItems( arr => [...arr, {name, price, image, id}]);
                toast('Added to Cart');
            }
            product.appendChild(btn);
        }
    }

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