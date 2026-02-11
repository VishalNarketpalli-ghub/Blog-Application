import exp from 'express'
import { ArticleModel } from '../Models/ArticleModel.js'
import { UserTypeModel } from '../Models/UserModel.js'
import { checkUser } from '../middlewear/checkUser.js'

export const adminApp = exp.Router()



// authenticate admin



// read all articles
adminApp.get('/read', async (req, res) => {
    // find all articles
    let articles = await ArticleModel.find()
    // console.log(articles)

    // send response
    res.status(200).json({ message: "all articles fetched", payload: articles })
})

// unblock user roles
adminApp.get('/block/:uid', async (req, res) => {
    // destructre uid, active
    let uid = req.params.uid


    // checking user present in db
    let user = await UserTypeModel.findById(uid)
    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }

    // find user and update isActive
    let updatedUser = await UserTypeModel.findByIdAndUpdate(uid, { isActive: false }, { new: true })

    // send response
    res.status(200).json({ message: `${updatedUser.firstName} named user is blocked`, payload: updatedUser })
})



// unblock user
adminApp.get('/un-block/:uid', async (req, res) => {
    // destructre uid, active
    let uid = req.params.uid

    // checking user present in db
    let user = await UserTypeModel.findById(uid)
    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }

    // find user and update isActive
    let updatedUser = await UserTypeModel.findByIdAndUpdate(uid, { isActive: true }, { new: true })

    // send response
    res.status(200).json({ message: `${updatedUser.firstName} named user is Un-blocked`, payload: updatedUser })
})