const chickenInventoryData = [
  { week: "Jan 1-7", level: 40, expiry: "March 16th" },
  { week: "Jan 8-14", level: 55, expiry: "March 16th" },
  { week: "Jan 15-21", level: 25, expiry: "March 16th" },
  // Add more data as needed
  { week: "Jan 22-28", level: 25, expiry: "March 16th" },
  { week: "Jan 29-Feb 4", level: 45, expiry: "March 16th" },
  { week: "Feb 5-11", level: 45, expiry: "March 16th" },
  { week: "Feb 12-18", level: 30, expiry: "March 16th" },
  { week: "Feb 19-25", level: 30, expiry: "March 16th" },
  { week: "Feb 26-Mar 4", level: 35, expiry: "March 16th" },
  { week: "Mar 5-11", level: 35, expiry: "March 16th" },
  { week: "Mar 12-18", level: 30, expiry: "March 16th" },
];

const chickenSalesData = [
  { week: "Jan 1-7", sales: 36 },
  { week: "Jan 8-14", sales: 49 },
  { week: "Jan 15-21", sales: 22 },
  // Add more data as needed
  { week: "Jan 22-28", sales: 23 },
  { week: "Jan 29-Feb 4", sales: 39 },
  { week: "Feb 5-11", sales: 41 },
  { week: "Feb 12-18", sales: 24 },
  { week: "Feb 19-25", sales: 28 },
  { week: "Feb 26-Mar 4", sales: 31 },
  { week: "Mar 5-11", sales: 34 },
  { week: "Mar 12-18", sales: 28 },
];

const lettuceInventoryData = [
  { week: "Jan 1-7", level: 40, expiry: "March 16th" },
  { week: "Jan 8-14", level: 45, expiry: "March 16th" },
  { week: "Jan 15-21", level: 35, expiry: "March 16th" },
  // Add more data as needed
  { week: "Jan 22-28", level: 35, expiry: "March 16th" },
  { week: "Jan 29-Feb 4", level: 35, expiry: "March 16th" },
  { week: "Feb 5-11", level: 40, expiry: "March 16th" },
  { week: "Feb 12-18", level: 35, expiry: "March 16th" },
  { week: "Feb 19-25", level: 40, expiry: "March 16th" },
  { week: "Feb 26-Mar 4", level: 40, expiry: "March 16th" },
  { week: "Mar 5-11", level: 20, expiry: "March 16th" },
  { week: "Mar 12-18", level: 35, expiry: "March 16th" },
];

const lettuceSalesData = [
  { week: "Jan 1-7", sales: 37 },
  { week: "Jan 8-14", sales: 42 },
  { week: "Jan 15-21", sales: 31 },
  // Add more data as needed
  { week: "Jan 22-28", sales: 30 },
  { week: "Jan 29-Feb 4", sales: 29 },
  { week: "Feb 5-11", sales: 38 },
  { week: "Feb 12-18", sales: 27 },
  { week: "Feb 19-25", sales: 33 },
  { week: "Feb 26-Mar 4", sales: 33 },
  { week: "Mar 5-11", sales: 13 },
  { week: "Mar 12-18", sales: 33 },
];

let currentTab = "chicken"; // Track the current active tab
let chart; // Variable to store the chart instance

// Function to render the line graph based on the selected tab
// Function to render the line graph based on the selected tab
function renderDashboard() {
  const ctx = document.getElementById("dashboard-chart").getContext("2d");
  let inventoryData, salesData;

  // Select the data based on the current tab
  if (currentTab === "chicken") {
    inventoryData = chickenInventoryData;
    salesData = chickenSalesData;
    document.getElementById("stock-title").textContent = "Chicken Information";
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

  // Update the stock information card
  const stockRemaining = inventoryLevels[inventoryLevels.length - 1];
  const lastOrderDate = labels[labels.length - 1];
  const expiryDate = expiryDates[expiryDates.length - 1];

  document.getElementById(
    "stock-remaining"
  ).textContent = `Stock Remaining: ${stockRemaining}`;
  document.getElementById(
    "last-order-date"
  ).textContent = `Last Order Date: ${lastOrderDate}`;
  document.getElementById(
    "expiry-date"
  ).textContent = `Expiry Date: ${expiryDate}`;
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
