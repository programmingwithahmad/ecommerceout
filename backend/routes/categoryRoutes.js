import express from "express";
import { isAdmin, requiresignin } from "../middlewares/authMiddleware.js";
import { createCategoryController, deleteCategoryController, readAllCategoryController, readSingleCategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router()

// Create a category
router.post('/create-category' , requiresignin, isAdmin, createCategoryController)

// Update a category
router.put('/update-category/:id' , requiresignin, isAdmin, updateCategoryController)

// Get All Categories
router.get('/get-category' , readAllCategoryController)

// Get Single Category
router.get('/single-category/:slug' , readSingleCategoryController)

// Delete a Category
router.delete('/delete-category/:id', requiresignin, isAdmin, deleteCategoryController)


export default router