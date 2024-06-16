const { createProduct, getProductBySKU, getAllProducts, updateProduct, deleteProduct } = require('../models/productModel');

const addProduct = async (req, res) => {
    try {

        const { name, sku, description, category, logo, assignedUsers } = req.body;

        const existingProduct = await getProductBySKU(sku);
        if (existingProduct) return res.status(400).json({ message: 'Product with this SKU already exists' });
        console.log("req.user.id ::: ", req.user.id);
        const newProduct = {
            name,
            sku,
            description,
            category,
            logo,
            source: req.user.role === 'admin' ? 'ADMIN' : 'USER',
            assignedUsers: req.user.role === 'admin' ? assignedUsers : [req.user.username]
        };

        await createProduct(newProduct);
        res.status(201).json({ message: 'Product created successfully' });

    } catch (error) {
        console.log("ERROR :: ", error);
    }
};

const getProducts = async (req, res) => {
    const { search, category, source } = req.query;
    let products = await getAllProducts();

    if (req.user.role !== 'admin') {
        products = products.filter(product => product.assignedUsers.includes(req.user.id));
    }

    if (search) {
        products = products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.sku.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (category) {
        products = products.filter(product => product.category === category);
    }

    if (source) {
        products = products.filter(product => product.source === source);
    }

    res.json(products);
};

const editProduct = async (req, res) => {
    const { sku } = req.params;
    const updates = req.body;

    await updateProduct(sku, updates);
    res.json({ message: 'Product updated successfully' });
};

const removeProduct = async (req, res) => {
    const { sku } = req.params;

    await deleteProduct(sku);
    res.json({ message: 'Product deleted successfully' });
};

module.exports = {
    addProduct,
    getProducts,
    editProduct,
    removeProduct
};
