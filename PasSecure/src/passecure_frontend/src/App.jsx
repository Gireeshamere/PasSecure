// App.jsx
import React, { useState } from "react";
import "./index.scss"
import Signup from "./Signup";
import { Principal } from "@dfinity/principal";
import { passecure_backend } from "../../declarations/passecure_backend";

const App = () => {
  const [page, setPage] = useState("main");
  const [apps, setApps] = useState({});
  const [appName, setAppName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedPassword, setSelectedPassword] = useState(null);

  async function addApp() {
      console.log ("appName", appName)
      console.log ("appPass", password)
      var  Appdata= {
        prin :( Principal.fromText(localStorage.getItem("prin"))),
        appName: appName,
        appPass: password,

      };
      console.log("Appdata", Appdata);
      var awser= await passecure_backend.SetAppData(Appdata);
      console.log("After pushing", awser)
    }
  

  

  return (
    <div className="app">
      <Navbar setPage={setPage} />
      {page === "main" ? (
        <MainPage setPage={setPage} />
      ) : (
        <SecurePage
          apps={apps}
          appName={appName}
          password={password}
          setAppName={setAppName}
          setPassword={setPassword}
          addApp={addApp}
          setSelectedPassword={setSelectedPassword}
          selectedPassword={selectedPassword}
        />
      )}
    </div>
  );
};

const Navbar = ({ setPage }) => (
  <nav className="navbar">
    <h1>PasSecure</h1>
    <div>
      <Signup />
      {/* <button className="nav-button">Connect</button> */}
      <button onClick={() => setPage("main")} className="nav-button">Home</button>
      <button onClick={() => setPage("secure")} className="nav-button">Secure Passwords</button>
    </div>
  </nav>
);

const MainPage = ({ setPage }) => (
  <div className="main-page">
    <section className="hero-section">
      <h2>Secure Your Application Passwords</h2>
      <p>Store and access your passwords securely in one place.</p>
      <button onClick={() => setPage("secure")} className="main-button">Secure Passwords</button>
    </section>
    <section className="features-section">
      <h3>Features</h3>
      <ul>
        <li>Secure storage of passwords</li>
        <li>Easy access to saved applications</li>
        <li>Responsive design</li>
      </ul>
    </section>
    <footer className="footer">© 2024 Password Securing Platform</footer>
  </div>
);

const SecurePage = ({
  apps,
  appName,
  password,
  setAppName,
  setPassword,
  addApp,
  setSelectedPassword,
  selectedPassword,
}) => (
  <div className="secure-page">
    <h2>Secure Your Passwords</h2>
    <div className="input-section">
      <input
        type="text"
        placeholder="Application Name"
        value={appName}
        onChange={(e) => setAppName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={addApp} className="add-button">Add</button>
    </div>
    <div className="apps-section">
      <h3>Saved Applications</h3>
      <div className="apps-list">
        {Object.keys(apps).map((app) => (
          <button
            key={app}
            className="app-button"
            onClick={() => setSelectedPassword(apps[app])}
          >
            {app}
          </button>
        ))}
      </div>
      {selectedPassword && (
        <div className="password-display">
          <strong>Password:</strong> {selectedPassword}
        </div>
      )}
    </div>
  </div>
);

export default App;
