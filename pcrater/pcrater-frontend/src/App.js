import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NewClasses from './pages/NewClasses';
import CreatePoll from './pages/CreatePoll';
import ViewPoll from './pages/ViewPoll';
import NavBar from './components/NavBar';
import ViewPollResults from './pages/ViewPoll';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/join-class' element={<NewClasses />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
