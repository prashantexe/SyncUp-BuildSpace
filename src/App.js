import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // State variables for storing user data
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");
  const [location, setLocation] = useState("");
  const [languages, setLanguages] = useState("");
  const [techStack, setTechStack] = useState("");
  const [designation, setDesignation] = useState("");


  const LANGUAGES = ["English", "Spanish", "French", "German", "Mandarin"];
  const TECH_STACK = ["React", "Angular", "Vue", "Node.js", "Express"];
  const DESIGNATION = ["Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX Designer"];
  

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

    // Check that all fields are filled out
    if (!username || !password || !name || !skill || !location) {
      alert("Please fill out all fields.");
      return;
    }

    // Create new user object with profile data
    const newUser = {
      username: username,
      password: password,
      profile: {
        name: name,
        skill: skill,
        location: location,
        languages:languages,
        techStack:techStack,
        designation:designation,
      },
    };

    // Add new user to list of users
    setUsers([...users, newUser]);

    // Reset form fields
    setUsername("");
    setPassword("");
    setName("");
    setLanguages("");
    setTechStack("");
    setSkill("");
    setLocation("");
    setDesignation("");
    setIsLoggedIn(true);
  };

  // Function to handle logout button click
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // JSX for login form
  const loginForm = (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
      <div className="form-column">
          <label className="labelll">
            Username:
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <label className="labelll">
            Name:
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
        </div>
        
          <label>
            Skill:
            <input
              type="text"
              value={skill}
              onChange={(event) => setSkill(event.target.value)}
            />
          </label>
          <label className="labelll">            Location:
            <input
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </label>

          <label>
            Tech-Stack:
            <input
              type="text"
              value={techStack}
              onChange={(event) => setTechStack(event.target.value)}
            />
          </label>

          <label className="labelll">
            Languages:
            <input
              type="text"
              value={languages}
              onChange={(event) => setLanguages(event.target.value)}
            />
          </label>

          <label>
            Designation:
            <input
              type="text"
              value={designation}
              onChange={(event) => setDesignation(event.target.value)}
            />
          </label>

          <button type="submit">Log In</button>
        
      </div>
    </form>
  );

  // JSX for user list with profiles
  const userList = (
    <div>
      <h2>Registered Users:</h2><br></br><br></br>
      <ul><center>
        {users.map((user, index) => (
          <h3><li key={index}>
            {user.profile.name}   -   {user.profile.skill}   -  {user.profile.location}  -   {user.profile.techStack}  -  {user.profile.languages}   -   {user.profile.designation}
          </li></h3>  
        ))}</center>
      </ul><br></br><br></br><br></br><br></br><br></br>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );


  return (
    <div>
            <h1>SyncUp - We Match Talents</h1>
      {isLoggedIn ? userList : loginForm}
    </div>
  );
}


export default App;
