//Client side
// accessing dom Element
//1. using Id
//2. using class
//3. using tag name
// 4. using querySelector

// let el1 = document.getElementById("heading");
// console.log(el1);
// let el2 = document.getElementsByClassName("item");
// console.log(el2[0]);
// let el3 = document.getElementsByTagName("p");
// console.log(el3[0]);
let el4 = document.querySelector("p");

let el6 = document.querySelectorAll(".item");
let ul = document.querySelector("#container");
console.log(el4);

console.log(el6);

//properties
/*
innerText
innerHTML
textContent
*/
let data = el4.innerText;
console.log(data);
el4.innerText = "Hello World";
let data2 = ul.innerHTML;
let data3 = ul.innerText;
let data4 = ul.textContent;
console.log(data2);
console.log(data3);
console.log(data4);
ul.innerHTML = `<li class = "item">Item 4</li>
                <li class = "item">Item 5</li>
                <li class = "item">Item 6</li>`;

/*
getAttribute
setAttribute
classList
*/
let ele5=document.querySelector(".item");
console.dir(ele5);
console.dir(ele5.getAttribute("id"));
console.dir(ele5.getAttribute("class"));
ele5.setAttribute("id","js");
console.log(ele5.getAttribute("id"));
ele5.classList.add("delete")
console.log(ele5.classList.contains("delete"));
ele5.classList.remove("item");
console.log(ele5.classList);


/*
Element.addEventListener("event name", function(){
})
*/

let signup = document.querySelector(".SignUp");
let form = document.querySelector("#signup");
signupbtn.addEventListener("click", function () {
    form.classList.toggle("hide");
});