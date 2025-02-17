const User = require("../models/User")
const router= require("express").Router();
const bcrypt=require("bcrypt")


//update user
router.put("/:id",async(req,res)=>{
    if(req.body.userId == req.params.id || req.body.isAdmin)
    {
        if(req.body.password)
        {
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password= await bcrypt.hash(req.body.password,salt);
            }
            catch(err){
                return res.status(403).json(err)
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set : req.body,
            });
            res.status(200).json("Account has been updated");
        } catch(err){
            return res.status.json(err);
        }
    }
    else
    {
        res.status(403).json("not found");
        return res.status(403).json("you can update only your account!")
    }
})
//delete user
router.delete("/:id",async(req,res)=>{
    if(req.body.userId == req.params.id || req.body.isAdmin)
    {
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted succesfully ");
        } catch(err){
            return res.status(500).json(err);
        }
    }
    else
    {
        return res.status(403).json("you can delete only your account!")
    }
})

//get a user
router.get("/",async(req,res)=>{
    const userId=req.query.userId;
    const username=req.query.username;
    try{
        const user=userId
        ?await User.findById(userId)
        :await User.findOne({username:username });
        const {password,updateAt, ...other}=user._doc
        res.status(200).json(other);
    }
    catch(err){ 
        res.status(500).json(err)
    }

})

//get isfriends 
router.get("/isfollowed/:userId/:findId",async(req,res)=>{
    try{
        const user=await User.findById(req.params.userId);
        if(user.followings.includes(req.params.findId))
            res.status(200).json(true);
        else
            res.status(200).json(false);
    }catch(err){
        res.status(500).json(err);
    }
})


//get friends 
router.get("/friends/:userId",async(req,res)=>{
    try{
        const user= await User.findById(req.params.userId);
        const friends= await Promise.all(
            user.followings.map(friendId=>{
                return User.findById(friendId);
            })
        )
        let friendList=[];
        friends.map(friend=>{
            const {_id,username,profilePicture}=friend;
            friendList.push({_id,username,profilePicture});
        });
        res.status(200).json(friendList);
    }catch(err){
        res.status.json(err);
    }
})


//not friends 

router.get("/notfriends/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const allUsers = await User.find({ _id: { $ne: user._id } });

        const nonFriends = allUsers.filter(otherUser => {
            return !user.followings.includes(otherUser._id.toString());
        });

        let nonFriendList = [];
        nonFriends.map(nonFriend => {
            const { _id, username, profilePicture } = nonFriend;
            nonFriendList.push({ _id, username, profilePicture });
        });

        res.status(200).json(nonFriendList);
    } catch (err) {
        res.status(500).json(err);
    }
});


//follow user

router.put("/:id/follow",async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}});
                await currentUser.updateOne({$push:{followings:req.params.id}});
                res.status(400).json("user has followed")
            }
            else{
                res.status(403).json("already follow "+req.params.id+"/"+req.body.userId);
            }
        }
        catch(err){
            res.status(503).json(err)
        }
    }
    else
    {
        res.status(400).json("you cant follw yourself");
    }
})
//unfollow a user
router.delete("/:id/unfollow",async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}});
                await currentUser.updateOne({$pull:{followings:req.params.id}});
                res.status(400).json("user has been deleted")
            }
            else{
            }
        }
        catch(err){
            res.status(503).json(err)
        }
    }
    else
    {
        res.status(400).json("you cant delete yourself");
    }
})

module.exports = router
