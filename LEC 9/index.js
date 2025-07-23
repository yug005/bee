import express from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());

app.post("/users", (req, res) => {
  let name = req.body.name;
  let password = req.body.password;

  let newUSER = { name , password};
  fs.readFile('userData2.json', 'utf8',(err,data) => {
    let users = [];
    if (err) {
      return res.json({ error: 'Error reading file' });
    }
    if (data) {
      users = JSON.parse(data);
    }
    users.push(newUSER);
    fs.writeFile('userData2.json', JSON.stringify(users), (err) => {
      if (err) {
        return res.json({ error: 'Error writing file' });
      }
      res.json({ message: 'User added successfully', user: newUSER });
    });
    

  
    });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
