/* This will be where user build their PC */

import React from 'react';
import './BuildPC.css';
import { useState, useEffect } from 'react';
import menuIcon from '../../assets/menu.png';
import axios from 'axios'; 
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

    // get all information from https://en.wikipedia.org/wiki/List_of_computer_hardware_manufacturers
    getComponents = () => {
        axios.get('https://en.wikipedia.org/w/api.php?action=parse&format=json&page=List_of_computer_hardware_manufacturers&origin=*')
        .then(response => {
            //parse all the data and put them into the state
            let data = response.data;
            console.log(data.parse)

            // get all the cases
            let cases = [];
            let caseData = data.parse.text['*'].split('Cases')[1].split('Cooling')[0];
            let caseDataArray = caseData.split('<li>');
            for (let i = 1; i < caseDataArray.length; i++){
                let caseName = caseDataArray[i].split('</li>')[0];
                cases.push(caseName);
            }

            // get all the motherboards
            let motherboards = [];
            let motherboardData = data.parse.text['*'].split('Motherboards')[1].split('Power supplies')[0];
            let motherboardDataArray = motherboardData.split('<li>');
            for (let i = 1; i < motherboardDataArray.length; i++){
                let motherboardName = motherboardDataArray[i].split('</li>')[0];
                motherboards.push(motherboardName);
            }

            // get all the CPUs
            let cpus = [];
            let cpuData = data.parse.text['*'].split('CPUs')[1].split('GPUs')[0];
            let cpuDataArray = cpuData.split('<li>');
            for (let i = 1; i < cpuDataArray.length; i++){
                let cpuName = cpuDataArray[i].split('</li>')[0];
                cpus.push(cpuName);
            }

            // get all the GPUs
            let gpus = [];
            let gpuData = data.parse.text['*'].split('GPUs')[1].split('Memory')[0];
            let gpuDataArray = gpuData.split('<li>');
            for (let i = 1; i < gpuDataArray.length; i++){
                let gpuName = gpuDataArray[i].split('</li>')[0];
                gpus.push(gpuName);
            }

            // get all the memory
            let memories = [];
            let memoryData = data.parse.text['*'].split('Memory')[1].split('Storage')[0];
            let memoryDataArray = memoryData.split('<li>');
            for (let i = 1; i < memoryDataArray.length; i++){
                let memoryName = memoryDataArray[i].split('</li>')[0];
                memories.push(memoryName);
            }

            // get all the storage
            let storages = [];
            let storageData = data.parse.text['*'].split('Storage')[1].split('Power supplies')[0];
            let storageDataArray = storageData.split('<li>');
            for (let i = 1; i < storageDataArray.length; i++){
                let storageName = storageDataArray[i].split('</li>')[0];
                storages.push(storageName);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }


    render(){
        this.getComponents();
        return (
            <div className="buildPc">

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