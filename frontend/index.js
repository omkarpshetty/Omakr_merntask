const { useState } = React;
const API = "http://localhost:3000";

function App() {
  const [view, setView] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function signup() {
    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    alert(data.message);
    if (res.ok) setView("login");
  }

  async function login() {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setMessage(`Access Granted, ${username}`);
      setView("home");
    } else {
      alert(data.message);
    }
  }

  async function checkAuth() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/auth`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    alert(data.message || "Auth failed");
  }

  function logout() {
    localStorage.removeItem("token");
    setView("login");
  }

  return (
    <div className="container">
      <h1 className="logo">Cosmo<span>Vault</span></h1>
      <h3 className="subtitle">[ Cyber Neon Access Node ]</h3>

      {view === "signup" && (
        <>
          <input
            placeholder="Create username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Create password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={signup}>Sign Up</button>
          <p>
            Already registered?{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); setView("login"); }}>
              Login
            </a>
          </p>
        </>
      )}

      {view === "login" && (
        <>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login}>Login</button>
          <p>
            Need an account?{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); setView("signup"); }}>
              Sign Up
            </a>
          </p>
        </>
      )}

      {view === "home" && (
        <div className="home-card">
          <h3>{message}</h3>
          <p>Terminal Access Unlocked :: Data Vault Ready</p>
          <div className="button-group">
    
            <button className="logout" onClick={logout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
