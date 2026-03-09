import { UserTypeModel } from '../Models/UserModel.js'

export const checkAuthor = async (req, res, next) => {
    // get author id
    let authorId = req.body?.author || req.params?.authorId

    // verify author
    let verifyAuthor = await UserTypeModel.findById(authorId)

    // /if author not found
    if (!verifyAuthor) {
        return res.status(401).json({ message: "Invalid author" })
    }

    // 403 for forbidden 
    // if auther is there but role is != "AUTHOR"
    if (verifyAuthor.role != "AUTHOR") {
        return res.status(403).json({ message: "User is not an Author" })
    }

    // if author is not active
    if (!verifyAuthor.isActive) {
        return res.status(403).json({ message: "Author account is not active" })
    }

    // send response
    next()
}