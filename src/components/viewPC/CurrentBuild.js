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

    useEffect(() => {
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
        loadCurrentBuild();
    }, []);
    function createTable(){
        //iterate through the array of objects and create a table
        //first column is the item name, second column is the item price
        let CPUs_List = CPUs.map((CPU) => {
            return (
                <tr>
                    <td className="completed">CPU</td>
                    <td className="completed">{CPU.name}</td>
                    <td className="completed">{ReactHtmlParser(CPU.specs)}</td>
                </tr>
            )
        })
        if (CPUs_List.length === 0) {
            CPUs_List = (
                <tr>
                    <td className="none">CPU</td>
                    <td className="none">Missing Components</td>
                    <td className="none">Missing Components</td>
                </tr>
            )
        }
        let GPUs_List = GPUs.map((GPU) => {
            return (
                <tr>
                    <td className="completed">GPU</td>
                    <td className="completed">{GPU.name}</td>
                    <td className="completed">{ReactHtmlParser(GPU.specs)}</td>
                </tr>
            )
        }
        )
        if (GPUs_List.length === 0) {
            GPUs_List = (
                <tr>
                    <td className="none">GPU</td>
                    <td className="none">Missing Components</td>
                    <td className="none">Missing Components</td>
                </tr>
            )
        }
        let RAMs_List = RAMs.map((RAM) => {
            return (
                <tr>
                    <td className="completed">RAM</td>
                    <td className="completed">{RAM.name}</td>
                    <td className="completed">{ReactHtmlParser(RAM.specs)}</td>
                </tr>
            )
        }
        )
        if (RAMs_List.length === 0) {
            RAMs_List = (
                <tr>
                    <td className="none">RAM</td>
                    <td className="none">Missing Components</td>
                    <td className="none">Missing Components</td>
                </tr>
            )
        }
        let Motherboards_List = Motherboards.map((Motherboard) => {
            return (
                <tr>
                    <td className="completed">Motherboard</td>
                    <td className="completed">{Motherboard.name}</td>
                    <td className="completed">{ReactHtmlParser(Motherboard.specs)}</td>
                </tr>
            )
        }
        )
        if (Motherboards_List.length === 0) {
            Motherboards_List = (
                <tr>
                    <td className="none">Motherboard</td>
                    <td className="none">Missing Components</td>
                    <td className="none">Missing Components</td>
                </tr>
            )
        }
        let Storages_List = Storages.map((Storage) => {
            return (
                <tr>
                    <td className="completed">Storage</td>
                    <td className="completed">{Storage.name}</td>
                    <td className="completed">{ReactHtmlParser(Storage.specs)}</td>
                </tr>
            )
        }
        )
        if (Storages_List.length === 0) {
            Storages_List = (
                <tr>
                    <td className="none">Storage</td>
                    <td className="none">Missing Components</td>
                    <td className="none">Missing Components</td>
                </tr>
            )
        }
        let Cases_List = Cases.map((Case) => {
            return (
                <tr>
                    <td className="completed">Case</td>
                    <td className="completed">{Case.name}</td>
                    <td className="completed">{ReactHtmlParser(Case.specs)}</td>
                </tr>
            )
        }
        )
        if (Cases_List.length === 0) {
            Cases_List = (
                <tr>
                    <td className="none">Case</td>
                    <td className="none">Missing Components</td>
                    <td className="none">Missing Components</td>
                </tr>
            )
        }
        let PowerSupplies_List = PowerSupplies.map((PowerSupply) => {
            return (
                <tr>
                    <td className="completed">Power Supply</td>
                    <td className="completed">{PowerSupply.name}</td>
                    <td className="completed">{ReactHtmlParser(PowerSupply.specs)}</td>
                </tr>
            )
        }
        )
        if (PowerSupplies_List.length === 0) {
            PowerSupplies_List = (
                <tr>
                    <td className="none">Power Supply</td>
                    <td className="none">Missing Components</td>
                    <td className="none">Missing Components</td>
                </tr>
            )
        }
        let Coolings_List = Coolings.map((Cooling) => {
            return (
                <tr>
                    <td className="completed">Cooling</td>
                    <td className="completed">{Cooling.name}</td>
                    <td className="completed">{ReactHtmlParser(Cooling.specs)}</td>
                </tr>
            )
        }
        )
        if (Coolings_List.length === 0) {
            Coolings_List = (
                <tr>
                    <td className="none">Cooling</td>
                    <td className="none">Missing Components</td>
                    <td className="none">Missing Components</td>
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