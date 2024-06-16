const bcrypt = require('bcryptjs');
const { createUser, getUserByUsername } = require('../models/userModel');

const createUserAccount = async (req, res) => {
    try {
    const { username, password, role } = req.body;

    const user = await getUserByUsername(username);
    console.log("USER ::: ", user);
    if (user) return res.status(400).json({ message: 'User already exist' });
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        username,
        password: hashedPassword,
        role
    };

    await createUser(newUser);
    res.status(201).json({ message: 'User created successfully' });
} catch (error) {
    res.status(400).json({ message: 'Issue in creating user' });
}
};

module.exports = {
    createUserAccount
};
