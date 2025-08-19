const express = require("express"); 
const router = express.Router();
const { m5 } = require("../middleware/routerlevel.js");
router.use(m5);
router.post("/",  (req, res) => {
    {
        res.json({ success: true,
             message: "User created successfully" });  
    }
    
});
router.get("/", (req, res) => {
    {
        res.json({ success: true,
             message: "All users retrieved successfully" });
    }
});
router.get("/:id",  (req, res) => {
    {
        res.json({ success: true,
             message: "Single User retrieved successfully" });
    }
    
});
module.exports = router;