import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required : true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    verificationCode : {
        type: String,
        
    
    },

    age :  {
        type: Number,
    
    },
    isVerified : {
        type: Boolean,
        default : false,
    },

    quiz : { 
        type : [mongoose.Schema.Types.ObjectId],
        ref : "Quiz"
    },

    favorite : {
        type : [mongoose.Schema.Types.ObjectId] ,
        ref : "Outline" 
    },

    outlines :{
        type : [mongoose.Schema.Types.ObjectId],
        ref : "Outline"
    }








    
    


    

});

const User = mongoose.model("User", UserSchema);

export default User;