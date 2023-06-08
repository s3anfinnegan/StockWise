// Sample data for inventory levels and sales
const inventoryData = [
  { week: "Jan 1-7", level: 100 },
  { week: "Jan 8-14", level: 80 },
  { week: "Jan 15-21", level: 120 },
  // Add more data as needed
];

const salesData = [
  { week: "Jan 1-7", sales: 50 },
  { week: "Jan 8-14", sales: 70 },
  { week: "Jan 15-21", sales: 90 },
  // Add more data as needed
];

// Function to render the line graph
function renderDashboard() {
  const ctx = document.getElementById("dashboard-chart").getContext("2d");

  // Extract the labels and data from the inventory and sales data
  const labels = inventoryData.map((data) => data.week);
  const inventoryLevels = inventoryData.map((data) => data.level);
  const sales = salesData.map((data) => data.sales);

  // Create the line graph
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Inventory Levels",
          data: inventoryLevels,
          borderColor: "blue",
          backgroundColor: "rgba(0, 0, 255, 0.1)",
          fill: true,
        },
        {
          label: "Sales",
          data: sales,
          borderColor: "green",
          backgroundColor: "rgba(0, 128, 0, 0.1)",
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Call the renderDashboard function to display the line graph
renderDashboard();
