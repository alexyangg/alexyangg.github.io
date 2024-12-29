function toggleMenu() {
  // const menu = document.querySelector(".menu-links");
  // const icon = document.querySelector(".hamburger-icon");
  // menu.classList.toggle("open");
  // icon.classList.toggle("open");
}

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
