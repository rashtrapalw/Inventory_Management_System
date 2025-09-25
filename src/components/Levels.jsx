import React from "react";

function Levels() {
  return (
    <div className="container my-3">
      <h4>Inventory Levels</h4>

      {/* Saw */}
      <div className="mb-3">
        <label className="form-label">Saw</label>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: "70%" }}
            aria-valuenow="70"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            70%
          </div>
        </div>
      </div>

      {/* Hammer */}
      <div className="mb-3">
        <label className="form-label">Hammer</label>
        <div className="progress">
          <div
            className="progress-bar bg-warning"
            role="progressbar"
            style={{ width: "40%" }}
            aria-valuenow="40"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            40%
          </div>
        </div>
      </div>

      {/* T-Square */}
      <div className="mb-3">
        <label className="form-label">T-Square</label>
        <div className="progress">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: "90%" }}
            aria-valuenow="90"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            90%
          </div>
        </div>
      </div>
    </div>
  );
}

export default Levels;
