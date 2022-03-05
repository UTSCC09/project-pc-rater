
import React from 'react';
import './Login.css';
class Login extends React.Component{
    state={
        email:'',
        pwd:''
    }

    handleChange = (e) =>{
        const {name,value} = e.target
        this.setState({[name]:value})
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.props.isLogin(true)
    }
    render(){
        return(
            <div className='div-login'>
                <div>
                    <h1 id="login-header">
                        Login
                    </h1>
                    <form onSubmit = {this.handleSubmit}>
                        <input type='email' name='email' placeholder='Enter your e-mail' required onChange={this.handleChange}/>
                        <input type='password' name='pwd' placeholder='Enter your password' required onChange={this.handleChange}/>
                        <button onSubmit={this.handleSubmit}>Log In</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;