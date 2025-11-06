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
  const [expandedItem, setExpandedItem] = useState(null); 
  const [newCompany, setNewCompany] = useState({ company: "", count: "" });

  // Fetch items from JSON server
  useEffect(() => {
    fetch("https://electronics-data-naho.onrender.com/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  // Toggle details view
  const toggleDetails = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  // Add a new company row
  const handleAddCompany = (itemId) => {
    const item = items.find((i) => i.id === itemId);
    const updatedDetails = [
      ...item.details,
      {
        id: Date.now(),
        company: newCompany.company,
        count: parseInt(newCompany.count) || 0,
      },
    ];

    fetch(`http://localhost:5000/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, details: updatedDetails }),
    })
      .then((res) => res.json())
      .then((updatedItem) => {
        setItems(items.map((i) => (i.id === itemId ? updatedItem : i)));
        setNewCompany({ company: "", count: "" });
      });
  };

  // Delete a company row
  const handleDeleteCompany = (itemId, companyId) => {
    const item = items.find((i) => i.id === itemId);
    const updatedDetails = item.details.filter((d) => d.id !== companyId);

    fetch(`http://localhost:5000/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, details: updatedDetails }),
    })
      .then((res) => res.json())
      .then((updatedItem) => {
        setItems(items.map((i) => (i.id === itemId ? updatedItem : i)));
      });
  };

  // Update company count (+ / -)
  const handleUpdateCount = (itemId, companyId, change) => {
    const item = items.find((i) => i.id === itemId);
    const updatedDetails = item.details.map((d) =>
      d.id === companyId ? { ...d, count: Math.max(0, d.count + change) } : d
    );

    fetch(`http://localhost:5000/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, details: updatedDetails }),
    })
      .then((res) => res.json())
      .then((updatedItem) => {
        setItems(items.map((i) => (i.id === itemId ? updatedItem : i)));
      });
  };

  return (
    <div className="container my-3">
      <h4>Inventory Log</h4>
      <table className="table table-striped table-bordered">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Description</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => toggleDetails(item.id)}
                  >
                    {expandedItem === item.id ? "Hide Details" : "Show Details"}
                  </button>
                </td>
              </tr>

              {/* Details Section */}
              {expandedItem === item.id && (
                <tr>
                  <td colSpan="4">
                    <h6>Companies</h6>
                    <ul className="list-group mb-2">
                      {item.details.map((d) => (
                        <li
                          key={d.id}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <span>
                            <strong>{d.company}</strong> — {d.count}
                          </span>
                          <div>
                            <button
                              className="btn btn-sm btn-secondary me-1"
                              onClick={() => handleUpdateCount(item.id, d.id, -1)}
                            >
                              -
                            </button>
                            <button
                              className="btn btn-sm btn-secondary me-2"
                              onClick={() => handleUpdateCount(item.id, d.id, 1)}
                            >
                              +
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDeleteCompany(item.id, d.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {/* Add new company form */}
                    <div className="d-flex">
                      <input
                        type="text"
                        placeholder="Company"
                        value={newCompany.company}
                        onChange={(e) =>
                          setNewCompany({ ...newCompany, company: e.target.value })
                        }
                        className="form-control me-2"
                      />
                      <input
                        type="number"
                        placeholder="Count"
                        value={newCompany.count}
                        onChange={(e) =>
                          setNewCompany({ ...newCompany, count: e.target.value })
                        }
                        className="form-control me-2"
                      />
                      <button
                        className="btn btn-success"
                        onClick={() => handleAddCompany(item.id)}
                      >
                        Add
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryLog;
