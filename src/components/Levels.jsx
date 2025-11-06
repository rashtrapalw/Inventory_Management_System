import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


function Levels() {
  const [items, setItems] = useState([]);



  useEffect(() => {
    fetch("https://electronics-data-naho.onrender.com/items") // your JSON server endpoint
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  }, []);

  if (!items || items.length === 0) {
    return <div className="container my-3">Loading inventory data...</div>;
  }

  return (
    <div className="container my-3">
      <h4>Inventory Levels</h4>

      {items.map((item) => {
        if (!item.details || item.details.length === 0) return null;

        const labels = item.details.map((d) => d.company);
        const dataCounts = item.details.map((d) => d.count);

        const data = {
          labels,
          datasets: [
            {
              label: "Stock Count",
              data: dataCounts,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        };

        const options = {
          responsive: true,
          maintainAspectRatio: false, // makes chart take container height
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: item.name + " Stock by Company" },
          },
          scales: { y: { beginAtZero: true } },
        };

        return (
          <div key={item.id} className="mb-5" style={{ height: "300px" }}>
            <Bar data={data} options={options} />
          </div>
        );
      })}
    </div>
  );
}

export default Levels;
