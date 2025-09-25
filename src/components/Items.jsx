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

import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard"; // still reusable for each item

function Items() {
  const [items, setItems] = useState([]);

  // Fetch data from JSON Server
  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  return (
    <div className="container my-4">
      <div className="row">
        {items.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <ItemCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Items;
