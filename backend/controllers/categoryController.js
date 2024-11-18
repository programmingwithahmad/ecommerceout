import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";


// Create a new category
export const createCategoryController = async (req, res) => {
try {
    const {name} = req.body;
    if (!name) {
        return res.status(400).send({
            success: false,
            message: 'Please provide a name'
        })
    }
    const existingCategory = await categoryModel.findOne({name})
    if (existingCategory) {
        return res.status(400).send({
            success: false,
            message: 'Category already exists'
        }) 
    }
    const newCategory = new categoryModel({name, slug: slugify(name)}).save()
    res.status(200).send({success: true, message: 'Category created successfully', newCategory})
} catch (error) {
    console.log(error)
    res.status(500).send({
        success: false,
        message: 'Error in creating category',error
    })
    
}
}

// Update a category

export const updateCategoryController = async (req, res) => {
    try {
        const {name} = req.body
     const {id} = req.params
    if (!name) {
        return res.status(400).send({
            success: false,
            message: 'Please provide updating name'
        })
    }
    const find = await categoryModel.findOne({name})
    if (find) {
        return res.status(400).send({
            success: false,
            message: 'Category already exists'
        })
    }
    const category = await categoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new:true})
    res.status(200).send({success: true, message: 'Category updated successfully', category})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in updating category',error
        })
        
    }
}

// Get All Categories
export const readAllCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find().sort({createdAt: -1})
        res.status(200).send({success: true, message: 'Categories fetched successfully', category})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in fetching categories',error
        })
        
    }
}

// Get Single Category
export const readSingleCategoryController = async (req, res) => {
    try {
        const {slug} = req.params 
        const category = await categoryModel.findOne({slug})
        res.status(200).send({success: true, message: 'Category fetched successfully', category})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in fetching category',error
        })
        
    }
}


// Delete Category
export const deleteCategoryController = async (req, res) => {
    try {
        const {id} = req.params
        const category = await categoryModel.findByIdAndDelete(id)
        res.status(200).send({success: true, message: 'Category deleted successfully', category})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in deleting category',error
        })
        
    }
}