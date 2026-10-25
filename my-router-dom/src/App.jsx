/*

import React from 'react';
//Basic setup for react router dom

//Navigation bar

//home page
import { BrowserRouter , Routes, Route, Link} from 'react-router-dom';
function Home() {
return(
  <div>
    <h2>Home page</h2>
  </div>

)
}
//about page
function About(){
  return(
    
    <div>
      <h2>About page</h2>
    </div>
  )
}

//Add page page found

function PageNotFound(){
  return(
    <div>
      <h2>404 - Page Not Found </h2>
    </div>
  )
}

function App() {
  return(
    <BrowserRouter>
    <Link to="/"> Home Menu</Link>
    <Link to="/about">About Page</Link>

    <Routes>

    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/*" element={<PageNotFound/>}/>

    </Routes>


    </BrowserRouter>
  )
}
export default App;
*/


//Example mini project
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Dashboard from './Dashboard';
import Profile from './profile';
function App(){
  return(
    <BrowserRouter>
    <navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="profile" element={<profile/>}/>
          
          </Routes>

    </BrowserRouter>
  )
}
export default App;
