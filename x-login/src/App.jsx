import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);


  function handleSubmit(e) {
    e.preventDefault();
    if(name==="user" && password === "password"){
      setShowLogin(true);
    }
  }

  return (
    <>
      <h1>Login Page</h1>
      { showLogin ? (
        <p>Welcome, user!</p>
      ) : (
        <div className="App">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">UserName: </label>
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
