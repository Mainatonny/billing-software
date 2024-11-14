const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Plan = require('../models/Plans');
require('dotenv').config();

const initializeDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        const adminExists = await User.findOne({ role: 'admin' });
        if (!adminExists) {
            const adminUser = new User({
                username: 'wifi_admin',
                password: await bcrypt.hash('securePassword123', 10),
                role:'dbAdmin',
                status: 'active'
                
            });
            await adminUser.save();
            console.log('Admin user created');
        } else {
            console.log('Admin user already exists');
        }

        const plansExist = await Plan.find({});
        if (plansExist.length === 0) {
            const plans = [
                { name: 'Basic Plan', dataLimit: '5GB', price: 20, duration: '1 Day' },
                { name: 'Giga Plan', dataLimit: '10GB', price: 50, duration: '1 Day' },
                { name: 'Viva Plan', dataLimit: '20GB', price: 100, duration: '1 Week' }
            ];
            await Plan.insertMany(plans);
            console.log('Default plans created');

        } else {
            console.log('Plans already exist');
        }

        mongoose.connection.close();

    } catch (error) {
        console.error('Error initializing database:', error.message);
        mongoose.connection.close();
    }
};
initializeDatabase();