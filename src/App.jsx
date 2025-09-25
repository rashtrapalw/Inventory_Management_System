import React, { useState } from "react";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import Items from "./components/Items";
import InventoryLog from "./components/InventoryLog";
import Levels from "./components/Levels";



function App() {
  const [activeTab, setActiveTab] = useState("items");
  




  return (
    <div className="d-flex flex-column vh-100" style={{ backgroundColor: "#64aff048" }}>
      <Navbar />

    
       
      <div className="flex-grow-1 overflow-auto">
        {activeTab === "items" && <Items />}
        {activeTab === "log" && <InventoryLog />}
        {activeTab === "levels" && <Levels />}
      </div>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>

      
   

  );
}
export default App;   

