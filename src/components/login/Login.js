import React from 'react'; 
import logo from "../../assets/mini-pc.jpg";
import './Login.css';



class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            pwd: '',
            isLoggedIn: false,
            isGuest: false
        }
    }

    handleChanges = e => {
        const {name,value} = e.target;
        this.setState({[name]:value});
        this.setState({login:true});
    };

    handleSubmit = e => {
    };
    
    loginAsGuest = () => {
        // login as guest and proceed to the app page
        console.log("Now you are a guest");
        // {email:'guestAcc@test.com', pwd:'guestAcc@test.com,isLoggedIn:true,isGuest:true}
        this.setState({email:' ', pwd:' ', isLoggedIn:true, isGuest:true});
        // go to '/mainpage'
        window.open("/pcintrovert/mainpage", "_self");
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
                            <button type="button" onSubmit={this.handleSubmit}>Login with Google</button>
                            <button type="button" onClick={this.loginAsGuest}>Browse as Guests</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;