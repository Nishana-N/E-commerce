import slugify from 'slugify';
import Categorymodel from '../Models/Categorymodel.js';


export const createcategoryController = async (req, res) => {
  try {
    // take name from req.body
    const { name } = req.body;

    //validate
    if (!name) {
      return res.status(400).send({ error: "Name is required" })
    }

    //check whether this name is already existing or not
    const ExistingCategory = await Categorymodel.findOne({ name });

    if (ExistingCategory) {
      return res.status(400).send({
        success: false,
        message: "Name is already registered"
      })
    }

    const slug = slugify(name);
    const category = await Categorymodel.create({ name, slug });
    console.log(category)
    res.status(201).send({
      success: true,
      message: "category created successfully",
      category
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "failed to create category",
      error
    })
  }
};


export const categoryController = async (req, res) => {
  try {


    const category = await Categorymodel.find({});
    
    res.status(201).send({
      success: "true",
      message: "Successfully got the category",
      category
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to get the category",
      error
    });
  }
};


export const updatecategoryController = async (req, res) => {

  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedCategory = await Categorymodel.findByIdAndUpdate(id, { name, slug: slugify(name) });
    res.status(201).send({
      success: true,
      message: "category updated successfully",
      updatedCategory
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to update category",
      error
    })
  }
};

export const deletecategoryCOntroller = async (req, res) => {
  try {
    const categoryId = req.params.id;
    await Categorymodel.findByIdAndDelete(categoryId);
    res.status(201).send({
      success: true,
      message: "category deleted succesfully",
    })
  } catch (error) {
    res.status(500).send({
      succes: false,
      message: "Failed to delete category"
    })
  }
}



export const singlecategoryController = async (req, res) => {
  try {
    const category = await Categorymodel.findOne({ slug: req.params.id });
    res.status(201).send({
      success: "true",
      message: "Successfully got the single category",
      category
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to get single category",
      error
    })
  }
}