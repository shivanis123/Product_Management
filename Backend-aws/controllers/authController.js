const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByUsername } = require('../models/userModel');

const login = async (req, res) => {
    console.log("STARTED");
    const { username, password } = req.body;
console.log("USERNAME :: ", username);
    const user = await getUserByUsername(username);
    console.log("user:: ", user);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
};

module.exports = {
    login
};
