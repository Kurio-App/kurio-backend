

import axios from "axios";
import {uri} from "../utils/constants.js";
import { CreateOutline } from "../services/OutlineServices.js";
import { ErrorRes, SuccessRes } from "../utils/response.js";


export async function CreateStory(req,res){
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






// {
//     "generation_params": {
//       "age": 0,
//       "language": "English",
//       "story_genres": [
//         "Drama"
//       ],
//       "story_morals": [
//         "Honesty"
//       ],
//       "story_length": "Short",
//       "story_chapter_length": "Short",
//       "user_preferences": [
//         "string"
//       ],
//       "image_type": "comic-book"
//     },
//     "load_local": true,
//     "save_local": false
//   }
  



// {
//     "generation_params": {
//       "age": 0,
//       "language": "English",
//       "field": "Astronomy",
//       "topic": "string",
//       "learning_textbook_length": "Short",
//       "learning_chapter_length": "Short",
//       "depth": "Superficial",
//       "level": "Basic",
//       "user_preferences": [
//         "string"
//       ],
//       "image_type": "comic-book"
//     },
//     "load_local": true,
//     "save_local": false
//   }