/// <reference path="base.ts" />

const landing = document.querySelector("section.landing") as HTMLDivElement;

const cont = landing.querySelector(".container") as HTMLDivElement;
const overlay = landing.querySelector(".overlay") as HTMLDivElement;

cont.style.height = `${landing.scrollHeight}px`;

overlay.style.height = `${landing.scrollHeight}px`;
