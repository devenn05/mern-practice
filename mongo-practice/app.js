require('dotenv').config();
const mongoose = require('mongoose');

async function main(){
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database connected Successfully.")

        const userSchema = new mongoose.Schema({
            name: {type: String, required: true},
            email: {type: String, required: true, unique: true},
            age: {type: Number},
        });

        const User = mongoose.model('User', userSchema);

        // Add User
        const newUser = new User({
            name: 'Dev',
            email: 'dev05@gmail.com',
            age: 12
        })

        await newUser.save();

        // Read Data from the User db
        const allUsers = await User.find();
        console.log(allUsers);

        // Update user
        const updatedUser = await User.findOneAndUpdate(
            {email: 'dev05@gmail.com'}, // find a document with this filter
            {age: 13},
            {new: true}
        )

        // Delete a User
        await User.deleteOne({email: 'dev05@gmail.com'});

    } catch (error) {
        console.error("Connection failed", error.message);
    }
}

main();