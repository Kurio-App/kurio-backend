import Outline from "../models/Outline.js";
import User from "../models/User.js";

/**
 * @description {Create Outline}
 * @access private
 * @param {*} id 
 * @param {*} title 
 * @param {*} image 
 * @param {*} chapters_number 
 * @param {*} type 
 * @returns {Outline}
 */

export async function CreateOutline(id,title ,image , chapters_number ,type ) {
    try{
        const outline = await Outline.create({title , image , chapters_number , id , type})

        return {
            data : outline,
            success : true

        }


    }catch  (err){
        console.log(err.message)
        return {
            error : err.message,
            success : false

        }
    }
}



export async function GetOutlineById(id){
    try {

        const outline = await Outline.findById(id)
        return outline

        
    } catch (error) {
        
        console.log(error.message)
        return null
    }}



export async function GetUserOutlines(id){
    try{
 const   outlines = await     User.findById(id).populate("outlines")
        return outlines
        
    }catch(err){
        console.log(err.message)
        return null
    }
}


