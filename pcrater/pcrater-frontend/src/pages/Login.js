//credits: https://www.youtube.com/watch?v=_DqPiZPKkgY&list=PLMhAeHCz8S3_pgb-j51QnCEhXNj5oyl8n


import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useForm    } from '../util/hooks';
import gql from 'graphql-tag';
import './Login.css';
import { AuthContext } from '../context/auth';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(authenticateUser, {
        email: "",
        password: ""
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            context.login(result.data.login);
            navigate("/show-posts");
        },
        onError(err) {
            if (err.graphQLErrors[0] !== undefined) {
                setErrors(err.graphQLErrors[0].extensions.exception.errors);
            }
        },
        variables: values
    });

    function authenticateUser() {
        loginUser();
    }

    return(
        <div className='div-login'>
            <div>
                <h1 id="login-header">
                    Login
                </h1>
                <form>
                    <input type='email' name='email' placeholder='Enter your e-mail' required value={values.email} onChange={onChange} />
                    <input type='password' name='password' placeholder='Enter your password' required value={values.password} onChange={onChange} />
                </form>
                <button type='submit' noValidate onClick={onSubmit}>Login</button>
            </div>
        </div>
    );
}

const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(
            email: $email,
            password: $password,
        ) {
            id
            username
            email
            token
        }
    }
`;