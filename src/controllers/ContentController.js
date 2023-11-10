import axios from "axios";
import {uri , load_local} from "../utils/constants.js";
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
                story_theme : "Animals, Small village",
                language: "English",
                story_genres: inputs.story_genres,
                story_morals: inputs.story_morals,
                story_length: inputs.story_length,
                story_chapter_length: inputs.story_chapter_length,
                user_preferences: inputs.user_preferences,
                img_type: inputs.image_type
            },
            load_local: load_local,
            save_local: false


        }

        const response = await axios.post(uri+"/story",data);

        let outline = await Outline.findOne({id : response.data.id}).populate("chapters");

        if (outline){
            req.user.outlines.push(outline._id);
            await req.user.save();    
            return SuccessRes(res,"Story Created",outline);
        }


        const outlineData =await CreateOutline(response.data.id,response.data.title,response.data.image,response.data.chapters_number , "story");
        
        if (!outlineData.success){
            return ErrorRes(res,"Cannot Create Story",400,outlineData.error);
        }
        outline = outlineData.data;


        let body = {
            load_local: load_local,
            save_local: false
        }




        await outline.save();
        req.user.outlines.push(outline._id);
        await req.user.save();

        outline = await Outline.findOne({id : response.data.id}).populate("chapters");

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
                image_type: inputs.image_type
            },
            load_local: load_local,
            save_local: false
        }

        const response = await axios.post(uri+"/textbook",data);
        if (!response){
            return ErrorRes(res,"Cannot Create TextBook",400,"TextBook Not Found");
        }
        let outline = await Outline.findOne({id : response.data.id}).populate("chapters");
        
        if (outline){
            req.user.outlines.push(outline._id);
            await req.user.save();    
            return SuccessRes(res,"TextBook Created",outline);
        }


        const outlineData =await CreateOutline(response.data.id,response.data.title,response.data.image,response.data.chapters_number , "textbook");
        if (!outlineData.success){
            return ErrorRes(res,"Cannot Create TextBook",400,outlineData.error);
        }
        req.user.outlines.push(outlineData.data._id);
        await req.user.save();
        outline = outlineData.data;

        let body = {
            load_local: load_local,
            save_local: false
        }





    
        for (let index = 1; index <= outlineData.data.chapters_number; index++) {
            let    data = {}
            let url = uri+"/textbook/"+outlineData.data.id+"/"+index;
            let response2 = await axios.post(url , body);
             data = response2.data;

            let chapterModel = await CreateChapter(
                data.title,
                data.content,
                data.image,
                data.voice
            )
            if (!chapterModel){
                return ErrorRes(res,"Cannot Create TextBook",400,chapterModel.error);
            }

        
            outline.chapters.push(chapterModel._id);
    
        }




        await outline.save();
        outline = await Outline.findOne({id : response.data.id}).populate("chapters");
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


        let body = {
            load_local: load_local,
            save_local: false
        }


        let url = uri+"/"+outline.type+"/"+id+"/"+index;
    
    
        let response = await axios.post(url , body);
        let chapter = await CreateChapter({
            title: response.data.title,
            content: response.data.content,
            image: response.data.image,
            voice: response.data.voice
        })

            if (!chapter){
                return ErrorRes(res,"Cannot Create TextBook",400,chapterModel.error);
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
