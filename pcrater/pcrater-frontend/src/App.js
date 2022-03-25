import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NewClasses from './pages/NewClasses';
import CreatePost from './pages/CreatePost';
import ShowPosts from './pages/ShowPosts';

import CreatePoll from './pages/CreatePoll';
import ViewPoll from './pages/ViewPoll';
import NavBar from './components/NavBar';
import ViewPollResults from './pages/ViewPoll';
import Posts from './pages/Posts';

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
          <Route exact path="/create-poll" element={<CreatePoll />} />
          <Route exact path="/view-poll" element={<ViewPoll />} />
          <Route exact path='/create-post' element={<CreatePost />} />
          <Route exact path='/show-posts' element={<ShowPosts />} />
          <Route exact path="posts" element={<Posts/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
