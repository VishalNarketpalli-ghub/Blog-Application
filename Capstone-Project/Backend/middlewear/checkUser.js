import { UserTypeModel } from "../Models/UserModel.js"


export const checkUser = async (req, res, next) => {
    // get uid from params
    let uid = req.params?.uid || req.body?.uid

    // fetch user from db
    let userObj = await UserTypeModel.findById(uid)

    // check if user exists in db
    if (!userObj) {
        return res.status(404).json({ message: "User doesnot exist" })
    }

    // check if user role is user
    if (userObj.role != "USERS") {
        return res.status(401).json({ message: "Invalid role for user" })
    }

    // check if isActive is true
    if (userObj.isActive === false) {
        return res.status(401).json({ message: "User is not active, contact admin" })
    }

    // call next middlewear / api
    next()
}