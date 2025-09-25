import React from "react";
import { itemsData } from "../data";

// const itemsData = [
//   { id: 1, name: "Monitor", description: "27-inch 4K monitor", image: "https://img.icons8.com/color/96/monitor.png" },
//   { id: 2, name: "Keyboard", description: "Mechanical keyboard with RGB lighting", image: "https://img.icons8.com/color/96/keyboard.png" },
//   { id: 3, name: "Headphones", description: "Noise-cancelling over-ear headphones", image: "https://img.icons8.com/color/96/headphones.png" },
//   { id: 4, name: "Mouse", description: "Wireless ergonomic mouse", image: "https://img.icons8.com/color/96/mouse.png" },
//   { id: 5, name: "Laptop", description: "15-inch laptop with Intel i7", image: "https://img.icons8.com/color/96/laptop.png" },
//   { id: 6, name: "CPU", description: "8-core high performance processor", image: "https://img.icons8.com/color/96/cpu.png" },
//   { id: 7, name: "GPU", description: "High-end graphics card", image: "https://img.icons8.com/color/96/graphics-card.png" },
//   { id: 8, name: "Motherboard", description: "ATX motherboard with Wi-Fi support", image: "https://img.icons8.com/color/96/motherboard.png" },
//   { id: 9, name: "RAM", description: "16GB DDR4 memory module", image: "https://img.icons8.com/color/96/ram.png" },
//   { id: 10, name: "Hard Drive", description: "2TB external HDD", image: "https://img.icons8.com/color/96/external-hard-drive.png" },
//   { id: 11, name: "SSD", description: "1TB NVMe solid state drive", image: "https://img.icons8.com/color/96/ssd.png" },
//   { id: 12, name: "Printer", description: "All-in-one wireless printer", image: "https://img.icons8.com/color/96/printer.png" },
//   { id: 13, name: "Router", description: "Dual-band Wi-Fi 6 router", image: "https://img.icons8.com/color/96/wifi-router.png" },
//   { id: 14, name: "Webcam", description: "HD 1080p webcam", image: "https://img.icons8.com/color/96/webcam.png" },
//   { id: 15, name: "Speakers", description: "2.1 channel desktop speakers", image: "https://img.icons8.com/color/96/speaker.png" },
// ];

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



function Items({ onItemClick }) { // receive click handler as prop
  return (
    <div className="container my-3">
      <div className="row g-3">
        {itemsData.map((item) => (
          <div key={item.id} className="col-6 col-md-4 col-lg-3">
            <div
              className="card shadow-sm"
              style={{ height: "250px", cursor: "pointer" }}
              onClick={() => onItemClick(item.id)} // clickable
            >
              <img
                src={item.image}
                className="card-img-top"
                alt={item.name}
                style={{
                  height: "120px",
                  width: "120px",
                  objectFit: "contain",
                  margin: "auto",
                  paddingTop: "10px",
                }}
              />
              <div className="card-body text-center p-2">
                <h5 className="card-title" style={{ fontSize: "1rem" }}>
                  {item.name}
                </h5>
                <p className="card-text" style={{ fontSize: "0.85rem" }}>
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Items;
