//middleware - function which run on client request before controller functions
const express = require("express");
const { m1, m2 } = require("./middleware/firstmiddleware");
const { m3 } = require("./middleware/pathlevel");
const userRoutes = require("./routes/userRoutes");

const app = express();


app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(m1);

app.use("/api/users", userRoutes);

app.get("/health", m3, (req, res, next) => {
   console.log("running controller function");
   res.json({ status: "OK",
    message: "Server is healthy",
    });
  
});
app.use(m2);
app.get("/home", (req, res, next) => {
    console.log("running controller function");
    res.json({  success: true,
    message: "Welcome to the home page",
    });
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});