const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.get('/users', (req, res) => {
    fs.readFile('./user.json', 'utf8', function(err, data){
        if(err) res.send(err);
        let allUsers = JSON.parse(data);
        res.json(allUsers);
    });
});

app.listen(3000,()=>{
    console.log('Server is running')
});