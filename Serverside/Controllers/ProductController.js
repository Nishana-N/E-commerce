import slugify from "slugify";
import Productmodel from "../Models/Productmodel.js";
import fs from "fs"

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
}


