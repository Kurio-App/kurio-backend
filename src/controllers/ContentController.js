import axios from "axios";
import {uri} from "../utils/constants.js";
import { CreateOutline } from "../services/OutlineServices.js";
import { ErrorRes, SuccessRes } from "../utils/response.js";
import Outline from "../models/Outline.js";
import Chapter from "../models/Chapter.js";


export async function CreateStory(req,res){
    try{

        const inputs = req.body;


        const  data = {
            generation_params: {
                age: inputs.age,
                language: inputs.language,
                story_genres: inputs.story_genres,
                story_morals: inputs.story_morals,
                story_length: inputs.story_length,
                story_chapter_length: inputs.story_chapter_length,
                user_preferences: inputs.user_preferences,
                image_type: inputs.image_type
            },
            load_local: true,
            save_local: false


        }

        const response = await axios.post(uri+"/story",data);

        const outlineData =await CreateOutline(response.data.id,response.data.title,response.data.image,response.data.chapters_number , "story");
        if (!outlineData.success){
            return ErrorRes(res,"Cannot Create Story",400,outlineData.error);
        }
        req.user.outlines.push(outlineData.data._id);
        await req.user.save();
        return SuccessRes(res,"Story Created",outlineData.data);
    }catch(err){
        console.log(err.message)
        return ErrorRes(res,"Cannot Create Story",500,err.message);
    }
}




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
                image_type: inputs.image_type
            },
            load_local: true,
            save_local: false
        }

        const response = await axios.post(uri+"/textbook",data);
        console.log(response.data);

        const outlineData =await CreateOutline(response.data.id,response.data.title,response.data.image,response.data.chapters_number , "textbook");
        if (!outlineData.success){
            return ErrorRes(res,"Cannot Create TextBook",400,outlineData.error);
        }
        req.user.outlines.push(outlineData.data._id);
        await req.user.save();
        return SuccessRes(res,"TextBook Created",outlineData.data);
    }catch(err){
        console.log(err.message)
        return ErrorRes(res,"Cannot Create TextBook",500,err.message);
    }
}





export async function CreateChapter(req,res){
    try {
        let {id , index} = req.params;

        let outline = await Outline.findOne({id : id})
    
        if (!outline){
            return ErrorRes(res,"Cannot Create Chapter",400,"Outline Not Found");
        }
    
        if (index > outline.chapters_number){
            return ErrorRes(res,"Cannot Create Chapter",400,"Index Out Of Bound");
        }


        let body = {
            load_local: true,
            save_local: false
        }


        let url = uri+"/"+outline.type+"/"+id+"/"+index;
        console.log(url);
    
    
        let response = await axios.post(url , body);
        console.log(response);
        if (!Chapter){
            return ErrorRes(res,"Cannot Create Chapter",400,Chapter.error);
        }
    
    
        let chapter = await Chapter.create({
            title: response.data.title,
            content: response.data.content,
            image: response.data.image,
            voice: response.data.voice
        })
        await chapter.save();
    
        outline.chapters.push(chapter._id);
    
        await outline.save();
    
        return SuccessRes(res,"Chapter Created",chapter);
    
    } catch (error) {
        console.log(error.message)
        return ErrorRes(res,"Cannot Create Chapter",500,error.message);
        
    }
















}



