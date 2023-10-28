
import User from "../models/User.js";
import { ErrorRes, SuccessRes } from "../utils/response.js";

export async function GetAllOutlines(req,res){
    try{
        const outlines = await User.findById(req.user._id).populate({
            path: "outlines",
            populate: {
                path: "chapters",
                model: "Chapter"
            }
        });
        return SuccessRes(res,"Outlines",outlines.outlines);
    }catch(err){
        console.log(err.message)
        return ErrorRes(res,"Cannot Get Outlines",500,err.message);
    }
}



