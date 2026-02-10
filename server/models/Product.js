const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: 500
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['burgers', 'grilled', 'wraps', 'sides', 'drinks', 'desserts'],
        lowercase: true
    },
    image: {
        type: String,
        default: ''
    },
    featured: {
        type: Boolean,
        default: false
    },
    available: {
        type: Boolean,
        default: true
    },
    preparationTime: {
        type: Number,
        default: 15,
        min: 1
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
