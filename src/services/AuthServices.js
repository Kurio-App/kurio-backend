import exp from "constants";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { getUserByEmail } from "./UserServices.js";




/**
 * @description {Login User}
 * @param {*} email
 * @param {*} password
 * @returns {User , success , message}
 * @throws {error}
 */

export async function loginUser(email, password) {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        success: false,
        message: "Password is incorrect",
      };
    }
    return {
      success: true,
      message: "Login Success",
      data: user,
    };
  } catch (error) {
    return {
      message: "Cannot Login User",
      error: error.message,
      success: false,
    };
  }
}

/**
 * @description {Register User}
 * @param {*} email
 * @param {*} password
 * @param {*} user
 * @returns  { User , success , message}
 * @throws {error}
 */

export async function registerUser(email, password, name) {
  try {
    const user = await getUserByEmail(email);
    if (user) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // const code = generateCode(4);
    const newUser = new User({
    email : email,
    name: name,
      password: hashPassword,
      verificationCode: "1234",
    });
    await newUser.save();
    //
    return {
      success: true,
      message: "User Created Successfully",
      data: newUser,
    };
  } catch (error) {
    console.log(error.message);

    return {
      success: false,
      message: "Cannot Create User",
      error: error.message,
    };
  }
}


/**
 * @description {Verify User}
 * @param {*} email
 * @param {*} code
 * @returns  { User , success , message}
 * @throws {error}
 */


export async function verifyUser(email, code) {

    try {
        const user = getUserByEmail(email);
        if (!user) {
            return {
                success: false,
                message: "User not found",
            };
        }

        if (user.isVerified) {
            return {
                success: false,
                message: "User already verified",
            };
        }

        if (user.verificationCode !== code) {
            return {
                success: false,
                message: "Code is incorrect",
            };
        }

        user.isVerified = true;
        await user.save();
        return {
            success: true,
            message: "User Verified Successfully",
            data: user,
        };
        
    } catch (error) {
        return {
            success: false,
            message: "Cannot Verify User",
            error: error.message,
        };
    }
}