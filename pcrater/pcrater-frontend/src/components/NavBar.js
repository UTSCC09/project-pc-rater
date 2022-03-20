import React, { Component, useState, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { AuthContext } from '../context/auth';
function NavBar() {

    const { user, logout } = useContext(AuthContext);

    const [activePage, setActivePage] = useState('');

    const handleItemClick = (e, { name }) => setActivePage(name);
        const { activeItem } = activePage;

    const navBar = user ? (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">PCRaters</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="join-class">Join Class</Nav.Link>
                </Nav>
                <Nav>
                    {/* Redirect to user's profile page after */}
                    <Nav.Link>{user.username}</Nav.Link>
                    <Nav.Link name="login" onClick={logout}>Logout</Nav.Link>    
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
                    <Nav.Link href="join-class">Join Class</Nav.Link>
                    <Nav.Link href="create-poll">Create Poll</Nav.Link>
                    <Nav.Link href="view-poll">View Poll</Nav.Link>
                </Nav>
            </Container>
        </Navbar>

    return navBar;
}

export default NavBar;