

// import React from "react";

// function ItemCard({ item }) {
//   return (
//     <div className="card shadow-sm h-100">
//       <img
//         src={item.image}
//         alt={item.name}
//         className="card-img-top"
//         style={{ height: "120px", objectFit: "contain" }}
//       />
//       <div className="card-body">
//         <h5 className="card-title">{item.name}</h5>
//         {/* <p className="card-text">{item.description}</p> */}
//       </div>
//     </div>
//   );
// }

// export default ItemCard;


import React from "react";
import "./itemCard.css"
function ItemCard({ item, onClick }) {
  return (
    <div
      className="card shadow-sm h-100"
      style={{ cursor: "pointer" }}
      onClick={() => onClick(item)} // pass clicked item to parent
    >
      <img
        src={item.image}
        alt={item.name}
        className="card-img-top"
        style={{ height: "120px", objectFit: "contain" }}

       
      />
      <div className="card-body text-center">
        <h5 className="card-title">{item.name}</h5>
      </div>
    </div>
  );
}

export default ItemCard;
