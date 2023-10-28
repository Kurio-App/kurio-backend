import Content from "../models/Content.js"



export async function CreateChapter(title , [Chapter]) {
    try{
        const content = await Content.create({title , $push : {chapters : Chapter} })
        return content

    }catch  (err){
        console.log(err.message)
        return null
    }
}


export async function GetContentById(id){
    try {

        const content = await Content.findById(id).populate("chapters")
        return content

        
    } catch (error) {
        
        console.log(error.message)
        return null
    }}

export async function  GetContentByTitle(title){
        try{
        const content = await Content.findOne({title}).populate("chapters")
        return content
        }catch(err){
            console.log(err.message)
            return null
        }
    }
        


export async function DeleteContent(ID){
    try{
        const content = await Content.findByIdAndDelete(ID)
        return content
    }catch(err){
        console.log(err.message)
        return null
    }
}






    