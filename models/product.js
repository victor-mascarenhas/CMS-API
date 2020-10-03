const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({    
    photo: {
        type : String,
        required : true
    },
    title: {
        type : String,
        required : true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    highlight: {
        type : Boolean,
        default: false
    },
    description: {
        type : String,
        required : true
    },
    complete_description: {
        type : String
    },
    price: {
        type : Number,
        min: 1,
        required : true
    },
    discount_price: {
        type : Number,
        min: 1
    },
    discount_price_percent: {
        type : Number,
        min: 1        
    },
    last_modified_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
        
    },
    last_modified_date: {
        type: Date,
        default: Date.now
      },
    status: {
        type : Boolean,
        default : true
    },  
}, {autoCreate : true})

module.exports = mongoose.model('product', ProductSchema);