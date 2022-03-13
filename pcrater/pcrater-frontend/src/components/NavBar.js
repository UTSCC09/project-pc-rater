import React, { Component, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container } from 'react-bootstrap';

function NavBar() {
  const [activePage, setActivePage] = useState('');

  const handleItemClick = (e, { name }) => setActivePage(name);
    const { activeItem } = activePage;

    return (
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
    )
}

export default NavBar;