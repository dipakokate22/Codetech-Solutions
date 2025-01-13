document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/analytics/report")
      .then((response) => response.json())
      .then((data) => {
        const report = document.getElementById("report");
        report.innerHTML = data.map(
          (item) => `<li>${item.website}: ${item.duration} seconds</li>`
        ).join("");
      });
  });
  