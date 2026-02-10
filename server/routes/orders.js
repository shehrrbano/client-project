const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

// POST /api/orders — place a new order (public)
router.post('/', async (req, res) => {
    try {
        const { customer, items, subtotal, deliveryFee, total, orderType, paymentMethod, notes } = req.body;

        if (!customer || !items || items.length === 0) {
            return res.status(400).json({ message: 'Customer info and at least one item are required' });
        }

        const order = await Order.create({
            customer,
            items,
            subtotal,
            deliveryFee: orderType === 'pickup' ? 0 : (deliveryFee || 2.99),
            total,
            orderType: orderType || 'delivery',
            paymentMethod: paymentMethod || 'cash',
            notes: notes || ''
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET /api/orders — list all orders (admin)
router.get('/', protect, async (req, res) => {
    try {
        const filter = {};
        if (req.query.status) filter.status = req.query.status;

        const orders = await Order.find(filter)
            .sort({ createdAt: -1 })
            .limit(parseInt(req.query.limit) || 100);

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/orders/stats — dashboard stats (admin)
router.get('/stats', protect, async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const pendingOrders = await Order.countDocuments({ status: { $in: ['pending', 'confirmed', 'preparing'] } });
        const completedOrders = await Order.countDocuments({ status: 'delivered' });

        const revenueResult = await Order.aggregate([
            { $match: { status: { $ne: 'cancelled' } } },
            { $group: { _id: null, total: { $sum: '$total' } } }
        ]);
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayOrders = await Order.countDocuments({ createdAt: { $gte: todayStart } });

        res.json({ totalOrders, pendingOrders, completedOrders, totalRevenue, todayOrders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/orders/:id — single order (public, for tracking)
router.get('/:id', async (req, res) => {
    try {
        let order;
        // Try finding by orderNumber first, then by _id
        if (req.params.id.startsWith('EG-')) {
            order = await Order.findOne({ orderNumber: req.params.id });
        } else {
            order = await Order.findById(req.params.id);
        }
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/orders/:id — update status (admin)
router.put('/:id', protect, async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
