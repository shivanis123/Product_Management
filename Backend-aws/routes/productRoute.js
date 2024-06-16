const express = require('express');
const router = express.Router();
const { addProduct, getProducts, editProduct, removeProduct } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware, addProduct);
router.get('/', authMiddleware, getProducts);
router.put('/:sku', authMiddleware, roleMiddleware(['admin']), editProduct);
router.delete('/:sku', authMiddleware, roleMiddleware(['admin']), removeProduct);

module.exports = router;
