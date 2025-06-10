console.log(document.head.innerHTML);
function sayHelloTo(someone: string): string {
  return `Hello ${someone}`;
}

console.log(sayHelloTo("Se7s"));

let arr = [1, 2, 3, 4, 5];

arr.forEach((item) => console.log(item));

arr.filter((item) => item % 2 == 0);
