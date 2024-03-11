import jwt from 'jsonwebtoken'
import Usermodel from '../Models/Usermodel.js'

export const requireSignIn = async(req,res,next) => {
    try {
        const decode = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();
    } catch (error) {
        console.log(error)
    }
}

//admin acess
export const isAdmin = async (req,res,next) => {
    try {
        const user = await Usermodel.findById(req.user._id);
        if(user.role !==1) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access"
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            message:"Error in admin middleware",
            error
        })
    }
}