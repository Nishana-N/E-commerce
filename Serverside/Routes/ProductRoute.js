import  express  from "express";
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from "../Controllers/ProductController.js";
import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-product",requireSignIn,isAdmin, formidable(), createProductController);

router.get("/get-product", getProductController);

router.get("/get-singleproduct/:slug", getSingleProductController);

router.get("/product-photo/:pid", productPhotoController);

router.delete("/delete/:pid", deleteProductController);

router.put("/product-update/:pid", requireSignIn,isAdmin,formidable(),updateProductController);

router.post("/product-filter", productFilterController);

router.get("/product-count", productCountController);

//search a product
router.get("/search/:keyword",searchProductController);

router.get("/related-product/:pid/:cid",relatedProductController )

router.get("/product-list/:page", productListController);

//to display categorywise product
router.get("/product-category/:slug", productCategoryController);

router.get("/braintree/token",braintreeTokenController)

router.post("/braintree/payment", braintreePaymentController)
export default router;
