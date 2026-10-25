
import React from 'react';
import './App.css'
function App(){
 let usernaame = "Priyanka"

 function Greet(){
  alert('Hii Guys')
 }

  return(


    <div className="App">
    
    <nav>
      <ul>
        <li>Home</li>
        <li>Support </li>
      </ul>
    </nav>
      <h1>This is React Session</h1>
      <h2> My Name is: {usernaame} </h2>
      <p> Good Evening</p>


      <button onClick={Greet}>Greet</button>
      <input type="text" placeholder="Enter Your name"/>
    </div>
  )
}
export default App;