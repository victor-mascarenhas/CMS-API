const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Category = require('../../models/category');
const MSGS = require('../../messages')


//@route  POST /category
//@desc   CREATE category
//@acess  Public
router.post('/', [
    check('name', "Name Required").not().isEmpty(),check('icon').not().isEmpty()   
], async (req, res, next) => {
    try{
        let { name, icon } = req.body        
        const errors = validationResult(req)        
        if (!errors.isEmpty()) {
            return res.status(400).json ({ errors: errors.array()})
        }else{
            let category = new Category({name, icon})
        
        await category.save()        
        if (category.id){
            res.status(201).json(category);
        }      
      } 
    }catch(err){
        console.error(err.message)
        res.status(500).send({'error': MSGS.GENERIC_ERROR})
    }
})

//@route   GET/category
//@desc    LIST category
//@access  Public
router.get('/', async (req, res, next) => {
    try {
        const category = await Category.find({})
        res.json(category)        
    }catch(err){
        console.error(err.message)
        res.status(500).send({"error": MSGS.GENERIC_ERROR})
    }
                
})

//@route   GET/category
//@desc    DETAIL category
//@access  Public
router.get('/:categoryId', async (req, res, next) => {
    try {
        const id = req.params.id
        const category = await Category.findOne({_id : id})
        if(category){
            res.json(category)  
        }else{
            res.status(404).send({"error": MSGS.CATEGORY_404})
        }      
    }catch(err){
        console.error(err.message)
        res.status(500).send({"error": MSGS.GENERIC_ERROR})
    }
                
})


module.exports = router;