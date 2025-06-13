//noBase
const header = document.querySelector("header#main-header") as HTMLDivElement;

const menuIcon = header.querySelector(
  ".hamburger > a.icon",
) as HTMLAnchorElement;

const iconMenu = header.querySelector(".hamburger > .menu") as HTMLDivElement;

menuIcon.addEventListener("click", () => {
  iconMenu.classList.toggle("active");
});

iconMenu.addEventListener("click", () => {
  iconMenu.classList.remove("active");
});
