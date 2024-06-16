const dynamoDB = require('../config/db');

const TABLE_NAME = 'Users';

const createUser = async (user) => {
    const params = {
        TableName: TABLE_NAME,
        Item: user
    };
    await dynamoDB.put(params).promise();
};

const getUserByUsername = async (username) => {
    try {
    const params = {
        TableName: TABLE_NAME,
        Key: { username }
    };
    const result = await dynamoDB.get(params).promise();
    console.log("result ::::::::::::::::: ", result);
    return result.Item;
} catch (error) {
        console.log("ERROR :: ", error);
}
};

module.exports = {
    createUser,
    getUserByUsername
};
