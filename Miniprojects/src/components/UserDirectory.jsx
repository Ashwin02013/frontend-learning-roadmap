import { useState } from "react";

const starterUsers = [
  { id: 1, name: "Ashwin", email: "ashwin@gmail.com", phone: "9876543210", city: "Coimbatore" },
  { id: 2, name: "benson", email: "benson@gmail.com", phone: "9123456780", city: "Chennai" },
  { id: 3, name: "darani", email: "benson@gmail.com", phone: "9123456780", city: "tirunelveli" },
  { id: 4, name: "aswath", email: "benson@gmail.com", phone: "9123456780", city: "cuddalore" },
  { id: 5, name: "bathri", email: "benson@gmail.com", phone: "9123456780", city: "ooty" },
  { id: 6, name: "padri", email: "benson@gmail.com", phone: "9123456780", city: "erode" },
  { id: 7, name: "saravana", email: "benson@gmail.com", phone: "9123456780", city: "conoor" },
  { id: 8, name: "victor", email: "benson@gmail.com", phone: "9123456780", city: "kanyakumari" },
  { id: 9, name: "niviesh", email: "benson@gmail.com", phone: "9123456780", city: "salem" },
  { id: 10, name: "jagadeeswaran", email: "benson@gmail.com", phone: "9123456780", city: "ladakh" },
];

function UserDirectory() {
  const [users, setUsers] = useState(starterUsers);
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "" });
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

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

    setUsers([...users, newUser]);
    setForm({ name: "", email: "", phone: "", city: "" });
    setError("");
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const query = search.trim().toLowerCase();
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query)
  );

  return (
    <div className="users">
      <h2>User Directory</h2>

      <form className="user-form" onSubmit={addUser}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
        <button type="submit">Add User</button>
      </form>
      {error && <p className="users-error">{error}</p>}

      <input
        className="users-search"
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p className="users-count">
        Showing {filteredUsers.length} of {users.length} users
      </p>

      {filteredUsers.length === 0 ? (
        <p className="users-status">No users to show.</p>
      ) : (
        <div className="users-grid">
          {filteredUsers.map((u) => (
            <div key={u.id} className="user-card">
              <h3>{u.name}</h3>
              <p>{u.email}</p>
              {u.phone && <p>{u.phone}</p>}
              {u.city && <p className="user-company">{u.city}</p>}
              <button className="user-delete" onClick={() => deleteUser(u.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDirectory;