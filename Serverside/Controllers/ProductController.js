import slugify from "slugify";
import Productmodel from "../Models/Productmodel.js";
import fs from "fs"
import Categorymodel from "../Models/Categorymodel.js";
import dotenv  from 'dotenv';
import braintree from "braintree";
import Ordermodel from "../Models/Ordermodel.js";

dotenv.config();

// const gateway = new braintree.BraintreeGateway({
//     Environment:braintree.Environment.Sandbox,
//     merchantid: process.env.BRAINTREE_MERCHANTID,
//     publickey: process.env.BRAINTREE_PUBLIC_KEY,
//     privatekey: process.env.BRAINTREE_PRIVATE_KEY,
// });

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANR_ID,
    publicKey: process.env.BRAINTREE_PUBLICK_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });





export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });
            case !description:
                return res.status(500).send({ error: "Description is required" });
            case !price:
                return res.status(500).send({ error: "Price is required" });
            case !category:
                return res.status(500).send({ error: "Category is required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is required and should be less than 1mb" })
        }

        const products = new Productmodel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save()

        res.status(201).send({
            success: true,
            message: "Product created successfully",
            products,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to create product",
            error
        })
    }
};



export const getProductController = async (req, res) => {
    try {
        const products = await Productmodel
            .find({})
            .populate("category")
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            counTotal: products.length,
            message: "All products",
            products,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            message: "error",
            error: error.message
        })


    }
};

export const getSingleProductController = async (req, res) => {
    try {
        const product = await Productmodel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Single product fetched",
            product,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            message: "Error while getting single product",
            error,
        })
    }
};

export const productPhotoController = async (req, res) => {
    try {
        const product = await Productmodel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            message: "Error while getting photo",
            error,
        })
    }
};

export const deleteProductController = async (req, res) => {
    try {
        const productId = req.params.pid;
        await Productmodel.findByIdAndDelete(productId).select("photo");
        res.status(200).send({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            message: "Error while deleting the product",
            error,
        })
    }
};

export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });
            case !description:
                return res.status(500).send({ error: "Description is required" });
            case !price:
                return res.status(500).send({ error: "Price is required" });
            case !category:
                return res.status(500).send({ error: "Category is required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is required and should be less than 1mb" })
        }

        const product = await Productmodel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();
        
        res.status(201).send({
            success: true,
            message: "Product updated successfully",
            product,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            message: "Error while updating the product",
            error,
        })
    }
};


export const productFilterController = async (req, res) => {
    try {
        const { checked , radio } = req.body; //inside checked contain id and radio contain range of price
        let args = {}; // declared by null  db il filter cheyyan vedi ulla  empty object
        if(checked.length > 0) args.category = checked; //categorine legth check cheythitt aa value ine empty objectil store cheyya
        if(radio.length) args.price = { $gte: radio[0], $lte: radio[1]}; //gte means >= lte means <= [0,1]=> namamal fe il price kodthapole ullath [price range kittan]
        const products = await Productmodel.find(args); //display empty object
        res.status(200).send({
            success:true,
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error while filtering the products"
        })
    }
};

export const productCountController = async (req,res) => {
    try {
        const total = await Productmodel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success:true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message:"Error in product count",
            success: false,
            error
        })
    }
};

export const productListController = async (req,res) => {
    try {
       const perPage = 6;
       const page = req.params.page ? req.params.page : 1;
       const products = await Productmodel
       .find({})
       .select("-photo")
       .skip((page -1) * perPage)
       .limit(perPage)
       .sort({createdAt: -1 });
       res.status(200).send({
        success:true,
        products,
       }) ;
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"Error in per page ctrl",
            error
        })
    }
};

export const searchProductController =  async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await Productmodel
         .find({
            $or: [
                { name: { $regex: keyword, $options: 'i'} }, // regex is an operator for matching
                { description: {$regex: keyword, $options: "i"} },//i=> specific variable 
            ],
         })
         .select("-photo");//get cheyubo - kodkkanam
         res.json(results);

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message:"Error in search product API",
            error,
        });
    }
};

export const relatedProductController = async (req,res) => {
    try {
        const { pid, cid} = req.params;
        const products = await Productmodel
         .find({
            category: cid,
            _id: { $ne: pid},
         })
         .select("-photo")
         .limit(3)
         .populate("category");
         res.status(200).send({
            success:true,
            products,
         });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:" Error in searching similar product api",
            error,
        });
    }
};

//to get product by category
export const productCategoryController = async (req,res) => {
    try {
        const category = await Categorymodel.findOne({slug: req.params.slug});
        const products = await Productmodel.find({ category }).populate("category");
        res.status(200).send({
            success:true,
            category,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            error,
            message:"Error in getting products"
        })
    }
};

// export const braintreeTokenController = async (req,res) => {
//     try {
//         gateway.clientToken.generate({}, function (err,response) {
//             if(err) {
//                 res.status(500).send(err);
//             } else {
//                 res.send(response)
//             }
//         });
//     } catch (error) {
//         console.log(error)
//     }
// };

// export const braintreePaymentController = async (req,res)=> {
//     try {
//         const { nonce, cart} = req.body;
//         let total = 0;
//         cart.map((i) => {
//             total += i.price;
//         });
//         let newTransaction = gateway.transaction.sale(
//             {
//                 amount: total,
//                 paymentMethodNonce: nonce,
//                 options: {
//                     submitForSettlement : true,
//                 },
//             },
//             function (error, result) {
//                 if(result) {
//                     const order = new Ordermodel({
//                         products: cart,
//                         payment: result,
//                         buyer: req.user._id,
//                     }).save();
//                     res.json({ ok:true});
//                 }  else {
//                     res.status(500).send(error)
//                 }
//             }
//         );
//      } catch (error) {
//         console.log(error)
//     }
// };

export const braintreeTokenController = async (req, res) => {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  // //payment
  export const brainTreePaymentController = async (req, res) => {
    try {
      const { nonce, cart } = req.body;
      let total = 0;
      cart.map((i) => {
        total += i.price;
      });
      let newTransaction = gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        function (error, result) {
          if (result) {
            const order = new Ordermodel({            products: cart,
              payment: result,
              buyer: req.user._id,
            }).save();
            res.json({ ok: true });
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };