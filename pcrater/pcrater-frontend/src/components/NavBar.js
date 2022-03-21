import React, { Component, useState, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { AuthContext } from '../context/auth';
import { useNavigate } from "react-router-dom";

function NavBar() {

    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState('');

    const handleLogOut = () => {
        logout();
        navigate('/');
    }

    const handleItemClick = (e, { name }) => setActivePage(name);
        const { activeItem } = activePage;

    const navBar = user ? (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">PCRaters</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="join-class">Join Class</Nav.Link>
                    <Nav.Link href="create-poll">Create Poll</Nav.Link>
                    <Nav.Link href="create-post">Create Posts</Nav.Link>
                    <Nav.Link href="show-posts">Show posts</Nav.Link>
                </Nav>
                <Nav>
                    {/* Redirect to user's profile page after */}
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
                    {/* <Nav.Link href="join-class">Join Class</Nav.Link> */}
                    {/* <Nav.Link href="create-poll">Create Poll</Nav.Link> */}
                    {/* <Nav.Link href="view-poll">View Poll</Nav.Link> */}
                </Nav>
            </Container>
        </Navbar>

    return navBar;
}

export default NavBar;