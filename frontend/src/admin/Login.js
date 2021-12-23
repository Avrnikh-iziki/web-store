import React, { useState, useContext } from "react";
import axios from "axios";
import userContext from "../userContext";
import './login.css'


function Login() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [pass_err, setpass_err] = useState("");
  const [user_err, setuser_err] = useState("");

  const isAuth = useContext(userContext)

  const login = e => {
    e.preventDefault()
    const data = {
      username: loginUsername,
      password: loginPassword,
    }

    axios
      .post("/api/admin/login", data)
      .then((res) => {
        const { stat, errs } = res.data
        isAuth.isAuth = isAuth.setisAuth(stat)

        if (errs) {
          if (errs.username) setuser_err(errs.username)
          else setuser_err("")
          if (errs.passw) setpass_err(errs.passw)
          else setpass_err("")
        }
        if (!stat) {
          setTimeout(() => {
            setpass_err("")
            setuser_err("")

          }, 2000)
        }

      })
  };

  return (
    <form>
      <div className="App" style={{ backgroundImage: "url(/Gimage/login.jpg)" }}>
        <div className="dar">
          <div className="flex-column flex-wrap ">
            <h1>Login</h1>
            <div className="p-2">
              <input
                placeholder="username"
                onChange={(e) => setLoginUsername(e.target.value)}
              />
              {user_err && <div className="err-message"><i className="fas fa-times"></i>{user_err}</div>}

            </div>
            <div className="p-2">
              <input
                type="password"
                placeholder="password"
                autoComplete="on"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              {pass_err && <div className="err-message"><i className="fas fa-times"></i>{pass_err}</div>}
            </div>
            <button type="submit" className="btn btn-primary" onClick={login} > login </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;