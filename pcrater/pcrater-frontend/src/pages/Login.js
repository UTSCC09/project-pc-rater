import React, { useState } from 'react';
import {gql, useMutation} from "@apollo/client";
import './Login.css';

export default function Login() {

    const [fields, handleFieldChange] = useState({
        username: "",
        firstname: "",
        lastname: "",
        institution: "",
        email: "",
        password: ""
    });

    function validateForm() {
        return (
            fields.username.length > 0 &&
            fields.firstname.length > 0 &&
            fields.lastname.length > 0 &&
            fields.institution.length > 0 &&
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.confirmPassword.length > 0 &&
            // Add more as needed
            fields.email.includes("@") &&
            fields.password === fields.confirmPassword
        );
    }
    function submitHandler() {
        // Need to validate if email is unique (backend check)
        console.log("Submit");
    }

    return(
        <div className='div-login'>
            <div>
                <h1 id="login-header">
                    Login
                </h1>
                <form>
                    <input type='text' name='email' placeholder='Enter your e-mail' required value={fields.email} onChange={e => handleFieldChange({...fields, email: e.target.value})} />
                    <input type='text' name='password' placeholder='Enter your password' required value={fields.password} onChange={e => handleFieldChange({...fields, password: e.target.value})} />
                </form>
                <button type='submit' onClick={submitHandler}>Login</button>
            </div>
        </div>
    );
}