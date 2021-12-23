import React, { useState } from "react";
import Socket from "./components/Socket";
import "./App.css";
import Chat from "./components/Chat";

function App() {
  const [username, setUsername] = useState("");
  const [register, setRegister] = useState(false);

  const registered = (e) => {
    e.preventDefault();
    console.log("Votre nom est " +username);
    if (username !== "") {
      setRegister(true);
    }
  };
  return (
    
    <div className="container mt-5">
      <div className="row">
      <div className="card col-md-12 m-5 mx-auto" >
        
        {!register && (           
          <form onSubmit={registered}>
            <label htmlFor="" className="form-label">Insert your username</label>
            <input className="form-control em-2" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />         
             <button type="submit" className="btn btn-primary m-2">Go to chat</button>      
            
          </form>
        )}
        { register && <Chat username={username} />}
        
        </div>
        
      </div>
      
    </div>
  );
}

export default App;