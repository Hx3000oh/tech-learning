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

    // Opem Menu
    overlay.classList.toggle("active");
    menusArea.querySelector(`#${block.id}-menu`)?.classList.toggle("active");

    // Close Menu
    // -- With Close Button
    menusArea.querySelectorAll(".close")?.forEach((close) => {
      close.addEventListener("click", () => {
        overlay.classList.remove("active");
        menusArea
          .querySelector(`#${block.id}-menu`)
          ?.classList.remove("active");
      });
      clearEvents(close, "click");
    });
    // -- With ESC Key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        overlay.classList.remove("active");
        menusArea
          .querySelector(`#${block.id}-menu`)
          ?.classList.remove("active");
      }
      clearEvents(document, "keydown");
    });
    // -- With Overlay Click
    overlay.addEventListener("click", () => {
      overlay.classList.remove("active");
      menusArea.querySelector(`#${block.id}-menu`)?.classList.remove("active");
      clearEvents(overlay, "click");
    });

    // Clear Events
    function clearEvents(e: Element | Document, ev: string) {
      e.removeEventListener(ev, () => {});
    }
  });
});

function copuNumber(input: string) {
  const item = document.getElementById(input) as HTMLInputElement;
  if (item) {
    item.select();
  }
}
