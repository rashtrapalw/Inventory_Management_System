// import React from "react";
// import { itemsData } from "../data";

// function Items() {
//   return (
//    <div className="container my-3">
//   <div className="row g-3">
//     {itemsData.map((item) => (
//       <div key={item.id} className="col-6 col-md-4 col-lg-3">
//         <div
//           className="card shadow-sm"
//           style={{ height: "250px", cursor: "pointer" }} // decreased height
//         >
//           <img
//             src={item.image}
//             className="card-img-top"
//             alt={item.name}
//             style={{ height: "120px", width: "120px", objectFit: "contain", margin: "auto", paddingTop: "10px" }} // bigger image, centered
//           />
//           <div className="card-body text-center p-2"> {/* reduced padding */}
//             <h5 className="card-title" style={{ fontSize: "1rem" }}>{item.name}</h5>
//             <p className="card-text" style={{ fontSize: "0.85rem" }}>{item.description}</p>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>

//   );
// }

// export default Items;




// import React, { useEffect, useState } from "react";
// import ItemCard from "./ItemCard";

// function Items() {
//   const [items, setItems] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);

//   // fetch items from JSON server
//   useEffect(() => {
//     fetch("http://localhost:5000/items")
//       .then((res) => res.json())
//       .then((data) => setItems(data));
//   }, []);

//   return (
//     <div className="container my-3">
//       <div className="row g-3">
//         {items.map((item) => (
//           <div key={item.id} className="col-6 col-md-3">
//             <ItemCard item={item} onClick={setSelectedItem} />
//           </div>
//         ))}
//       </div>

//       {/* Modal for Item Details */}
//       {selectedItem && (
//         <div
//           className="modal fade show"
//           style={{
//             display: "block",
//             background: "rgba(0,0,0,0.5)" // simple dark overlay
//           }}
//           tabIndex="-1"
//         >
//           <div className="modal-dialog modal-lg modal-dialog-centered">
//             <div className="modal-content">
//               {/* Header */}
//               <div className="modal-header">
//                 <h5 className="modal-title">Details</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setSelectedItem(null)}
//                 ></button>
//               </div>

//               {/* Body */}
//               <div className="modal-body">
//                 {/* Item Info */}
//                 <div className="d-flex align-items-center mb-3">
//                   <img
//                     src={selectedItem.image}
//                     alt={selectedItem.name}
//                     style={{ width: "100px", height: "100px", marginRight: "15px" }}
//                   />
//                   <div>
//                     <p className="mb-1">
//                       <strong>Total Stock Available:</strong>{" "}
//                       {selectedItem.totalStock}
//                     </p>
//                     <p className="mb-1">
//                       <strong>Name:</strong> {selectedItem.name}
//                     </p>
//                     <p className="mb-1">
//                       <strong>Description:</strong> {selectedItem.description}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Inventory Change Log */}
//                 <h6 className="mt-3">Inventory Change Log</h6>
//                 <table className="table table-bordered table-striped">
//                   <thead className="table-light">
//                     <tr>
//                       <th>DateTime</th>
//                       <th>Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {selectedItem.inventoryLog && selectedItem.inventoryLog.length > 0 ? (
//                       selectedItem.inventoryLog.map((log, index) => (
//                         <tr key={index}>
//                           <td>{log.date}</td>
//                           <td>{log.amount}</td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="2" className="text-center text-muted">
//                           No records found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Footer */}
//               <div className="modal-footer">
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => setSelectedItem(null)}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Items;





import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

function Items() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null); 
  const [newCompany, setNewCompany] = useState({ company: "", count: "" });

  // Fetch items
  useEffect(() => {
    fetch("https://electronics-data-naho.onrender.com/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const toggleDetails = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const handleAddCompany = (itemId) => {
    if (!newCompany.company || !newCompany.count) return;

    const item = items.find((i) => i.id === itemId);
    const updatedDetails = [
      ...(item.details || []),
      { id: Date.now(), company: newCompany.company, count: parseInt(newCompany.count) },
    ];

      fetch(`https://electronics-data-naho.onrender.com/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, details: updatedDetails }),
    })
      .then((res) => res.json())
      .then((updatedItem) => {
        setItems(items.map((i) => (i.id === itemId ? updatedItem : i)));
        setSelectedItem(updatedItem);
        setNewCompany({ company: "", count: "" });
      });
  };

  const handleUpdateCount = (itemId, companyId, delta) => {
    const item = items.find((i) => i.id === itemId);
    const updatedDetails = (item.details || []).map((d) =>
      d.id === companyId ? { ...d, count: Math.max(0, d.count + delta) } : d
    );

    fetch(`https://electronics-data-naho.onrender.com/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, details: updatedDetails }),
    })
      .then((res) => res.json())
      .then((updatedItem) => {
        setItems(items.map((i) => (i.id === itemId ? updatedItem : i)));
        setSelectedItem(updatedItem);
      });
  };

  const handleDeleteCompany = (itemId, companyId) => {
    const item = items.find((i) => i.id === itemId);
    const updatedDetails = (item.details || []).filter((d) => d.id !== companyId);

    fetch(`https://electronics-data-naho.onrender.com/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, details: updatedDetails }),
    })
      .then((res) => res.json())
      .then((updatedItem) => {
        setItems(items.map((i) => (i.id === itemId ? updatedItem : i)));
        setSelectedItem(updatedItem);
      });
  };

  return (
    <div className="container my-3">
      <div className="row g-3">
        {items.map((item) => (
          <div key={item.id} className="col-6 col-md-3">        
            <ItemCard item={item} onClick={setSelectedItem} />
          </div>
        ))}
      </div>


        {/* Blur background */}  
      {selectedItem && <div className="modal-backdrop-blur"></div>}
      {/* Modal Popup */}
      {selectedItem && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
            {/* <div className="modal-content" style={{ backgroundColor: "#e5e4ec86" }}> */}

              <div className="modal-header">
                <h5 className="modal-title">{selectedItem.name} Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedItem(null)}
                ></button>
              </div>

              <div className="modal-body">
                {/* Responsive layout: image left, details right */}
                <div className="row">
                 {selectedItem.image && (
                    <div className="col-md-4 mb-3 mb-md-0 text-center">
                      <img
                        src={selectedItem.image}
                        alt={selectedItem.name}
                        className="img-fluid rounded"
                        style={{ maxHeight: "150px", objectFit: "contain" }}
                      />
                    </div>
                     

                  )}
                  <div className="col-md-8">
                    <p><strong>Description:</strong> {selectedItem.description}</p>
                    {selectedItem.totalStock !== undefined && (
                      <p><strong>Total Stock:</strong> {selectedItem.totalStock}</p>
                    )}

                    {/* Details Button */}
                    <button
                      className="btn btn-sm btn-info mb-3"
                      onClick={() => toggleDetails(selectedItem.id)}
                    >
                      {expandedItem === selectedItem.id ? "Hide Details" : "Show Details"}
                    </button>

                    {/* Expanded Details */}
                    {expandedItem === selectedItem.id && (
                      <div>
                        <h6>Companies</h6>
                        <ul className="list-group mb-2">
                          {selectedItem.details && selectedItem.details.length > 0 ? (
                            selectedItem.details.map((d) => (
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
                                    onClick={() =>
                                      handleUpdateCount(selectedItem.id, d.id, -1)
                                    }
                                  >
                                    -
                                  </button>
                                  <button
                                    className="btn btn-sm btn-secondary me-2"
                                    onClick={() =>
                                      handleUpdateCount(selectedItem.id, d.id, 1)
                                    }
                                  >
                                    +
                                  </button>
                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() =>
                                      handleDeleteCompany(selectedItem.id, d.id)
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                              </li>
                            ))
                          ) : (
                            <li className="list-group-item text-center text-muted">
                              No companies found
                            </li>
                          )}
                        </ul>

                        {/* Add new company */}
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
                            onClick={() => handleAddCompany(selectedItem.id)}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedItem(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Items;
