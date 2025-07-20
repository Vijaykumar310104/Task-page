window.onload = function () {
  const viewBtn = document.getElementById("viewBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const applyBtn = document.getElementById("applyBtn");

  // Toggle View Dropdown
  if (viewBtn && dropdownMenu) {
    viewBtn.addEventListener("click", () => {
      dropdownMenu.style.display = dropdownMenu.style.display === "flex" ? "none" : "flex";
    });

    document.addEventListener("click", (e) => {
      if (!dropdownMenu.contains(e.target) && !viewBtn.contains(e.target)) {
        dropdownMenu.style.display = "none";
      }
    });
  }

  // Apply View Filters
  applyBtn.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".toggle-col");
    checkboxes.forEach(checkbox => {
      const colClass = checkbox.dataset.col + "-col";
      const elements = document.querySelectorAll("." + colClass);
      elements.forEach(el => {
        el.style.display = checkbox.checked ? "block" : "none";
      });
    });
    dropdownMenu.style.display = "none";
  });

  // Search Filter
  const searchInput = document.querySelector(".search-bar");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const filter = this.value.toLowerCase();
      const rows = document.querySelectorAll(".table-row");
      rows.forEach(row => {
        const questionText = row.querySelector(".question-col").textContent.toLowerCase();
        row.style.display = questionText.includes(filter) ? "flex" : "none";
      });
    });
  }

  // Delete Confirmation
  const deleteIcons = document.querySelectorAll('.fa-trash');
  deleteIcons.forEach(icon => {
    icon.addEventListener('click', function () {
      const row = this.closest('.table-row');
      const confirmDelete = confirm("Are you sure you want to delete this question?");
      if (confirmDelete) {
        row.remove();
      }
    });
  });

const allRows = Array.from(document.querySelectorAll(".table-row"));
const loadMoreBtn = document.getElementById("loadMoreBtn");
const loadLessBtn = document.getElementById("loadLessBtn");
const loadStatus = document.getElementById("loadStatus");

let currentVisible = 10; // Initially visible rows
const increment = 6;
const total = allRows.length;

function updateLoadStatus() {
  loadStatus.textContent = `Showing ${currentVisible > total ? total : currentVisible} out of ${total} Questions`;

  // Button visibility control
  loadMoreBtn.style.display = currentVisible >= total ? "none" : "inline-block";
  loadLessBtn.style.display = currentVisible > 10 ? "inline-block" : "none";
}

function hideExtraRows() {
  allRows.forEach((row, index) => {
    row.style.display = index < currentVisible ? "flex" : "none";
  });
  updateLoadStatus();
}

if (loadMoreBtn && loadLessBtn) {
  hideExtraRows(); // Initially show 10

  loadMoreBtn.addEventListener("click", () => {
    currentVisible += increment;
    if (currentVisible > total) currentVisible = total;
    hideExtraRows();
  });

  loadLessBtn.addEventListener("click", () => {
    currentVisible -= increment;
    if (currentVisible < 10) currentVisible = 10;
    hideExtraRows();
  });
}

};

