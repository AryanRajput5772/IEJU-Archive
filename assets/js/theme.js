// const toggle_btn = document.querySelector("#checkbox");
// const theme = document.getElementById("theme-style");

// toggle_btn.addEventListener("change", function () {
//   if (this.checked) {
//     theme.setAttribute("href", "./assets/css/theme.css"); // dark theme
//   } else {
//     theme.setAttribute("href", "style.css"); // default theme
//   }
// });

const toggle_btn = document.querySelector("#checkbox");
const theme = document.getElementById("theme-style");

toggle_btn.addEventListener("change", function () {
  if (this.checked) {
    theme.href = "./assets/css/theme.css";
    localStorage.setItem("theme", "dark");
  } else {
    theme.href = "css/style.css";
    localStorage.setItem("theme", "light");
  }
});
