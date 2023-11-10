import Chapter from "../models/Chapter.js";
import User from "../models/User.js";



 /**
  * @description {Create Chapter}
  * @param {*} title 
  * @param {*} content 
  * @param {*} image 
  * @param {*} voice 
  * @returns {Chapter}
  */
export async function CreateChapter (title  , content , image , voice){
    
        try{
            const chapter = await Chapter.create({title , content , image , voice})
            
            return chapter
        }catch(err){
            console.log(err.message)
            return null
        }   

}

/**
 * @description {Get User Chapters}
 * @param {*} id  {Chapter ID}
 * @returns  {Chapter}
 * 
 */

export async function GetChapterById(id){
    try{
        const chapter = await Chapter.findById(id)
        return chapter
    }catch(err){
        console.log(err.message)
        return null
    }
}


export async function DeleteChapter(ID){
    try{
        const chapter = await Chapter.findByIdAndDelete(ID)
        return chapter
    }catch(err){
        console.log(err.message)
        return null
    }
}








