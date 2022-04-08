//credits: https://www.youtube.com/watch?v=_DqPiZPKkgY&list=PLMhAeHCz8S3_pgb-j51QnCEhXNj5oyl8n


import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';
import './Login.css';

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
            navigate("/posts");
        },
        onError(err) {
            if (err.graphQLErrors[0] !== undefined) {
                setErrors(err.graphQLErrors[0].extensions.errors);
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
                <h1>
                    Login
                </h1>
                <form>
                    <input className="input" type='email' name='email' placeholder='Enter your e-mail' required value={values.email} onChange={onChange} />
                    <input className="input" type='password' name='password' placeholder='Enter your password' required value={values.password} onChange={onChange} />
                </form>
                <button type='submit' noValidate onClick={onSubmit}>Login</button>
            </div>
            {Object.keys(errors).length > 0 && (
            <div className="ui-error-message">
                <ul className="list">
                    {Object.values(errors).map((value) => (
                    <li key={value}>{value}</li>
                    ))}
                </ul>
            </div>
            )}
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
            institution
        }
    }
`;