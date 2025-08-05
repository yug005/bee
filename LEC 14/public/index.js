//fetch mai 2 baar .then lagta hai

function getUserData(URL) {
   fetch(URL)
    .then((res) => {
        console.log(res);
        return res.json()
    })
    .then((data) => {
        console.log(data);
        data.forEach(user => {
            displayUser(user);
        });
    })
    .catch((err) => {
        console.error(err);
    })
}

let userContainer = document.querySelector('.user-container');
function displayUser(user){
  let li = document.createElement('li');
  li.setAttribute('class', 'user-item');
  li.innerHTML = `<div class="user-info">
                <h1>${user.name}</h1>
                <p>${user.username}</p>
            </div>
            <div class="user-btn">
                <button class="user-delete">Delete</button>
                <button class="user-edit">Edit</button>
            </div>`
            userContainer.appendChild(li);
}
getUserData('http://localhost:3000/users');