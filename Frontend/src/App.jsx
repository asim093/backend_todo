import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);  // Create a ref for the input field

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/allusers");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);  // Fetch data on mount

  const handleEdit = async (id) => {
    try {
      const updatedTitle = prompt("Enter Your Updated Title");

      if (!updatedTitle) {
        alert("Title cannot be empty!");
        return;
      }

      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedTitle,
        }),
      });

      fetchData();
      if (!res.ok) {
        throw new Error("Failed to update data");
      }
      const data = await res.json();
      console.log("Updated data:", data);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete data");
      }
      console.log("Deleted item:", id);
      fetchData();  // Refetch data after deletion
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAdd = async () => {
    const newItem = inputRef.current.value;  // Get the value from the input field via the ref

    if (!newItem) {
      alert("Please enter a valid title.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newItem,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add item");
      }

      fetchData();  // Refetch data to include the new item
      inputRef.current.value = "";  // Clear the input field after adding
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div
      className="main-container"
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "24px",
          color: "#333",
          marginBottom: "20px",
        }}
      >
        Data List
      </h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Some Text"
          ref={inputRef}  // Attach the ref to the input
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "calc(100% - 110px)",
            borderRadius: "5px",
            border: "1px solid #ddd",
            marginRight: "10px",
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ADD
        </button>
      </div>

      <div
        className="todo_container"
        style={{
          listStyleType: "none",
          padding: "0",
          margin: "0",
        }}
      >
        {data.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 15px",
              marginBottom: "10px",
              backgroundColor: "#f9f9f9",
              border: "1px solid #ddd",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span style={{ fontSize: "16px", color: "#555" }}>
              {item.title}
            </span>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleEdit(item.id)}
                style={{
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "3px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                style={{
                  backgroundColor: "#DC3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "3px",
                  padding: "5px 10px",
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
};

export default App;
