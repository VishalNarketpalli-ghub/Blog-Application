import exp from 'express'
import { register, authenticate } from '../services/authService.js'
import { UserTypeModel } from '../Models/UserModel.js'
import { ArticleModel } from '../Models/ArticleModel.js'
import { checkUser } from '../middlewear/checkUser.js'

export const userRoute = exp.Router()


// register user
userRoute.post('/users', async (req, res) => {
    //get user object from req
    let userObj = req.body

    //call register function
    const newUserObj = await register({ ...userObj, role: "USERS" })

    //send response
    res.status(201).json({ message: "User created", payload: newUserObj })
})


// read all articles
userRoute.get('/user/:uid', checkUser, async (req, res) => {

    // check for valid user is done by middlewear   

    // retreive all articles 
    let articles = await ArticleModel.find({ isArticleActive: true })
    // console.log(articles)

    // send response to user
    res.status(200).json({ message: "All articles fetched", payload: articles })
})


// add comment to an article
userRoute.post('/users-comment', checkUser, async (req, res) => {
    // retreive uid, articleId, Comment from body
    let { uid, articleId, comment } = req.body

    // find article exists
    let article = await ArticleModel.findById(articleId)
    if (!article) {
        return res.status(404).json({ message: "Article not found" })
    }

    // add comment to array of article with userObjId and comment string
    let updatedComments = await ArticleModel.findByIdAndUpdate(articleId,
        {
            $push: {
                comments: {
                    user: uid,
                    comments: comment
                }
            }
        }, { new: true }
    )

    res.status(200).json({ message: "Comment added successfully", pauload: updatedComments })

})