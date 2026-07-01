import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true   //create an index for serching a user
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,  //cloudinary url
        required: true,
    },
    coverImg: {
        type: String,  //cloudinary url
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: true,
        trim: true,
    },
    refreshToken: {
        type: String
    }

}, { timestamps: true });


// before export the userSchema, we need to add a pre-save hook to hash the password before saving it to the database. This will ensure that the password is stored securely in the database and cannot be easily accessed by unauthorized users.
userSchema.pre("save", async function (next) {
    //problem is that if the user is updating their profile then it will run tis code and hass the password again so i can write the if block
    // if the password is not modified, we don't need to hash it again. So we can just call next() to move on to the next middleware.
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next()
})

// this will be check the password entered by the user during login with the hashed password stored in the database. If the passwords match, it will return true, otherwise it will return false.
// this is the user defind middleware use methods to define a method on the userSchema that can be called on an instance of the User model. In this case, we are defining a method called isPasswordMatched that takes an enteredPassword as an argument and compares it with the hashed password stored in the database using bcrypt.compare(). This method will return true if the passwords match, otherwise it will return false.
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwtsign({
        _id: this._id,
        email: this.email,
        fullName: this.fullname,
        username: this.username,
    }, process.env.ACESS_TOKEN_SECRET, {
        expiresIn: process.env.ACESS_TOKEN_EXPIRE
    })
}


userSchema.methods.generateRefreshToken = function () {
    return jwtsign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE
    })
}


export const User = mongoose.model('User', userSchema);