const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Category = require('../../models/category');


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
        res.status(500).send({'error': 'server error'})
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
        res.status(500).send({"error":"Server error"})
    }
                
})

module.exports = router;