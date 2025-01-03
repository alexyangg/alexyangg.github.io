const navIcon = document.querySelector("#nav-icon");
const navLinks = document.querySelector(".nav-links");

navIcon.onclick = () => {
  navLinks.classList.toggle("open");
};

document.addEventListener("click", (event) => {
  if (!navIcon.contains(event.target) && !navLinks.contains(event.target)) {
    navLinks.classList.remove("open");
  }
});
