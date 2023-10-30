import axios from 'axios';
import Quiz from '../models/Quiz.js';
import { uri } from '../utils/constants.js';
import { ErrorRes, SuccessRes } from '../utils/response.js';
import {load_local} from '../utils/constants.js';


/**
 * @access private
 * @param {*} {chapter_content , quiz_options_number}
 * @returns {Quiz}
 * @throws {Error} 
 */


export async function CreateQuiz(req, res) {
    try {
        let { chapter_content, quiz_options_number } = req.body;

        let body = {
            generation_params: {
                age: req.user.age ?? 0,
                chapter_content: chapter_content,
                quiz_options_number: quiz_options_number
            },
            load_local: false,
            save_local: false
        }

        let url = uri + "/quiz-item";


        let response = await axios.post(url, body);

        if (!response) {
            return ErrorRes(res, "Cannot Create Quiz", 400, "Quiz Not Found");
        }


        return SuccessRes(res, "Quiz Created", response.data);


          
         

    }
    catch (error) {
        console.log(error.message)
        return ErrorRes(res, "Cannot Create Quiz", 500, error.message);

    }

}