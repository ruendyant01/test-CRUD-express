const {Op} = require('sequelize');
const {response} =  require('../responses/response');
const {Product} =  require('../models/Product');

class ProductController {
    static createProduct = async (req, res, next) => {
        const {name, description} = req.body;

        try {
            const product = await Product.create({name, description});
            res.status(201).json(response(201, 'Success Created', product));
        } catch (error) {
            res.status(400).json(response(400, 'Bad Request', error.message))
        }
    }

    static deleteProduct = async (req, res, next) => {
        const {id} = req.params;
        try {
            const product = await Product.update({is_active: false}, {where: {id}})
            res.status(200).json(response(200, 'Success Deleted', product))
        } catch (error) {
            res.status(500).json(response(500, 'Internal Server Error', error.message))
        }
    }

    static updateProduct = async (req, res, next) => {
        const {id} = req.params;
        const {name, description} = req.body;
        try {
            const product = await Product.update({name, description}, {where: {id}})
            res.status(200).json(response(200, 'Success Updated', product))
        } catch (error) {
            res.status(500).json(response(500, 'Internal Server Error', error.message))
        }
    }

    static getAllActiveProduct = async (req, res, next) => {
        let offset, limit;
        const {skip, take, search} = req.query;
        const filter = {where: {is_active: true}}

        if (skip && take) {
            offset = skip * take;
            limit = take;
            filter.offset = offset;
            filter.limit = limit;
        } else if(skip) {
            filter.offset = skip;
        } else if(take) {
            filter.limit = take;
        }
        if(search) filter.where.name = {[Op.iLike]: `%${search}%`}

        try {
            const product = await Product.findAll(filter)
            res.status(200).json(response(200, 'Success Get All', product))
        } catch (error) {
            res.status(500).json(response(500, 'Internal Server Error', error.message))
        }
    }

    static getAllProduct = async (req, res, next) => {
        try {
            const product = await Product.findAll();
            res.status(200).json(response(200, 'Success Get All', product))
        } catch (error) {
            res.status(500).json(response(500, 'Internal Server Error', error.message))
        }
    }
}

module.exports = ProductController;