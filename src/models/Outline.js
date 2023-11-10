import mongoose from "mongoose";

const OutlineSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        required: true,
    },
    public : { 
        type : Boolean,
        default : false ,
    },
    type: {
        type: String,
        enum: ["textbook", "story"],
        required: true,

    
    },
    chapters_number: {
        type: Number,
        required: true,
    },
    chapters : {
        type: [mongoose.Schema.Types.ObjectId,],
        ref: "Chapter",
        default : []

    },

        
    
})

const Outline = mongoose.model("Outline", OutlineSchema);

export default Outline;