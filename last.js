
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleBtn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });

  const viewBtn = document.getElementById("viewBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");

  viewBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.style.display = dropdownMenu.style.display === "flex" ? "none" : "flex";
  });

  document.addEventListener("click", (e) => {
    if (!dropdownMenu.contains(e.target) && e.target !== viewBtn) {
      dropdownMenu.style.display = "none";
    }
  });

  const applyBtn = document.getElementById("applyBtn");
  applyBtn.addEventListener("click", () => {
    document.querySelectorAll(".toggle-col").forEach((checkbox) => {
      const colClass = checkbox.dataset.col + "-col";
      document.querySelectorAll("." + colClass).forEach((el) => {
        el.style.display = checkbox.checked ? "block" : "none";
      });
    });
    dropdownMenu.style.display = "none";
  });

  const searchInput = document.querySelector(".search-bar");
  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    document.querySelectorAll(".table-row").forEach((row) => {
      const text = row.querySelector(".question-col").innerText.toLowerCase();
      row.style.display = text.includes(filter) ? "flex" : "none";
    });
  });

  const allRows = Array.from(document.querySelectorAll(".table-row"));
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const loadLessBtn = document.getElementById("loadLessBtn");
  const loadStatus = document.getElementById("loadStatus");

  let currentVisible = 10;
  const increment = 6;

  function updateRows() {
    allRows.forEach((row, index) => {
      row.style.display = index < currentVisible ? "flex" : "none";
    });
    loadMoreBtn.style.display = currentVisible >= allRows.length ? "none" : "inline-block";
    loadLessBtn.style.display = currentVisible > 10 ? "inline-block" : "none";
    loadStatus.textContent = `Showing ${Math.min(currentVisible, allRows.length)} out of ${allRows.length} Questions`;
  }

  updateRows();

  loadMoreBtn.addEventListener("click", () => {
    currentVisible += increment;
    updateRows();
  });

  loadLessBtn.addEventListener("click", () => {
    currentVisible = Math.max(10, currentVisible - increment);
    updateRows();
  });

  document.querySelectorAll(".fa-trash").forEach((icon) => {
    icon.addEventListener("click", () => {
      const row = icon.closest(".table-row");
      if (confirm("Are you sure you want to delete this question?")) {
        row.remove();
        currentVisible = Math.max(10, document.querySelectorAll(".table-row").length);
        updateRows();
      }
    });
  });

  document.querySelectorAll(".question-with-checkbox span").forEach((span) => {
    span.addEventListener("click", () => {
      const answer = span.closest(".question-col").querySelector(".answer");
      if (answer) {
        answer.style.display = answer.style.display === "block" ? "none" : "block";
      }
    });
  });


const masterCheckbox = document.getElementById("masterCheckbox");

masterCheckbox.addEventListener("change", () => {
  const allCheckboxes = document.querySelectorAll(".question-checkbox");
  allCheckboxes.forEach((cb) => {
    cb.checked = masterCheckbox.checked;
  });
});

});
