import React from 'react'; 
import logo from "../../images/mini-pc.jpg";
import './Login.css';

class Login extends React.Component{

    state={
        email: '',
        pwd:''
    }

    handleChanges = e => {
        const {name,value} = e.target;
        this.setState({[name]:value});
    };

    handleSubmit = e => {
    };


    render(){
        return (
            <div className="login-wrapper">
                <h1>Hi Human, this is Introvert PC, <br/> identify yourself before we proceed</h1>
                <div className="login-form">
                    <div>
                        <img className='logo' src={logo} alt="logo" />
                    </div>
                    <div>
                        <form className="submission-template" onSubmit={this.handleSubmit}>
                            <input type="email" name="email" placeholder='Email...' required onChange={this.handleChanges}/>
                            <input type="password" name="pwd" placeholder='Password...' required onChange={this.handleChanges}/>
                            <button type="submit" onSubmit={this.handleSubmit}>Login</button>
                            <button type="submit" onSubmit={this.handleSubmit}>Register</button>
                            <button type="submit" onSubmit={this.handleSubmit}>Login with Google</button>
                            <button type="submit" onSubmit={this.handleSubmit}>Browse as Guests</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;