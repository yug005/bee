const file1 = require('./file1');

function sum(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
module.exports = {
  sum,
  subtract
};