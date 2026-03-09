import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserTypeModel } from '../Models/UserModel.js'
import { config } from 'dotenv'
config()

//  register
// Create document
// validate for mpty pswd
// hash the password
// save
// convert doc to obj to remove pswd
// remove password
// return user obj without password

export const register = async (userObj) => {
    //create document
    const userDoc = new UserTypeModel(userObj)
    //validate for empty password
    await userDoc.validate()
    //hash and replace plain password
    userDoc.password = await bcrypt.hash(userDoc.password, 10)
    //save
    const created = await userDoc.save()
    //convert document to object to remove password
    const newUserObj = created.toObject()
    //remove password
    delete newUserObj.password
    //return the user obj without the password
    return newUserObj
}


//authenticate

export const authenticate = async ({ email, password }) => {
    // console.log(email, role, password)

    // check user mail and role
    const userDoc = await UserTypeModel.findOne({ email })
    if (!userDoc) {
        const err = new Error("Invalid Email")
        err.status = 401
        throw err
    }

    //compare passwords
    const isMatch = await bcrypt.compare(password, userDoc.password)
    if (!isMatch) {
        const err = new Error("Invalid Password")
        err.status = 401
        throw err
    }

    // check if user is active
    if (userDoc.isActive === false) {
        const err = new Error("user is blocked by admin, Contact admin for details")
        err.status = 403;
        throw err
    }

    //generate the token
    const token = jwt.sign({ userId: userDoc._id, role: userDoc.role, email: userDoc.email },
        process.env.JWT_SECRET, {
        expiresIn: "1h"
    })

    const userObj = userDoc.toObject();
    delete userObj.password;

    return { token, user: userObj }
}