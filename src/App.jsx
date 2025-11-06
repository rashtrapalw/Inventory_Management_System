
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import Items from "./components/Items";
import InventoryLog from "./components/InventoryLog";
import Levels from "./components/Levels";

function App() {
  const [activeTab, setActiveTab] = useState("items");
  const [items, setItems] = useState([]); // store items for Levels

  // Fetch items from backend
  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then((data) => setItems(data.items)); // assuming your JSON has { items: [...] }
  }, []);

  return (
    // background color 
    <div className="d-flex flex-column vh-100" style={{ backgroundColor: "#F8BD3F" }}>
      {/* <div className="d-flex flex-column vh-100" style={{ backgroundColor: "#64aff048" }}> */}
      <Navbar />

      <div className="flex-grow-1 overflow-auto">
        {activeTab === "items" && <Items />}
        {activeTab === "log" && <InventoryLog />}
        {activeTab === "levels" && <Levels items={items} />}
      </div>
    
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;



