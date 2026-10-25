
import React from "react";
import "./App.css";

function App() {
  const username = "Priyanka";

  function Greet() {
    alert("Hello Everyone");
  }

  return (
    <div className="app">
      <nav>
        <ul>
          <li>Home</li>
          <li>Support</li>
        </ul>
      </nav>

      <h1 className="head">This is React Session</h1>

      <h2>My Name is: {username}</h2>

      <p>Good Evening</p>

      <button onClick={Greet}>Click Me</button>

      <br />
      <br />

      <input type="text" placeholder="Enter Your Name" />
    </div>
  );
}

export default App;