import axios from "axios";
import {uri , load_local, save_local} from "../utils/constants.js";
import { CreateOutline } from "../services/OutlineServices.js";
import {CreateChapter} from "../services/ChapterServices.js";
import { ErrorRes, SuccessRes } from "../utils/response.js";
import Outline from "../models/Outline.js";
import Chapter from "../models/Chapter.js";


/**
 * @access private
 * @param {*} generation_params {story_params}
 * @returns {Outline}
 * @throws {Error}
 * 
 */


export async function CreateStory(req,res){
    try{

        const inputs = req.body;


        const  data = {
            generation_params: {
                age: req.user.age,
                story_theme : "Anime",
                language: "English",
                story_genres: inputs.story_genres,
                story_morals: inputs.story_morals,
                story_length: inputs.story_length,
                story_chapter_length: inputs.story_chapter_length,
                user_preferences: inputs.user_preferences,
                img_type: inputs.image_type
            },
            load_local: load_local,
            save_local: save_local


        }

        const response = await axios.post(uri+"/story",data).catch((err)=>{
            console.log(err.message);
        }
        );

        let outline = await Outline.findOne({id : response.data.id}).populate("chapters");

        if (outline){
            if (!req.user.outlines.includes(outline._id)){
                req.user.outlines.push(outline._id);
                await req.user.save();    

            }
            
            return SuccessRes(res,"Story Created",outline);
        }


        const outlineData =await CreateOutline(response.data.id,response.data.title,response.data.image,response.data.chapters_number , "story");
        
        if (!outlineData.success){
            return ErrorRes(res,"Cannot Create Story",400,outlineData.error);
        }
        outline = outlineData.data;






        req.user.outlines.push(outline._id);
        await req.user.save();


        return SuccessRes(res,"Story Created",outline);
    }catch(err){
        console.log(err.message)
        return ErrorRes(res,"Cannot Create Story",500,err.message);
    }
}


/**
 * @access private
 * @param {*} generation_params {textbook_params}
 * @returns {Outline}
 * @throws {Error}
 * 
 */

export async function CreateTextBook(req,res){
    try{

        const inputs = req.body;


        
        const  data = {
            generation_params: {
                age: inputs.age,
                language: inputs.language,
                field: inputs.field,
                topic: inputs.topic,
                learning_textbook_length: inputs.learning_textbook_length,
                learning_chapter_length: inputs.learning_chapter_length,
                depth: inputs.depth,
                level: inputs.level,
                user_preferences: inputs.user_preferences,
                img_type: inputs.image_type
            },
            load_local: load_local,
            save_local: save_local
        }

        const response = await axios.post(uri+"/textbook",data).catch((err)=>{

            console.log(err.message);
        }
        );
        if (!response){
            return ErrorRes(res,"Cannot Create TextBook",400,"TextBook Not Found");
        }
        let outline = await Outline.findOne({id : response.data.id}).populate("chapters");
        
        if (outline){
            if (!req.user.outlines.includes(outline._id)){
                req.user.outlines.push(outline._id);
                await req.user.save();    

            }

            return SuccessRes(res,"TextBook Created",outline);
        }


        const outlineData =await CreateOutline(response.data.id,response.data.title,response.data.image,response.data.chapters_number , "textbook");
        if (!outlineData.success){
            return ErrorRes(res,"Cannot Create TextBook",400,outlineData.error);
        }

        outline = outlineData.data;






        req.user.outlines.push(outline._id);
        await req.user.save();
        




        return SuccessRes(res,"TextBook Created",outline);
    }catch(err){
        console.log(err.message)
        return ErrorRes(res,"Cannot Create TextBook",500,err.message);
    }
}




/**
 * @access private
 * @param {*} {id , index} 
 * @returns  {Chapter}
 * @throws {Error}
 */


export async function CreateChapterController(req,res){
    try {
        let {id , index} = req.params;

        let outline = await Outline.findOne({id : id})
    
        if (!outline){
            return ErrorRes(res,"Cannot Create Chapter",400,"Outline Not Found");
        }
    
        if (index > outline.chapters_number){
            return ErrorRes(res,"Cannot Create Chapter",400,"Index Out Of Bound");
        }
        if (index <= outline.chapters.length){
            
            const chapter = await Chapter.findById(outline.chapters[index-1])
            return SuccessRes(res,"Chapter Created",chapter);
        }


        let body = {
            load_local: load_local,
            save_local: save_local
        }


        let url = uri+"/"+outline.type+"/"+id+"/"+index;
    
    
        let response = await axios.post(url , body);
        const  chapter = await CreateChapter(
            response.data.title,
             response.data.content,
           response.data.image,
          response.data.voice,
        )

            if (!chapter){
                return ErrorRes(res,"Cannot Create Chapter",400);
            }

        
    
        


    
        outline.chapters.push(chapter._id);
    
        await outline.save();
    
        return SuccessRes(res,"Chapter Created",chapter);
    
    } catch (error) {
        console.log(error.message)
        return ErrorRes(res,"Cannot Create Chapter",500,error.message);
        
    }
















}





export async function createTopics (req , res) { 
    try {
        const inputs = req.body.generation_params

        const body = { 

        }
        const url = ""

        let response = await  axios.post(body , url);




        
    } catch (error) {
        
    }
}
