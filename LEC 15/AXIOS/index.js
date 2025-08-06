const express = require('express');
const app = express();  
app.use(express.static(__dirname+"/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.post('/blog', async (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    console.log(title, description);
    res.json({
        success: true,
        message: 'Blog created successfully',
})
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});