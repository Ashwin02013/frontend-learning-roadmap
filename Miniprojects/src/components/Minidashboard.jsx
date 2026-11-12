import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { HashRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import "./MiniDashboard.css";

// ---------------------------------------------------------------
// Project 7 - React Mini Dashboard
// Combines: cards, user list, search/filter, routing, theme context
// and localStorage.
// ---------------------------------------------------------------

/* ---------- localStorage helpers ---------- */
// Read a value from localStorage; fall back to `fallback` if nothing is
// saved yet or the saved text is broken.
function loadSaved(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.error("Error loading " + key + ":", error);
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving " + key + ":", error);
  }
}

/* ---------- Theme context ---------- */
// 1. Create the context  2. Provide it at the top  3. Read it anywhere below
const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => loadSaved("dashboardTheme", "light"));

  // Save the theme every time it changes
  useEffect(() => {
    save("dashboardTheme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Small custom hook so components can write: const { theme } = useTheme();
function useTheme() {
  return useContext(ThemeContext);
}

/* ---------- Starter data ---------- */
const starterUsers = [
  { id: 1, name: "Ashwin", email: "ashwin@gmail.com", phone: "9876543210", city: "Coimbatore" },
  { id: 2, name: "Benson", email: "benson@gmail.com", phone: "9123456780", city: "Chennai" },
  { id: 3, name: "Darani", email: "darani@gmail.com", phone: "9123456781", city: "Tirunelveli" },
  { id: 4, name: "Aswath", email: "aswath@gmail.com", phone: "9123456782", city: "Coimbatore" },
  { id: 5, name: "Bathri", email: "bathri@gmail.com", phone: "9123456783", city: "Ooty" },
  { id: 6, name: "Saravana", email: "saravana@gmail.com", phone: "9123456784", city: "Chennai" },
];

/* ---------- Reusable stat card ---------- */
function StatCard({ label, value }) {
  return (
    <div className="dash-card">
      <p className="dash-card-label">{label}</p>
      <h3 className="dash-card-value">{value}</h3>
    </div>
  );
}

/* ---------- Page: Overview (cards) ---------- */
function Overview({ users }) {
  const cities = new Set(users.map((u) => u.city).filter(Boolean));
  const withPhone = users.filter((u) => u.phone).length;
  const recent = users.slice(-3).reverse();

  return (
    <div>
      <h2>Overview</h2>

      <div className="dash-card-grid">
        <StatCard label="Total users" value={users.length} />
        <StatCard label="Cities" value={cities.size} />
        <StatCard label="With phone number" value={withPhone} />
      </div>

      <h3>Recently added</h3>
      {recent.length === 0 ? (
        <p className="dash-muted">No users yet. Add some on the Users page.</p>
      ) : (
        <ul className="dash-recent">
          {recent.map((u) => (
            <li key={u.id}>
              <strong>{u.name}</strong> <span className="dash-muted">{u.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------- Page: Users (list + search + filter) ---------- */
function Users({ users, setUsers }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "" });
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("All");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addUser = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      setError("Name and email are required");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Enter a valid email");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
    };

    setUsers((prev) => [...prev, newUser]);
    setForm({ name: "", email: "", phone: "", city: "" });
    setError("");
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // Dropdown options come from the cities that actually exist
  const cityOptions = ["All", ...new Set(users.map((u) => u.city).filter(Boolean))];

  // Apply search AND city filter together
  const query = search.trim().toLowerCase();
  const visibleUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query);
    const matchesCity = cityFilter === "All" || u.city === cityFilter;
    return matchesSearch && matchesCity;
  });

  return (
    <div>
      <h2>Users</h2>

      <form className="dash-form" onSubmit={addUser}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
        <button type="submit">Add User</button>
      </form>
      {error && <p className="dash-error">{error}</p>}

      <div className="dash-filters">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
          {cityOptions.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "All cities" : c}
            </option>
          ))}
        </select>
      </div>

      <p className="dash-muted">
        Showing {visibleUsers.length} of {users.length} users
      </p>

      {visibleUsers.length === 0 ? (
        <p className="dash-muted">No users to show.</p>
      ) : (
        <div className="dash-card-grid">
          {visibleUsers.map((u) => (
            <div key={u.id} className="dash-card">
              <h3>{u.name}</h3>
              <p>{u.email}</p>
              {u.phone && <p>{u.phone}</p>}
              {u.city && <p className="dash-muted">{u.city}</p>}
              <button className="dash-delete" onClick={() => deleteUser(u.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Page: Settings (theme context + localStorage reset) ---------- */
function Settings({ resetUsers }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <h2>Settings</h2>

      <div className="dash-card dash-setting">
        <p>
          Current theme: <strong>{theme}</strong>
        </p>
        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "dark" : "light"} mode
        </button>
      </div>

      <div className="dash-card dash-setting">
        <p>Your users are saved in this browser. Reset brings back the starter list.</p>
        <button className="dash-delete" onClick={resetUsers}>
          Reset users
        </button>
      </div>
    </div>
  );
}

/* ---------- Layout: sidebar links + page area ---------- */
function DashboardLayout() {
  const { theme, toggleTheme } = useTheme();

  // The users live here, at the top, so every page shares the same list
  const [users, setUsers] = useState(() => loadSaved("dashboardUsers", starterUsers));

  useEffect(() => {
    save("dashboardUsers", users);
  }, [users]);

  const linkClass = ({ isActive }) => (isActive ? "dash-link active" : "dash-link");

  return (
    <div className={"dash " + theme}>
      <header className="dash-header">
        <h1>Mini Dashboard</h1>
        <button className="dash-theme-btn" onClick={toggleTheme}>
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
      </header>

      <div className="dash-body">
        <nav className="dash-nav">
          <NavLink to="/" end className={linkClass}>Overview</NavLink>
          <NavLink to="/users" className={linkClass}>Users</NavLink>
          <NavLink to="/settings" className={linkClass}>Settings</NavLink>
        </nav>

        <main className="dash-main">
          <Routes>
            <Route path="/" element={<Overview users={users} />} />
            <Route path="/users" element={<Users users={users} setUsers={setUsers} />} />
            <Route
              path="/settings"
              element={<Settings resetUsers={() => setUsers(starterUsers)} />}
            />
            {/* Any unknown address goes back to Overview */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

/* ---------- Exported component ---------- */
// HashRouter keeps the page in the URL after a "#" (e.g. #/users), so it
// works inside this tabbed app without any server setup.
function MiniDashboard() {
  return (
    <ThemeProvider>
      <HashRouter>
        <DashboardLayout />
      </HashRouter>
    </ThemeProvider>
  );
}

export default MiniDashboard;