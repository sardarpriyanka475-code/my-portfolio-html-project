/*import { useState } from 'react';

function App() {
  const [count, setCount] = useState(10);

  function increaseCount() {
    setCount(count + 1);
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Like / Cart Counter</h1>

      <h2>Count: {count}</h2>

      <button onClick={increaseCount}>
        Increase
      </button>

      <button
        onClick={() => setCount(0)}
        style={{ marginLeft: '10px' }}
      >
        Reset
      </button>
    </div>
  );
}

export default App;*/


//useState() - hook in react
//it is SPECIAL react variable - it will store the updated value and also it will update that data\value on UI-screen
//syntax - const [MainVariableName - Show on your Screen, setvariableName-updated value]=useState(inital value)



/*
import { useState } from 'react';

function App() {
  const [like, setLike] = useState(17);

  function increaseCount() {
    setLike(like + 1);
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Like / Cart Counter</h1>
      <h2>Count: {like}</h2>
      <button onClick={increaseCount}>
        Increase
      </button>
    </div>
  );
}

export default App;
*/


/*
import { useState } from 'react';
import React from 'react';
function App(){
  const [show,setShow]= useState(false)
 
  return(
    <div>
      <input type={show ? "text":"password"} placeholder="enter Password"/>
      <button onClick={() => setShow(!show)}>
        Show/Hide

      </button>
    </div>
  )

}
export default App; 
*/

//Example  4 - follow button

import React from "react";
import {useState} from "react";

function App(){

  const [follow,setfollow] = useState(false)


  return(
    <div>
      <button onClick={() => setfollow(!follow)}>
        {follow ? "Unfollow" : "Follow"}
      </button>
    </div>
  )
}

