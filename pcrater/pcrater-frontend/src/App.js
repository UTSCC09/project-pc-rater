import logo from './logo.svg';
import './App.css';


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NewClasses from './pages/NewClasses';
import CreatePost from './pages/CreatePost';

import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/join-class' element={<NewClasses />} />
        <Route exact path='/create-post' element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
