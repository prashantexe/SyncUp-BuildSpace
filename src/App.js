import React, { useState, useEffect } from "react";

function App() {
  // State variables for storing user data
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load users from local storage on app mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  // Save users to local storage whenever the users state changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check that both username and password fields are filled out
    if (!username || !password) {
      alert("Please fill out both username and password fields.");
      return;
    }

    // Create new user object
    const newUser = {
      username: username,
      password: password,
    };

    // Add new user to list of users
    setUsers([...users, newUser]);

    // Reset form fields
    setUsername("");
    setPassword("");
    setIsLoggedIn(true);
  };

  // Function to handle logout button click
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // JSX for login form
  const loginForm = (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Log In</button>
    </form>
  );

  // JSX for user list
  const userList = (
    <div>
      <h2>Registered Users:</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );

  // Render login form and user list
  return (
    <div style={{ textAlign: "center" }}>
      <h1>User Registration App</h1>
      {isLoggedIn ? userList : loginForm}
    </div>
  );
}

export default App;
