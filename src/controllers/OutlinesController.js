
import axios from "axios";
import Outline from "../models/Outline.js";
import User from "../models/User.js";
import { ErrorRes, SuccessRes } from "../utils/response.js";
import { uri } from "../utils/constants.js";
import { CreateOutline } from "../services/OutlineServices.js";
import { CreateChapter } from "../services/ChapterServices.js";
/**
 * @description {Create Outline}
 * @access private
 * @returns  {Outlines}
 * @throws {Error}
 */


export async function GetAllUserOutlines(req,res){
    try{
        const outlines = await User.findById(req.user._id).populate({
            path: "outlines",
            populate: {
                path: "chapters",
                model: "Chapter"
            }
        });
        console.log(outlines);
        return SuccessRes(res,"Outlines",outlines.outlines);
    }catch(err){
        return ErrorRes(res,"Cannot Get Outlines",500,err.message);
    }
}


export async function GetPublicOutlines(req,res){
    try{
        const outline = await Outline.find({public : true}).populate("chapters");
        if (!outline){
            return ErrorRes(res,"Cannot Get Outline",404,"No Outline Found");
        }

        return SuccessRes(res,"Outline",outline);
        
    }catch(err){
        console.log(err.message);
        return ErrorRes(res,"Cannot Get Outline",500,err.message);
    }
}



export async function CreateExpo(){
    try{
        let data = await axios.get(uri+"/get-all-stories");
        data = data.data;
        console.log(data);
        data.forEach(async (textbook)=>{
            const outline = await CreateOutline(textbook.id,textbook.title,textbook.image,textbook.chapters.length,"story");
            if (!outline.success){
                console.log("Cannot Create Outline");
                return;
            }
            await outline.data.save();
            console.log("Outline Created");
            // export async function CreateChapter (title  , content , image , voice){

            for (let index = 0; index < textbook.chapters.length; index++) {
                const chapter = textbook.chapters[index];
                let chapterModel = await CreateChapter(
                    chapter.title,
                    chapter.content,
                    chapter.image,
                    chapter.voice
                )
                if (!chapterModel){
                    console.log("Cannot Create Chapter");
                    return;
                }
                outline.data.chapters.push(chapterModel._id);
                await outline.data.save();
                console.log("Chapter Created");
            }

            
        })


        
    }catch(err){
        console.log(err.message);
        return ErrorRes(res,"Cannot Get Outline",500,err.message);
    }
}



