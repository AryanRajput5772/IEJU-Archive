window.addEventListener("DOMContentLoaded", function () {
  const theme = document.getElementById("theme-style");
  const toggle_btn = document.querySelector("#checkbox");

  let savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    theme.href = "../assets/css/theme.css";
    if (toggle_btn) toggle_btn.checked = true;
  }
});
