// import React from "react";
// import { itemsData } from '../data'

// function InventoryLog() {
//   return (
//     <div className="container my-3">
//       <h4>Inventory Log</h4>
//       <table className="table table-striped table-bordered table-hover">
//         <thead className="table-light">
//           <tr>
//             <th scope="col">#</th>
//             <th scope="col">Item</th>
//             <th scope="col">Description</th>
//             <th scope="col">Action</th>
//             <th scope="col">Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {itemsData.map((item, index) => (
//             <tr key={item.id}>
//               <th scope="row">{index + 1}</th>
//               <td>{item.name}</td>
//               <td>{item.description}</td>
//               <td>Added</td> {/* You can customize actions */}
//               <td>{new Date().toISOString().split("T")[0]}</td> {/* Today’s date */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default InventoryLog;
import React, { useEffect, useState } from "react";

function InventoryLog() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", description: "", image: "" });

  // Fetch items on page load
  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  // Add item
  const handleAdd = () => {
    fetch("http://localhost:5000/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then((item) => {
        setItems([...items, item]); // update state instantly
        setNewItem({ name: "", description: "", image: "" }); // clear form
      });
  };

  // Delete item
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/items/${id}`, { method: "DELETE" })
      .then(() => setItems(items.filter((item) => item.id !== id)));
  };

  // Update item
  const handleUpdate = (id, updatedItem) => {
    fetch(`http://localhost:5000/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(items.map((item) => (item.id === id ? data : item)));
      });
  };

  return (
    <div className="container my-3">
      <h4>Inventory Log</h4>

      {/* Add Form */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newItem.image}
          onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
          className="form-control mb-2"
        />
        <button className="btn btn-primary" onClick={handleAdd}>Add Item</button>
      </div>

      {/* Items Table */}
      <table className="table table-striped table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Description</th>
            <th>Action</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <th>{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleUpdate(item.id, { ...item, name: item.name + " (Updated)" })}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
              <td>{new Date().toISOString().split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryLog;
