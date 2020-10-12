const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Product = require('../../models/product');
const MSGS = require('../../messages');
const auth = require('../../middleware/auth');
const file = require('../../middleware/file')


//@route  POST /product
//@desc   CREATE product
//@acess  Public
router.post('/', auth, file, async (req, res, next) => {
    try{          
        const errors = validationResult(req)        
        if (!errors.isEmpty()) {
            return res.status(400).json ({ errors: errors.array()})
        }else{
            // TODO get last_modified_by by req.user after cod auth
            req.body.photo = `uploads/${req.files.photo.name}`
            let product = new Product(req.body)
        
        await product.save()        
        if (product.id){
            res.status(201).json(product);
        }      
      } 
    }catch(err){
        console.error(err.message)
        res.status(500).send({'error': MSGS.GENERIC_ERROR})
    }
})

//@route   GET/product
//@desc    LIST product
//@access  Public
router.get('/', auth, async (req, res, next) => {
    try {
        const product = await Product.find({})
        res.json(product)        
    }catch(err){
        console.error(err.message)
        res.status(500).send({"error": MSGS.GENERIC_ERROR})
    }
                
})

//@route   GET/product/:id
//@desc    DETAIL product
//@access  Public
router.get('/:id', auth, async (req, res, next) => {
    try {
        const id = req.params.id
        const product = await Product.findOne({_id : id})
        if(product){
            res.json(product)  
        }else{
            res.status(404).send({"error": MSGS.PRODUCT_404})
        }      
    }catch(err){
        console.error(err.message)
        res.status(500).send({"error": MSGS.GENERIC_ERROR})
    }
                
})

//@route   DELETE/product/:id
//@desc    DELETE product
//@access  Public
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const id = req.params.id
        const product = await Product.findOneAndDelete({_id : id})
        if(product){
            res.json(product)  
        }else{
            res.status(404).send({"error": MSGS.PRODUCT_404})
        }      
    }catch(err){
        console.error(err.message)
        res.status(500).send({"error": MSGS.GENERIC_ERROR})
    }
                
})

//@route   PATCH/product/:id
//@desc    PARTIAL UPDATE product
//@access  Public
router.patch('/:id', auth, async (req, res, next) => {
    try {
        const id = req.params.id
        const update = {$set: req.body}
        const product = await Product.findByIdAndUpdate(id, update,{new: true})
        if(product){
            res.json(product)  
        }else{
            res.status(404).send({"error": MSGS.PRODUCT_404})
        }      
    }catch(err){
        console.error(err.message)
        res.status(500).send({"error": MSGS.GENERIC_ERROR})
    }
                
})


module.exports = router;