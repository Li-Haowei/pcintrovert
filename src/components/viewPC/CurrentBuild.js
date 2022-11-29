/* This view the current PC build */
import React from 'react';
import './CurrentBuild.css';
import { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser'; 

function CurrentBuild() {
    const [CPUs, setCPUs] = useState([]);
    const [GPUs, setGPUs] = useState([]);
    const [RAMs, setRAMs] = useState([]);
    const [Motherboards, setMotherboards] = useState([]);
    const [Storages, setStorages] = useState([]);
    const [Cases, setCases] = useState([]);
    const [PowerSupplies, setPowerSupplies] = useState([]);
    const [Coolings, setCoolings] = useState([]);
    const localStorageCart = localStorage.getItem('cart');
    const cart = JSON.parse(localStorageCart);

    //console.log(cart);

    function loadCurrentBuild() {
        if (cart) {
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].category === 'CPU') {
                    // append to CPUs
                    setCPUs([...CPUs, cart[i]]);
                }
                if (cart[i].category === 'GPU') {
                    // append to GPUs
                    setGPUs([...GPUs, cart[i]]);
                }
                if (cart[i].category === 'RAM') {
                    // append to RAMs
                    setRAMs([...RAMs, cart[i]]);
                }
                if (cart[i].category === 'Motherboard') {
                    // append to Motherboards
                    setMotherboards([...Motherboards, cart[i]]);
                }
                if (cart[i].category === 'Storage') {
                    // append to Storages
                    setStorages([...Storages, cart[i]]);
                }
                if (cart[i].category === 'Case') {
                    // append to Cases
                    setCases([...Cases, cart[i]]);
                }
                if (cart[i].category === 'Power Supply') {
                    // append to PowerSupplies
                    setPowerSupplies([...PowerSupplies, cart[i]]);
                }
                if (cart[i].category === 'Cooling') {
                    // append to Coolings
                    setCoolings([...Coolings, cart[i]]);
                }
            }
        }
    }
    useEffect(() => {
        loadCurrentBuild();
    }, []);
    function createTable(){
        //iterate through the array of objects and create a table
        //first column is the item name, second column is the item price
        let CPUs_List = CPUs.map((CPU) => {
            return (
                <tr>
                    <td>CPU</td>
                    <td>{CPU.name}</td>
                    <td>{ReactHtmlParser(CPU.specs)}</td>
                </tr>
            )
        })
        if (CPUs_List.length === 0) {
            CPUs_List = (
                <tr>
                    <td>CPU</td>
                    <td>None</td>
                    <td>None</td>
                </tr>
            )
        }
        let GPUs_List = GPUs.map((GPU) => {
            return (
                <tr>
                    <td>GPU</td>
                    <td>{GPU.name}</td>
                    <td>{ReactHtmlParser(GPU.specs)}</td>
                </tr>
            )
        }
        )
        if (GPUs_List.length === 0) {
            GPUs_List = (
                <tr>
                    <td>GPU</td>
                    <td>None</td>
                    <td>None</td>
                </tr>
            )
        }
        let RAMs_List = RAMs.map((RAM) => {
            return (
                <tr>
                    <td>RAM</td>
                    <td>{RAM.name}</td>
                    <td>{ReactHtmlParser(RAM.specs)}</td>
                </tr>
            )
        }
        )
        if (RAMs_List.length === 0) {
            RAMs_List = (
                <tr>
                    <td>RAM</td>
                    <td>None</td>
                    <td>None</td>
                </tr>
            )
        }
        let Motherboards_List = Motherboards.map((Motherboard) => {
            return (
                <tr>
                    <td>Motherboard</td>
                    <td>{Motherboard.name}</td>
                    <td>{ReactHtmlParser(Motherboard.specs)}</td>
                </tr>
            )
        }
        )
        if (Motherboards_List.length === 0) {
            Motherboards_List = (
                <tr>
                    <td>Motherboard</td>
                    <td>None</td>
                    <td>None</td>
                </tr>
            )
        }
        let Storages_List = Storages.map((Storage) => {
            return (
                <tr>
                    <td>Storage</td>
                    <td>{Storage.name}</td>
                    <td>{ReactHtmlParser(Storage.specs)}</td>
                </tr>
            )
        }
        )
        if (Storages_List.length === 0) {
            Storages_List = (
                <tr>
                    <td>Storage</td>
                    <td>None</td>
                    <td>None</td>
                </tr>
            )
        }
        let Cases_List = Cases.map((Case) => {
            return (
                <tr>
                    <td>Case</td>
                    <td>{Case.name}</td>
                    <td>{ReactHtmlParser(Case.specs)}</td>
                </tr>
            )
        }
        )
        if (Cases_List.length === 0) {
            Cases_List = (
                <tr>
                    <td>Case</td>
                    <td>None</td>
                    <td>None</td>
                </tr>
            )
        }
        let PowerSupplies_List = PowerSupplies.map((PowerSupply) => {
            return (
                <tr>
                    <td>Power Supply</td>
                    <td>{PowerSupply.name}</td>
                    <td>{ReactHtmlParser(PowerSupply.specs)}</td>
                </tr>
            )
        }
        )
        if (PowerSupplies_List.length === 0) {
            PowerSupplies_List = (
                <tr>
                    <td>Power Supply</td>
                    <td>None</td>
                    <td>None</td>
                </tr>
            )
        }
        let Coolings_List = Coolings.map((Cooling) => {
            return (
                <tr>
                    <td>Cooling</td>
                    <td>{Cooling.name}</td>
                    <td>{ReactHtmlParser(Cooling.specs)}</td>
                </tr>
            )
        }
        )
        if (Coolings_List.length === 0) {
            Coolings_List = (
                <tr>
                    <td>Cooling</td>
                    <td>None</td>
                    <td>None</td>
                </tr>
            )
        }
        return (
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Specs</th>
                    </tr>
                </thead>
                <tbody>
                {CPUs_List}
                {GPUs_List}
                {RAMs_List}
                {Motherboards_List}
                {Storages_List}
                {Cases_List}
                {PowerSupplies_List}
                {Coolings_List}
                </tbody>
            </table>
        )

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
        <div className='current-build'>
            <h1><span>Current Build</span></h1>
            <div className="current-build-table">
            {createTable()}
            </div>
            <div className='summary'></div>
        </div>
    );
}

export default CurrentBuild;