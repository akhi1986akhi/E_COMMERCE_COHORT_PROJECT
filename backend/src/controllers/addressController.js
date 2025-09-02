const Address = require('../models/Address');
const User = require('../models/User');
const mongoose = require('mongoose');

// @desc    Get all addresses for a user
// @route   GET /api/addresses
// @access  Private
const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: addresses.length,
            data: addresses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Get single address
// @route   GET /api/addresses/:id
// @access  Private
const getAddress = async (req, res) => {
    try {
        const address = await Address.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        res.status(200).json({
            success: true,
            data: address
        });
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({
                success: false,
                message: 'Invalid address ID'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Create new address
// @route   POST /api/addresses
// @access  Private
const createAddress = async (req, res) => {
    try {
        // Add user to req.body
        req.body.user = req.user.id;

        const address = await Address.create(req.body);
        // Push address ID to user's addresses array
        await User.findByIdAndUpdate(
            req.user.id,
            { $push: { addresses: address._id } },
            { new: true, runValidators: true }
        );

        res.status(201).json({
            success: true,
            data: address
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: messages
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Update address
// @route   PUT /api/addresses/:id
// @access  Private
const updateAddress = async (req, res) => {
    try {
        let address = await Address.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        // Remove user from req.body to prevent changing the owner
        delete req.body.user;

        address = await Address.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            data: address
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: messages
            });
        }
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({
                success: false,
                message: 'Invalid address ID'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Delete address
// @route   DELETE /api/addresses/:id
// @access  Private
const deleteAddress = async (req, res) => {
    try {
        const address = await Address.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        await Address.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Address deleted successfully',
            data: {}
        });
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({
                success: false,
                message: 'Invalid address ID'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Set default address
// @route   PATCH /api/addresses/:id/set-default
// @access  Private
const setDefaultAddress = async (req, res) => {
    try {
        const address = await Address.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        // Set this address as default and others as non-default
        address.isDefault = true;
        await address.save();

        res.status(200).json({
            success: true,
            message: 'Address set as default successfully',
            data: address
        });
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({
                success: false,
                message: 'Invalid address ID'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Get default address
// @route   GET /api/addresses/default
// @access  Private
const getDefaultAddress = async (req, res) => {
    try {
        const address = await Address.findOne({
            user: req.user.id,
            isDefault: true
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'No default address found'
            });
        }

        res.status(200).json({
            success: true,
            data: address
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

module.exports = {
    getAddresses,
    getAddress,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    getDefaultAddress
};