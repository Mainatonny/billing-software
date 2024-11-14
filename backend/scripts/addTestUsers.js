const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const addTestUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedtopology: true
        });

        const testUsers = [
            { username: 'testuser1', password: 'password123' },
            { username: 'testUser2', password: 'password456' },
        ];

        for (const user of testUsers) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const newUser = new User({
                ...user,
                password: hashedPassword,
                role: 'customer',
                status: 'active'
            });
            await newUser.save();
            console.log(`User ${user.username} added`);
        }
    } catch (error) {
        console.error(`Error adding test users:`, error.message);
    } finally {
        mongoose.connection.close();
    }
};

addTestUsers();