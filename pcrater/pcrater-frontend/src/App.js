import logo from './logo.svg';
import './App.css';
import "./containers/Login.js";
import { BrowserRouter, Outlet, Link, Switch , Route} from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import Login from './containers/Login';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" fixed='top' expand='sm'>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Container>
              <Nav className="me-auto">
                <Nav.Link href='/'>Home</Nav.Link>
                <Nav.Link href='/login'>Login</Nav.Link>
              </Nav>
            </Container>
          </Navbar.Collapse>
        </Navbar>
    </div>
  );
}

export default App;
