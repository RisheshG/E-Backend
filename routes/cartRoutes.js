const express = require('express');
const router = express.Router();
const Cart = require('../models/CartItem'); // Import the Cart model

// Get cart items for a specific user
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const cartItems = await Cart.find({ user: userId })
            .populate('product'); // Populate product details
        res.json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error); // More detailed log
        res.status(500).json({ message: 'Error fetching cart items', error: error.message });
    }
});

// POST request to add an item to the cart
router.post('/', async (req, res) => {
    const { productId, userId, quantity } = req.body;

    try {
        // Check if the item is already in the cart
        const existingCartItem = await Cart.findOne({ product: productId, user: userId });

        if (existingCartItem) {
            // If it exists, update the quantity
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            return res.status(200).json({ message: 'Cart item quantity updated successfully' });
        } else {
            // If it doesn't exist, create a new cart item
            const newCartItem = new Cart({
                product: productId,
                user: userId,
                quantity
            });
            await newCartItem.save();
            return res.status(201).json({ message: 'Item added to cart successfully' });
        }
    } catch (error) {
        console.error('Error adding item to cart:', error); // More detailed log
        res.status(500).json({ message: 'Error adding item to cart', error: error.message });
    }
});

// POST request to update the quantity of a cart item
router.post('/update', async (req, res) => {
    const { userId, itemId, quantity } = req.body;

    try {
        const cartItem = await Cart.findById(itemId);
        if (!cartItem || cartItem.user.toString() !== userId) {
            return res.status(404).json({ message: 'Cart item not found or does not belong to the user' });
        }

        // Update quantity
        cartItem.quantity = quantity;
        await cartItem.save();
        res.status(200).json({ message: 'Cart item updated successfully' });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: 'Error updating cart item', error: error.message });
    }
});

// DELETE request to remove an item from the cart
router.delete('/:userId/:itemId', async (req, res) => {
    const { userId, itemId } = req.params;

    try {
        const cartItem = await Cart.findById(itemId);
        if (!cartItem || cartItem.user.toString() !== userId) {
            return res.status(404).json({ message: 'Cart item not found or does not belong to the user' });
        }

        // Use deleteOne instead of remove
        await Cart.deleteOne({ _id: itemId });
        res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ message: 'Error deleting cart item', error: error.message });
    }
});

module.exports = router;
