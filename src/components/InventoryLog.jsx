import React from "react";
import { itemsData } from '../data'

function InventoryLog() {
  return (
    <div className="container my-3">
      <h4>Inventory Log</h4>
      <table className="table table-striped table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Item</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {itemsData.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>Added</td> {/* You can customize actions */}
              <td>{new Date().toISOString().split("T")[0]}</td> {/* Today’s date */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryLog;
