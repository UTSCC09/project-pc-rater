import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NewClasses from './pages/NewClasses';

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
      </Routes>
    </Router>
  );
}

export default App;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from "react-router-dom";

// export default function App() {
//   return (
//     <Router>
//       <NavBar />
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/about">About</Link>
//             </li>
//             <li>
//               <Link to="/users">Users</Link>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </Router>
//   );
// }

// function Home() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

// function Users() {
//   return <h2>Users</h2>;
// }
