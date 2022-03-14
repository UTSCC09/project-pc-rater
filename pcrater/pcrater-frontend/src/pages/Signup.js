import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import './Signup.css';
import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';
import { useNavigate } from "react-router-dom";

export default function Signup(props) {

    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: "",
        firstname: "",
        lastname: "",
        institution: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, result) {
            context.login(result.data.register);
            navigate("/");
        },
        onError(err) {
            if (err.graphQLErrors[0] != undefined) {
                setErrors(err.graphQLErrors[0].extensions.exception.errors);
            }
        },
        variables: values
    });

    function registerUser() {
        addUser();
    }

    return(
        <div className='div-login'>
            <div>
                <h1 id="login-header">
                    Signup
                </h1>
                <form>
                    <input type='text' name='username' placeholder='Enter your username' required value={values.username} onChange={onChange} />
                    <input type='text' name='firstname' placeholder='Enter your firstname' required value={values.firstname} onChange={onChange} />
                    <input type='text' name='lastname' placeholder='Enter your lastname' required value={values.lastname} onChange={onChange} />
                    <input type='text' name='institution' placeholder='Enter your educational institution' required value={values.institution} onChange={onChange} />
                    <input type='email' name='email' placeholder='Enter your e-mail' required value={values.email} onChange={onChange} />
                    <input type='password' name='password' placeholder='Enter your password' required value={values.password} onChange={onChange} />
                    <input type='password' name='confirmPassword' placeholder='Confirm your password' required value={values.confirmPassword} onChange={onChange} />
                </form>
                <button type='submit' onClick={onSubmit}>Signup</button>
            </div>
        </div>
    );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $firstname: String!
    $lastname: String!
    $institution: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
      register(
        username: $username
        firstname: $firstname
        lastname: $lastname
        institution: $institution
        email: $email
        password: $password
        confirmPassword: $confirmPassword
    ) {
      id
      username
      email
      token
    }
  }
`;