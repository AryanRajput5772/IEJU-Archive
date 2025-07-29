// Show the popup after 10 seconds
window.onload = function () {
  setTimeout(() => {
    document.getElementById("Notice").style.display = "inline";
  }, 500); // 10000 ms = 10 seconds
  setTimeout(() => {
    const notice = document.getElementById("Notice");
    if (notice) {
      notice.style.opacity = "0"; // fade out
      setTimeout(() => {
        notice.style.display = "none"; // remove from layout after fade
      }, 500); // wait for fade transition to complete (500ms)
    }
  }, 13000);
  setTimeout(() => {
    document.getElementById("testimonialPopup").style.display = "flex";
  }, 15000); // 10000 ms = 10 seconds
};

// Close popup
function closePopup() {
  document.getElementById("testimonialPopup").style.display = "none";
}

// Redirect to contact form
function redirectToForm() {
  window.location.href = "../contact.html"; // change this path to your actual contact form URL
}
