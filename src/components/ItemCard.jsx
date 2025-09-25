// import React from "react";

// // Reusable ItemCard component using plain Bootstrap
// function ItemCard({ item }) {
//   return (
//     <div className="col-6 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
//       <div
//         className="card m-2 shadow-sm"
//         style={{ width: "18rem", backgroundColor: "#f8f9fa" }}
//       >
//         {/* Optional image: removed if you don't want photos */}
//         {/* <img
//           src={item.image}
//           className="card-img-top"
//           alt={item.name}
//           style={{ height: "120px", objectFit: "contain" }}
//         /> */}

//         <div className="card-body">
//           <h5 className="card-title">{item.name}</h5>
//           <p className="card-text">{item.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ItemCard;

import React from "react";

function ItemCard({ item }) {
  return (
    <div className="card shadow-sm h-100">
      <img
        src={item.image}
        alt={item.name}
        className="card-img-top"
        style={{ height: "120px", objectFit: "contain" }}
      />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        {/* <p className="card-text">{item.description}</p> */}
      </div>
    </div>
  );
}

export default ItemCard;
