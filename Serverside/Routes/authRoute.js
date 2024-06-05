import  express , {Router} from "express";
import { forgetPasswordController, loginController, orderStatusController, registerController, testController, updateProfileController } from "../Controllers/authController.js";
import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";
const router = express.Router();


router.post("/register",registerController)


router.post("/login",loginController)

//forget password
router.post("/forgot-password", forgetPasswordController)



router.get("/test",requireSignIn,isAdmin, testController) //to test route

//used to check the signup is successfull or not
router.get("/user-auth", requireSignIn, (req,res) => {
    res.status(200).send({ok:true})
});

router.put("/profile", requireSignIn, updateProfileController);

router.get("/orders", requireSignIn, orderStatusController)

router.get("/admin-auth", requireSignIn, isAdmin, (req,res) => {
    res.status(200).send({ok : true});
});


export default router;