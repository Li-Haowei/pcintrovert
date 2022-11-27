import './App.css';
import Login from './components/login/Login';
import MainPage from './components/main-page/MainPage';
import BuildPC from './components/buildPC/BuildPC';
import Nav from './components/navbar/Nav';
import Cart from './components/cart/Cart';
import React from 'react';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
// if user is not logged in, show login page, else show the app page

const LoginComponent = () => {
  return (
    <div className="App">
      <Login />
    </div>
  );
};

const MainPageComponent = () => {
  return (
    <div className="App">
      <MainPage />
    </div>
);
};

const BuildPCComponent = () => {
  return (
    <div className="App">
      <BuildPC />
    </div>
  );
};

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  let routes = useRoutes([
    { path: "/", element: <LoginComponent /> },
    { path: "mainpage", element: <MainPage /> },
    { path: "buildpc", element: <BuildPC setCartItems={setCartItems} cartItems={cartItems}/>},
    { path: "cart", element: <Cart />},
  ]);
  return routes;
};

function AppWrapper(){
  return (
    <Router>
      <Nav />
      <App />
    </Router>
  );
}

export default AppWrapper;