import React from "react";

function BottomNav({ activeTab, setActiveTab }) {
  return (
    // <ul className="nav nav-tabs nav-fill bg-light border-top position-fixed bottom-0 w-100">
      <ul className="nav nav-tabs nav-fill  border-top position-fixed bottom-0 w-100" style={{ backgroundColor: "#4C7C78" }}>
      {/* Items Tab */}
      <li className="nav-item" >
        <button
          className={`nav-link ${activeTab === "items" ? "active" : ""}`}
          onClick={() => setActiveTab("items") }
        >
          <i className="bi bi-box-seam"  style={{ color: "#F8BD3F" }}></i>
          <div style={{ color: "#F8BD3F" }}>Items</div>
        </button>
      </li>

      {/* Inventory Log Tab */}
      <li className="nav-item">
        <button
          className={`nav-link ${activeTab === "log" ? "active" : ""}`}
          onClick={() => setActiveTab("log")}
        >
          <i className="bi bi-journal-text" style={{ color: "#F8BD3F" }}></i>
          <div style={{ color: "#F8BD3F" }}>Inventory Log</div>
        </button>
      </li>

      {/* Levels Tab */}
      <li className="nav-item">
        <button
          className={`nav-link ${activeTab === "levels" ? "active" : ""}`}
          onClick={() => setActiveTab("levels")}
        >
          <i className="bi bi-bar-chart" style={{ color: "#F8BD3F" }}></i>
          <div style={{ color: "#F8BD3F" }}>Levels</div>
        </button>
      </li>
    </ul>
  );
}

export default BottomNav;
