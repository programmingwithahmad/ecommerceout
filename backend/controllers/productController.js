import slugify from 'slugify';
import productModel from '../models/productModel.js';
import fs from 'fs';
import categoryModel from '../models/categoryModel.js';
import braintree from 'braintree';
import orderModel from '../models/orderModel.js';
import dotenv from 'dotenv';
import { request } from 'http';

// For Payment Gateway
dotenv.config();  
       // we use dotenv.config here because these three values not accessible and server give error. 
      // if we dont write this we want to use this instance in a function. 
const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
  });


// Create a Product
export const createProductController = async (req, res) => {
try {
    const {name, description, price, category, quantity} = req.fields
    const {photo} = req.files
    
    // validation
    switch (true) {
        case !name :
            return res.status(400).send({success: false, message: 'Please provide a name'})
        case !description :
            return res.status(400).send({success: false, message: 'Please provide a description'})
        case !price :
            return res.status(400).send({success: false, message: 'Please provide a price'})
        case !category :
            return res.status(400).send({success: false, message: 'Please provide a category'})
        case !quantity :
            return res.status(400).send({success: false, message: 'Please provide a quantity'})
        case !photo :
            return res.status(400).send({success: false, message: 'Please provide a photo'})
        case photo && photo.size > 1000000 :
            return res.status(400).send({success: false, message: 'Photo is required and should be less than 1mb'})
    }
    const products = new productModel({...req.fields, slug: slugify(name)})
    if(photo){
        products.photo.data = fs.readFileSync(photo.path)
        products.photo.contentType = photo.type
    }
    await products.save()
    res.status(200).send({success: true, message: 'Product created successfully', products})
} catch (error) {
    console.log(error)
    res.status(500).send({
        success: false,
        message: 'Error in creating product',error
    })
}
}

// Get all products
export const getAllProductController = async (req, res) => {
    try {
        const products = await productModel.find().select('-photo').populate('category').sort({createdAt: -1})
        res.status(200).send({success: true,total: products.length  ,message: 'All products fetched' , products})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false, 
            message: 'Error in getting All products',error
        })
    }
}

// Get single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({slug: req.params.slug}).select('-photo').populate('category')
        res.status(200).send({success: true, message: 'Single product fetched', product})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting single product',error
        })
    }
}

// Get Photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid)?.select('photo')
        if(product?.photo?.data){
            res.set('Content-Type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
        res.status(200).send({success: true, message: 'Photo fetched', product})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting photo',error
        })
    }
}

// Delete Product
export const deleteProductController = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({success: true, message: 'Product deleted successfully', product})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in deleting product',error
        })
    }
}

// Update a Product
export const updateProductController = async (req, res) => {
    try {
        const {name, description, price, category, quantity} = req.fields
        const {photo} = req.files
        
        // validation
        switch (true) {
            case !name :
                return res.status(400).send({success: false, message: 'Please provide a name'})
            case !description :
                return res.status(400).send({success: false, message: 'Please provide a description'})
            case !price :
                return res.status(400).send({success: false, message: 'Please provide a price'})
            case !category :
                return res.status(400).send({success: false, message: 'Please provide a category'})
            case !quantity :
                return res.status(400).send({success: false, message: 'Please provide a quantity'})
            case photo && photo.size > 1000000 :
                return res.status(400).send({success: false, message: 'Photo is required and should be less than 1mb'})
        }
        const products = await productModel.findByIdAndUpdate(req.params.pid,{...req.fields, slug: slugify(name)}, {new: true})
        if(photo){
            await productModel.findByIdAndUpdate(req.params.pid, {photo:{data:fs.readFileSync(photo?.path), contentType:photo?.type}}, {new: true})

        }
        res.status(200).send({success: true, message: 'Product updated successfully', products})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in updating product',error
        })
    }
    }

    // Filter product
    export const productFiltersController = async (req, res) => {
        try {
            const {checked, radio} = req.body
            console.log(radio)
            console.log('1st'+ radio[0], '2nd'+ radio[1])
            let args = {}
            if(checked.length>0) {
                args.category = checked
            }
            if(radio.length) {
                args.price = {$gte: radio[0] , $lte: radio[1]}
            }
            const products = await productModel.find(args)
            res.status(200).send({success: true, message: 'Products filtered successfully', products})
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success: false, 
                message: 'Error in product filtering',error
            })
        }
    }

// Product Count
    export const productCountController = async (req, res) => {
        try {
            const total = await productModel.estimatedDocumentCount()
            res.status(200).send({success: true, message: 'Products fetched',total})
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success: false, 
                message: 'Error in getting product count',error
            })
        }
    }

// Product list base on page
    export const productListController = async(req, res) => {
        try {
            const {page} = req.params
            const limit = 8
            const products = await productModel.find().select('-photo').skip((page - 1) * limit).limit(limit).sort({createdAt: -1})
            res.status(200).send({success: true, message: 'Products fetched', products})
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success: false, 
                message: 'Error in per page ctrl',error
            })
            
        } 
    }

// search product
export const searchProductController = async(req, res) => {
    try {
        const {keyword} = req.params
        const products = await productModel.find({
            $or: [
                {name: {$regex: keyword, $options: 'i'}},
                {description: {$regex: keyword, $options: 'i'}}
            ]
        }).select('-photo');
        res.status(200).send({success: true, message: 'Products fetched', products})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in searching product',error
        })
    }
} 


export const relatedProductController = async (req, res) => {
    try {
        const {pid,cid} = req.params
        const products = await productModel.find({
            category: cid,
            _id: {$ne: pid}
        }).select('-photo').populate('category')
          
        res.status(200).send({success: true, message: 'Related products fetched', products})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting related products',error
        })
    }
}

export const productCategoryController = async(req, res) => {
    try {
        const {slug} = req.params
        const category = await categoryModel.findOne({slug})
        const products = await productModel.find({category}).select('-photo').populate('category')
        res.status(200).send({success: true, message: 'products fetched by category', products})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting productCategoryController',error
        })
    }
}

// Payment gateway api
// token
export const braintreeTokenController = async(req, res) => {
    try {
          const clientToken = await gateway.clientToken.generate();
          res.status(200).send({success: true, message: 'Token fetched', clientToken})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting token',error
        })
        
    }

}

// payment
export const braintreePaymentController = async(req, res) => {
    try {
        const {cart, nonce} = req.body
        let total = 0;
        cart.map((i)=> {
            total += i.price;
        })

          
           let newTransaction = gateway.transaction.sale({
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                submitForSettlement: true
                }
            })
            if(newTransaction){
                const order =new orderModel({product: cart, payment: newTransaction, buyer: req.user._id}).save()
                return res.status(200).send({success: true,message: 'Payment done', order})
            }
            
    } catch (error) {
        console.log(error)
        res.status(500).send({success: false,message: 'Error in getting payment',error})
    }
}


 