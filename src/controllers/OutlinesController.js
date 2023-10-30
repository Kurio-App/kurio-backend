
import User from "../models/User.js";
import { ErrorRes, SuccessRes } from "../utils/response.js";
/**
 * @description {Create Outline}
 * @access private
 * @returns  {Outlines}
 * @throws {Error}
 */


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
        return ErrorRes(res,"Cannot Get Outlines",500,err.message);
    }
}



