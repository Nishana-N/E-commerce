import  express  from "express";
import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";
import { categoryController, createcategoryController, deletecategoryCOntroller, singlecategoryController, updatecategoryController } from "../Controllers/createcategoryController.js";
const router = express.Router();

//route for create category
router.post('/create-category',requireSignIn,isAdmin,createcategoryController);

//route to get category
router.get("/get-category", categoryController)

//route to update the category
router.put("/update-category/:id", requireSignIn, isAdmin, updatecategoryController)

//route to delete category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deletecategoryCOntroller)

//route to get single category
router.get("/single-category/:slug", singlecategoryController)


export default router;





















