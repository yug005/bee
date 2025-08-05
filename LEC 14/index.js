const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(__dirname + '/public'));  

app.get('/users', (req, res) => {
    try {
        let data = fs.readFileSync('users.json', 'utf8');
        let alluser = data ? JSON.parse(data) : [];
        res.json(alluser);
    } catch (error) {
        res.send(error);
    }
})
app.post('/adduser', (req, res) => {
    try{
    let name = req.body.name;
    let username = req.body.username;
    let newUsers = {
        id:Math.floor(Math.random() * 1000000),
        name: name,
        username: username,
        role:"user"
    }

    let alluser = [];
    let data = fs.readFileSync('users.json', 'utf8');
    if(data){
        alluser = JSON.parse(data);
    }
    alluser.push(newUsers);
    fs.writeFileSync('users.json', JSON.stringify(alluser));
    res.redirect('/register.html');
}catch(error){
    return res.send(error);
}
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});