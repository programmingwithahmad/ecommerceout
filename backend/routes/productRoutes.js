import express from 'express';
import { isAdmin, requiresignin } from '../middlewares/authMiddleware.js';
import { createProductController, deleteProductController, getAllProductController, getSingleProductController, productCountController, productFiltersController, productPhotoController, updateProductController, productListController, searchProductController, relatedProductController, productCategoryController, braintreeTokenController, braintreePaymentController} from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

//routing

// Create Product
router.post('/create-product', requiresignin, isAdmin, formidable(), createProductController)

// Read All Product
router.get('/get-product', getAllProductController)

// Read Single Product
router.get('/single-product/:slug' , getSingleProductController)

// Get Photo
router.get('/product-photo/:pid', productPhotoController)

// Delete Product
router.delete('/delete-product/:pid', deleteProductController)

// Update Product
router.put('/update-product/:pid', requiresignin, isAdmin, formidable(), updateProductController)

// Filters
router.post('/product-filters', productFiltersController)

// Product Count
router.get('/product-count', productCountController)

// Product Per Page
router.get('/product-list/:page', productListController)
 
// search product
router.get('/search/:keyword', searchProductController)

// similar product
router.get('/related-product/:pid/:cid', relatedProductController)

// get product by by giving category slug
router.get('/product-category/:slug', productCategoryController)

//***Braintree Routes***
// Token route
router.get('/braintree/token', braintreeTokenController)

// Payment route
router.post('/braintree/payment', requiresignin, braintreePaymentController)


export default router;