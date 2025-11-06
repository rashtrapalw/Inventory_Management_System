

import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Sidebar from "./Sidebar";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  return (
    <>
    {/*navbar color  */}
      {/* <nav className="navbar navbar-light bg-light shadow-sm"  >   */}
        <nav className="navbar navbar-light  shadow-sm" style={{ backgroundColor: "#4C7C78" }}>    
        <div className="container-fluid d-flex align-items-center position-relative">

          {/* Menu Icon on the left */}
          <button
            className="btn btn-outline-secondary p-1 me-2"
            type="button"
            aria-label="Toggle menu"
            onClick={() => setSidebarOpen(true)}
            style={{ color: "#f4f9f9ff" }}
          >
            <AiOutlineMenu size={25} />
          </button>

          {/* Centered Brand */}
       {/* Brand on the left */}
                <div className="d-flex align-items-center">
                  <a
                    className="navbar-brand d-flex align-items-center m-0 p-0"
                    href="#"
                  >
                    <i className="bi bi-box-seam me-1" style={{ color: "#f4f9f9ff" }}></i>
                    <span className="fw-bold" style={{ color: "#f4f9f9ff" }}>Inventory</span>
                  </a>
                </div>


          {/* Search Form */}
          <form
            className="ms-auto d-flex align-items-center"
            onSubmit={handleSearch}
          >
            {/* Large screens: show search bar only */}
            <div className="d-none d-md-flex align-items-center">
              <input
                type="text"
                className="form-control form-control-sm rounded-pill ps-3 shadow-sm"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Small screens: show icon first, click to show search bar */}
            <div className="d-md-none">
              {!mobileSearchOpen ? (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  aria-label="Open search"
                  onClick={() => setMobileSearchOpen(true)}
                >
                  🔍
                </button>
              ) : (
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-pill ps-3 shadow-sm"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary ms-1"
                    onClick={() => setMobileSearchOpen(false)}
                  >
                    ✖
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </nav>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}

export default Navbar;
