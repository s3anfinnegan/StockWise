// Sample data for tomatoes and lettuce inventory levels, sales, and expiry dates
const tomatoesInventoryData = [
  { week: "Jan 1-7", level: 100, expiry: "2023-06-30" },
  { week: "Jan 8-14", level: 80, expiry: "2023-06-30" },
  { week: "Jan 15-21", level: 120, expiry: "2023-06-30" },
  // Add more data as needed
];

const tomatoesSalesData = [
  { week: "Jan 1-7", sales: 50 },
  { week: "Jan 8-14", sales: 70 },
  { week: "Jan 15-21", sales: 90 },
  // Add more data as needed
];

const lettuceInventoryData = [
  { week: "Jan 1-7", level: 80, expiry: "2023-07-05" },
  { week: "Jan 8-14", level: 60, expiry: "2023-07-05" },
  { week: "Jan 15-21", level: 100, expiry: "2023-07-05" },
  // Add more data as needed
];

const lettuceSalesData = [
  { week: "Jan 1-7", sales: 30 },
  { week: "Jan 8-14", sales: 50 },
  { week: "Jan 15-21", sales: 70 },
  // Add more data as needed
];

let currentTab = "tomatoes"; // Track the current active tab
let chart; // Variable to store the chart instance

// Function to render the line graph based on the selected tab
function renderDashboard() {
  const ctx = document.getElementById("dashboard-chart").getContext("2d");
  let inventoryData, salesData;

  // Select the data based on the current tab
  if (currentTab === "tomatoes") {
    inventoryData = tomatoesInventoryData;
    salesData = tomatoesSalesData;
    document.getElementById("stock-title").textContent = "Tomatoes Information";
  } else if (currentTab === "lettuce") {
    inventoryData = lettuceInventoryData;
    salesData = lettuceSalesData;
    document.getElementById("stock-title").textContent = "Lettuce Information";
  }

  // Extract the labels, data, and expiry dates from the inventory and sales data
  const labels = inventoryData.map((data) => data.week);
  const inventoryLevels = inventoryData.map((data) => data.level);
  const sales = salesData.map((data) => data.sales);
  const expiryDates = inventoryData.map((data) => data.expiry);

  // Create the line graph
  chart = new Chart(ctx, {
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

  // Update the stock information card with the current stock remaining and last order date
  const stockRemaining = inventoryLevels[inventoryLevels.length - 1];
  const lastOrderDate = labels[labels.length - 1];
  const expiryDate = expiryDates[expiryDates.length - 1];

  document.getElementById("stock-remaining").textContent =
    "Stock Remaining: " + stockRemaining;
  document.getElementById("last-order-date").textContent =
    "Last Order Date: " + lastOrderDate;
  document.getElementById("expiry-date").textContent =
    "Expiry Date: " + expiryDate;
}

// Function to change the active tab
function changeTab(tab) {
  // Remove the active class from all tab buttons
  const tabButtons = document.getElementsByClassName("tab-button");
  for (const button of tabButtons) {
    button.classList.remove("active");
  }

  // Add the active class to the selected tab button
  const selectedTabButton = document.querySelector(
    `.tab-button[data-tab="${tab}"]`
  );
  selectedTabButton.classList.add("active");

  // Update the current tab
  currentTab = tab;

  // Clear the existing chart instance
  if (chart) {
    chart.destroy();
  }

  // Render the dashboard for the selected tab
  renderDashboard();
}

// Attach the changeTab() function to the tab buttons
const tabButtons = document.getElementsByClassName("tab-button");
for (const button of tabButtons) {
  button.addEventListener("click", () => {
    const tab = button.getAttribute("data-tab");
    changeTab(tab);
  });
}

// Initial rendering of the dashboard
renderDashboard();
