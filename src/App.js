import './App.css';
import Login from './components/login/Login';
import MainPage from './components/main-page/MainPage';
import BuildPC from './components/buildPC/BuildPC';
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
  let routes = useRoutes([
    { path: "/", element: <LoginComponent /> },
    { path: "mainpage", element: <MainPageComponent /> },
    { path: "buildpc", element: <BuildPCComponent /> },
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;