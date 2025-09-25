import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ id: null, title: "", author: "", price: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");   // ✅ For confirmation/error messages
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:2005/api/books");
      setBooks(res.data);
    } catch (err) {
      setError("❌ Failed to fetch books.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:2005/api/books/${form.id}`, form);
        setMessage("✅ Book updated successfully!");
      } else {
        await axios.post("http://localhost:2005/api/books", form);
        setMessage("✅ Book added successfully!");
      }
      setForm({ id: null, title: "", author: "", price: "" });
      setIsEditing(false);
      setError("");
      fetchBooks();
    } catch (err) {
      setError("❌ Something went wrong while saving the book.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2005/api/books/${id}`);
      setMessage("🗑️ Book deleted successfully!");
      setError("");
      fetchBooks();
    } catch (err) {
      setError("❌ Failed to delete book.");
    }
  };

  const handleEdit = (book) => {
    setForm(book);
    setIsEditing(true);
    setMessage("");
    setError("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>📚 Book Management</h2>

      {/* ✅ Feedback messages */}
      {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{
            background: isEditing ? "#f39c12" : "#4CAF50",
            color: "white",
            padding: "8px 15px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {isEditing ? "Update Book" : "Add Book"}
        </button>
      </form>

      {/* Card Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {books.map((b) => (
          <div
            key={b.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              background: "#fff",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>{b.title}</h3>
            <p style={{ margin: "5px 0", color: "#555" }}>
              <strong>Author:</strong> {b.author}
            </p>
            <p style={{ margin: "5px 0", color: "#555" }}>
              <strong>Price:</strong> ₹{b.price}
            </p>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleEdit(b)}
                style={{
                  background: "#3498db",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(b.id)}
                style={{
                  background: "#e74c3c",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
