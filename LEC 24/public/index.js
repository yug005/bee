

let signupForm=document.querySelector("#signup-form");
let signupName=document.querySelector("#signup-name");
let signupEmail=document.querySelector("#signup-email");
let signupPassword=document.querySelector("#signup-password");

signupForm.addEventListener("submit",async function(e){
    e.preventDefault();
    let nameValue=signupName.value;
    let emailValue=signupEmail.value;
    let passwordValue=signupPassword.value;

    let res = await fetch("/users",{
        method:"POST",
        body:JSON.stringify({
            username:nameValue,
            email:emailValue,
            password:passwordValue
        }),
        headers:{"Content-Type":"application/json"}
    })

    let data = await res.json();
    console.log(data);
    if(data.success){
        alert("User registered successfully"+" "+data.data.username);
        signupForm.reset();
    }

})
//login feature
let loginForm=document.querySelector("#login-form");
let loginEmail=document.querySelector("#login-email");
let loginPassword=document.querySelector("#login-password");

loginForm.addEventListener("submit",async function(e){
    e.preventDefault();
    let emailValue=loginEmail.value;
    let passwordValue=loginPassword.value;
dscfgvhjyol;'plok.,jmhn 7ldy5t,ū'
    let res = await fetch("/login",{
        method:"POST",
        body:JSON.stringify({
            email:emailValue,
            password:passwordValue
        }),
        headers:{"Content-Type":"application/json"}
    })

    let data = await res.json();
    console.log(data);
    if(data.success){
        let token=data.token;
        localStorage.setItem("token",token);
        alert("Login successful");
        loginForm.reset();
    }
})