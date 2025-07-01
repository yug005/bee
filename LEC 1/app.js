function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}
const fs = require("fs");

fs.readFile("demo.txt", "utf-8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});

console.log(add(5, 3));
console.log("exit");