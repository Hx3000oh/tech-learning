///<reference path="../base.ts">
const blocksArea = document.querySelector(
  "section.contact .blocks-area",
) as HTMLDivElement;
const blocks = blocksArea.querySelectorAll(
  ".block",
) as NodeListOf<HTMLDivElement>;

const menusArea = document.querySelector(".menus-area") as HTMLDivElement;

blocks.forEach((block) => {
  block.addEventListener("click", () => {
    const overlay = document.querySelector(".overlay") as HTMLDivElement;
    overlay.classList.toggle("active");
    menusArea.querySelector(`#${block.id}-menu`)?.classList.toggle("active");
    menusArea.querySelectorAll(".close")?.forEach((close) => {
      close.addEventListener("click", () => {
        overlay.classList.remove("active");
        menusArea
          .querySelector(`#${block.id}-menu`)
          ?.classList.remove("active");
      });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        overlay.classList.remove("active");
        menusArea
          .querySelector(`#${block.id}-menu`)
          ?.classList.remove("active");
      }
    });
  });
});
