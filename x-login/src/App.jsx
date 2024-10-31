import { useState } from "react";
import "./App.css";
import Status from "./Status";

function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (name === "user" && password === "password") {
      setShowLogin(true);
      setErrorMessage(""); 
    } else {
      setErrorMessage("Invalid username or password");
    }
  }

  return (
    <>
      <h1>Login Page</h1>
      { showLogin ? (
        <Status text="Welcome, user!" />
      ) : (
        <div className="App">
          {errorMessage && <p className="error">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username : </label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="username"
                id="username"
                value={name}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password: </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                value={password}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
}

export default App;
