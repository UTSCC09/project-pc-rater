import { useApolloClient } from "@apollo/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth';

function NavBar() {

    const client = useApolloClient();
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState('');

    const handleLogOut = () => {
        logout();
        client.clearStore();
        navigate('/');
    };

    const handleItemClick = (e, { name }) => setActivePage(name);
        const { activeItem } = activePage;

    const navBar = user ? (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">PCRaters</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="join-class">Join Class</Nav.Link>
                    <Nav.Link href="posts">Posts</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link>{user.username}</Nav.Link>
                    <Nav.Link name="login" onClick={() => handleLogOut()}>Logout</Nav.Link>    
                </Nav>
            </Container>
        </Navbar>
        ) : 
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">PCRaters</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="login">Login</Nav.Link>
                    <Nav.Link href="signup">Signup</Nav.Link>
                </Nav>
            </Container>
        </Navbar>

    return navBar;
}

export default NavBar;