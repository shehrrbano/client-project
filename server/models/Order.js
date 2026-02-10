const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String, default: '' }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        unique: true
    },
    customer: {
        name: { type: String, required: [true, 'Customer name is required'] },
        email: { type: String, required: [true, 'Email is required'] },
        phone: { type: String, required: [true, 'Phone number is required'] },
        address: { type: String, default: '' },
        postcode: { type: String, default: '' }
    },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 2.99 },
    total: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled'],
        default: 'pending'
    },
    orderType: {
        type: String,
        enum: ['delivery', 'pickup'],
        default: 'delivery'
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'card'],
        default: 'cash'
    },
    notes: { type: String, default: '' }
}, {
    timestamps: true
});

orderSchema.pre('save', async function (next) {
    if (!this.orderNumber) {
        const count = await mongoose.model('Order').countDocuments();
        this.orderNumber = `EG-${String(count + 1001).padStart(5, '0')}`;
    }
    next();
});

module.exports = mongoose.model('Order', orderSchema);
