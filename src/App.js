import './App.css';
import Login from './components/login/Login';
import MainPage from './components/main-page/MainPage';
import BuildPC from './components/buildPC/BuildPC';
import Nav from './components/navbar/Nav';
import Cart from './components/cart/Cart';
import About from './components/about/About';
import CurrentBuild from './components/viewPC/CurrentBuild';
import React from 'react';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useRoutes
} from "react-router-dom";
// import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// if user is not logged in, show login page, else show the app page

// const LoginComponent = () => {
//   return (
//     <div className="App">
//       <Login />
//     </div>
//   );
// };

// const App = () => {
//   const [cartItems, setCartItems] = useState([]);
//   let routes = useRoutes([
//     { path: "/pcintrovert", element: <LoginComponent /> },
//     { path: "/pcintrovert/mainpage", element: <MainPage /> },
//     { path: "/pcintrovert/buildpc", element: <BuildPC setCartItems={setCartItems} cartItems={cartItems}/>},
//     { path: "/pcintrovert/cart", element: <Cart />},
//     { path: "/pcintrovert/about", element: <About />},
//     { path: "/pcintrovert/currentbuild", element: <CurrentBuild />},
//   ]);
//   return routes;
// };

function AppWrapper(){
  const [cartItems, setCartItems] = useState([]);
  return (
      <>
      <Nav />
      <div className="App">
      <Routes>
      <Route exact path="/pcintrovert" element={<Login />}></Route>
      <Route exact path="/pcintrovert/mainpage" element={<MainPage />}></Route>
      <Route exact path="/pcintrovert/buildpc" element={<BuildPC setCartItems={setCartItems} cartItems={cartItems}/>}></Route>
      <Route exact path="/pcintrovert/cart" element={<Cart />}></Route>
      <Route exact path="/pcintrovert/about" element={<About />}></Route>
      <Route exact path="/pcintrovert/currentbuild" element={<CurrentBuild />}></Route>
      </Routes>
      </div>
      </>
  );
}

export default AppWrapper;