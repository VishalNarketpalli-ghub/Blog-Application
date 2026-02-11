import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()


export const verifyToken = async (req, res, next) => {

    // read token from token
    let token = req.cookies.token
    // console.log(token)

    // check if token exist
    if (!token) {
        return res.status(401).json({ message: "Unotherised req please login" })
    }

    // verify validity of token (decoding the token)
    let decodedToke = jwt.verify(token, process.env.JWT_SECRET)

    // forward req to next 
    next()
}