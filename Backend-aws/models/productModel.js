const dynamoDB = require('../config/db');

const TABLE_NAME = 'Products';

const createProduct = async (product) => {
    const params = {
        TableName: TABLE_NAME,
        Item: product
    };
    await dynamoDB.put(params).promise();
};

const getProductBySKU = async (sku) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { sku }
    };
    const result = await dynamoDB.get(params).promise();
    return result.Item;
};

const getAllProducts = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    const result = await dynamoDB.scan(params).promise();
    return result.Items;
};

const updateProduct = async (sku, updates) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { sku },
        UpdateExpression: 'set #name = :name, description = :description, category = :category, logo = :logo',
        ExpressionAttributeNames: {
            '#name': 'name'
        },
        ExpressionAttributeValues: {
            ':name': updates.name,
            ':description': updates.description,
            ':category': updates.category,
            ':logo': updates.logo
        }
    };
    await dynamoDB.update(params).promise();
};

const deleteProduct = async (sku) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { sku }
    };
    await dynamoDB.delete(params).promise();
};

module.exports = {
    createProduct,
    getProductBySKU,
    getAllProducts,
    updateProduct,
    deleteProduct
};
