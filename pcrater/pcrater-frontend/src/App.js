import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar';
import { AuthProvider } from './context/auth';
import CreatePoll from './pages/CreatePoll';
import Home from './pages/Home';
import Login from './pages/Login';
import NewClasses from './pages/NewClasses';
import Posts from './pages/Posts';
import Signup from './pages/Signup';
import VideoCall from './pages/VideoCall';
import ViewPoll from './pages/ViewPoll';
import Credits from './pages/Credits';




function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="video" element={<VideoCall />} />
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/join-class' element={<NewClasses />} />
          <Route exact path="create-poll" element={<CreatePoll />} />
          <Route exact path="/view-poll" element={<ViewPoll />} />
          <Route exact path="posts" element={<Posts/>} />
          <Route exact path="/credits" element={<Credits/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
