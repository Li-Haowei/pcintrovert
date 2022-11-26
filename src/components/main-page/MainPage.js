/* this will be the main page of the app */
import React from 'react';
import './MainPage.css';
import { useState, useEffect } from 'react';
  
  
/* Main page will have 4 grids */
/* 1. Build PC */
/* 2. View Build */
/* 3. Check Out */
/* 4. Future Work */

class MainPage extends React.Component{
    goToBuildPC = () => {
        // go to '/buildpc'
        window.open("/buildpc", "_self");
    };
    render(){
        return (
            <div className="mainpage">
                <div className="build-pc" onClick={this.goToBuildPC}>
                    <h1>Build PC</h1>
                </div>
                <div className="view-build">
                    <h1>View Build</h1>
                </div>
                <div className="check-out">
                    <h1>Check Out</h1>
                </div>
                <div className="future-work">
                    <h1>Future Work</h1>
                </div>
            </div>
        )
    }
}

export default MainPage;