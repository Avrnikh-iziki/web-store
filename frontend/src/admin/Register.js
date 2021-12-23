import React, { useState } from "react";
import axios from "axios";
import './login.css'

function Register() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  
  const data = {
    username: registerUsername,
    password: registerPassword,
  }
  const register = () => {
    axios
      .post("/api/admin/register", data)
      .then(res => console.log(res.data))
  };

  return (
    <div className="App " style={{ backgroundImage: "url(/login.jpg)"}}>
      <div className="dar">
        <div className="flex-column flex-wrap ">
          <h1>Register</h1>
          <div className="p-2">
            <input
              placeholder="username"
              onChange={(e) => setRegisterUsername(e.target.value)}
            />
          </div>
          <div className="p-2">
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
          </div>
          <button type="button" className="btn btn-success" onClick={register}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Register;