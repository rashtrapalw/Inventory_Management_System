import React from "react";

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 ${
          isOpen ? "d-block" : "d-none"
        }`}
        style={{ zIndex: 1040 }}
        onClick={onClose} // click outside closes sidebar
      ></div>

      {/* Sidebar */}
      <div
        className="position-fixed top-0 start-0 h-100 bg-light shadow-lg p-3"
        style={{
          width: "250px",
          zIndex: 1050,
          transition: "transform 0.3s ease-in-out",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <h5 className="mb-4">Menu</h5>
        <nav className="nav flex-column">
          <a className="nav-link text-dark mb-2" href="#">
            📋 Inventory Log
          </a>
          <a className="nav-link text-dark mb-2" href="#">
            📊 Levels
          </a>
          <a className="nav-link text-dark mb-2" href="#">
            🛠 Tools
          </a>
          <a className="nav-link text-dark mb-2" href="#">
            ⚙ Settings
          </a>
          <a className="nav-link text-dark mb-2" href="#">
            ℹ About
          </a>
          <a className="nav-link text-dark mb-2" href="#">
            🚪 Log Out
          </a>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
