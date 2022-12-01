/* this will be the main page of the app */
import React from 'react';
import './MainPage.css';
  
  
/* Main page will have 4 grids */
/* 1. Build PC */
/* 2. View Build */
/* 3. Check Out */
/* 4. Future Work */

class MainPage extends React.Component{
    goToBuildPC = () => {
        // go to '/buildpc'
        window.open("/pcintrovert/buildpc", "_self");
    };
    goToCart = () => {
        // go to '/cart'
        window.open("/pcintrovert/cart", "_self");
    };
    goToAbout = () => {
        // go to '/about'
        window.open("/pcintrovert/about", "_self");
    };
    goToCurrentBuild = () => {
        // go to '/currentbuild'
        window.open("/pcintrovert/currentbuild", "_self");
    };
    render(){
        return (
            <div className="mainpage">
                <div className="build-pc" onClick={this.goToBuildPC}>
                    <h1>Build PC</h1>
                </div>
                <div className="view-build" onClick={this.goToCurrentBuild}>
                    <h1>View Build</h1>
                </div>
                <div className="check-out" onClick={this.goToCart}>
                    <h1>Check Out</h1>
                </div>
                <div className="future-work" onClick={this.goToAbout}>
                    <h1>Future Work</h1>
                </div>
            </div>
        )
    }
}

export default MainPage;