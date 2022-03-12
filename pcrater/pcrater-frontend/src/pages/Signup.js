import React, { useState } from 'react';
import './Signup.css';

export default function Signup() {

    // const [fields, handleFieldChange] = useState({
    //     username: "",
    //     firstname: "",
    //     lastname: "",
    //     institution: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: ""
    // });

    // function submitHandler() {
    //     // Need to validate if email is unique (backend check)
    //     console.log("Submit");
    // }

    return(
        // <div className='div-login'>
        //     <div>
        //         <h1 id="login-header">
        //             Signup as a Student
        //         </h1>
        //         <form>
        //             <input type='text' name='username' placeholder='Enter your username' required value={fields.username} onChange={e => handleFieldChange({...fields, username: e.target.value})} />
        //             <input type='text' name='firstname' placeholder='Enter your firstname' required value={fields.firstname} onChange={e => handleFieldChange({...fields, firstname: e.target.value})} />
        //             <input type='text' name='lastname' placeholder='Enter your lastname' required value={fields.lastname} onChange={e => handleFieldChange({...fields, lastname: e.target.value})} />
        //             <input type='text' name='institution' placeholder='Enter your educational institution' required value={fields.institution} onChange={e => handleFieldChange({...fields, institution: e.target.value})} />
        //             <input type='text' name='email' placeholder='Enter your e-mail' required value={fields.email} onChange={e => handleFieldChange({...fields, email: e.target.value})} />
        //             <input type='text' name='password' placeholder='Enter your password' required value={fields.password} onChange={e => handleFieldChange({...fields, password: e.target.value})} />
        //         </form>
        //         <button type='submit' onClick={submitHandler}>Signup</button>
        //     </div>
        // </div>
        <div>Hello world</div>
    );
}