const mongoose=require("mongoose")

const Userschema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9._%+-]+@rvce\.edu\.in$/.test(value);
            },
        }
    },
    password:{
        type:String,
        require:true,
        min:6,
    },
    profilePicture:{
        type:String,
        default:"",
    },
    followers:{
        type:Array,
        default:[],
    },
    followings:{
        type:Array,
        default:[],
    },
    isAdmin:{
        type:Boolean,
        unique:false,
    },
    des:{
        type:String,
        max:50
    },
    year:{
        type:String,
        max:50
    },
    department:{
        type:String,
        max:50
    },
    usn:{
        type:String
    }

},
{timestamps:true}
);

module.exports=mongoose.model("User",Userschema);