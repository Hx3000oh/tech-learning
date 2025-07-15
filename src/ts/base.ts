//noBase

// Header Functionality
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

// Links Functionality
const links = header.querySelectorAll(".links") as NodeListOf<HTMLUListElement>;

links.forEach((link) => {
  const anchors = link.querySelectorAll("a") as NodeListOf<HTMLAnchorElement>;

  anchors.forEach((anchor) => {
    if (document.body.classList.contains(anchor.dataset.page || "home")) {
      anchors.forEach((a) => a.classList.remove("active"));
      anchor.classList.add("active");
    }
  });
});

function alertElement(msg: string) {
  const alert = document.createElement("div");
  alert.classList.add("alert-element");
  alert.innerText = msg;
  blocksArea.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 2000);
}
