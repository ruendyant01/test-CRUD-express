var express = require('express');
const ProductController = require("../controllers/ProductController");
const authorization = require("../middlewares/authorization");
var productRouter = express.Router();

productRouter.get("/active", ProductController.getAllActiveProduct)
productRouter.get("/",authorization, ProductController.getAllProduct)
productRouter.post("/", ProductController.createProduct)
productRouter.put("/{id}", ProductController.updateProduct)
productRouter.delete("/{id}", ProductController.deleteProduct)

module.exports = productRouter;
