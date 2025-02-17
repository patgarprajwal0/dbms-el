const router= require("express").Router();
const User=require("../models/User");
const bcrypt=require("bcrypt");

router.post("/register", async(req,res)=>{
    
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(req.body.password,salt);

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
            des:req.body.des,
            year:req.body.year,
            department:req.body.department,
            usn:req.body.usn,
            isAdmin: req.body.isAdmin
        });
        const user=await newUser.save();
        res.status(200).json(user);
    } catch(err)
    {
        console.log(err);
    }

});

//Login
router.post("/login", async (req,res)=>{
    try{
        const user= await User.findOne({email:req.body.email});
        if (!user) return res.status(404).json("User not found");
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) return res.status(404).json("Invalid password");
        
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err);
    }
    

})

module.exports = router