// SIDEBAR TOGGLE
const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

// CATEGORY FILTER
const categoryButtons = document.querySelectorAll(".category button");
const rows = document.querySelectorAll("tbody tr");

categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.category;

    rows.forEach(row => {
      row.style.display =
        row.dataset.nature === category ? "" : "none";
    });
  });
});

// REGISTER / UNREGISTER
document.querySelectorAll(".action-btn").forEach(button => {
  button.addEventListener("click", () => {
    const row = button.closest("tr");
    const status = row.querySelector(".status");

    if (button.classList.contains("register")) {
      status.textContent = "Registered";
      status.className = "status registered";
      button.textContent = "Unregister";
      button.className = "action-btn unregister";
    } else {
      status.textContent = "Not Registered";
      status.className = "status not-registered";
      button.textContent = "Register";
      button.className = "action-btn register";
    }
  });
});
