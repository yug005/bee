const express = require('express');
const fs = require('fs');



const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}))


// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });


app.post('/users', (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    console.log({username,email,password})
    let newUSER = { username ,email, password,};
      fs.readFile('users.json', 'utf8',(err,data) => {
        let users = [];
        if (err) {
          return res.json({ error: 'Error reading file' });
        }
        if (data) {
          users = JSON.parse(data);
        }
        users.push(newUSER);
        fs.writeFile('users.json', JSON.stringify(users), (err) => {
          if (err) {
            return res.json({ error: 'Error writing file' });
          }
          res.json({ username, email, password })
        });
        
    
      
        });
    });
    ;
    app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
   
    
