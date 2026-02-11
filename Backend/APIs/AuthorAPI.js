import exp from 'express'
import { register, authenticate } from '../services/authService.js'
import { UserTypeModel } from '../Models/UserModel.js'
import { ArticleModel } from '../Models/ArticleModel.js'
import { checkAuthor } from '../middlewear/checkAuthor.js'
import { verifyToken } from '../middlewear/verifyToken.js'

export const authorApp = exp.Router()



// register author (public)
authorApp.post('/users', async (req, res) => {
    let userObj = req.body
    let newUserObj = await register({ ...userObj, role: "AUTHOR" })
    res.status(201).json({ message: "User crated successfully", payload: newUserObj })
})

// authenticate author (public)

// create article (protected)
authorApp.post('/articles', verifyToken, checkAuthor, async (req, res) => {

    // get the article
    let articleObj = req.body

    // create article doc
    let articleDoc = new ArticleModel(articleObj)

    // save
    let createdArticleDoc = await articleDoc.save()

    // send res
    res.status(201).json({ message: "Article created", payload: createdArticleDoc })
})

// read articles from author (protected)
authorApp.get('/articles/:authorId', verifyToken, checkAuthor, async (req, res) => {
    // get the auther id
    let authorId = req.params.authorId

    // read article by author
    let articles = await ArticleModel.find({ author: authorId, isArticleActive: true }).populate("author", "firstName email")

    // send res
    res.status(201).json({ message: "Articles fetched", payload: articles })
})


// edit article (protected)
authorApp.put('/articles', verifyToken, checkAuthor, async (req, res) => {
    // get the update details from body
    let { articleId, author, title, category, content } = req.body
    // console.log(updateArticleObj)

    let articleOfDB = await ArticleModel.findOne({ _id: articleId, author: author })
    if (!articleOfDB) {
        return res.status(404).json({ message: "Article not found" })
    }

    let foundArticle = await ArticleModel.findByIdAndUpdate(articleId, { $set: { title, category, content } }, { new: true })
    res.status(200).json({ message: "Article updated successfullt", payload: foundArticle })
})

// delete article (soft) (protected)
authorApp.put('/articles-delete', verifyToken, checkAuthor, async (req, res) => {
    // destructre
    let { authorId, articleId } = req.body

    // check if article exist
    let articleOfDB = await ArticleModel.findOne({ _id: articleId, author: authorId })
    if (!articleOfDB) {
        return res.status(404).json({ message: "Article not found" })
    }

    let updatedArticle = await ArticleModel.findByIdAndUpdate(articleId, { $set: { isArticleActive: false } }, { new: true })

    // send response
    res.status(200).json({ message: "Article deleted", payload: updatedArticle })
})
