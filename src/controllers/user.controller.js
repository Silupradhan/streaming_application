import  {asyncHandeler} from '../utils/asyncHandeler.js';
import { ApiError } from '../utils/apiError.js';
import {User} from '../models/user.model.js';
import  uploadToCloudinary  from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/apiResponse.js';

const registerUser = asyncHandeler ( async (req, res) => {
    // get user data from request body or frontend
    // validation of user data
    // check if user already exists in database : use username or email to check if user already exists
    // check for images, check for avatar
    // upload image to cloudinary and get the image url
    // create user object - create entry in db
    // save user data to database
    // remove password and refresh token field from response
    // check for user creation
    // return response

    // step-1 : get user data from request body
    const { username, email, password, fullname} = req.body;
    console.log("username : " ,username)

    // step-2 : validation of user data
    if(!username || !email || !password || !fullname) {
        throw new ApiError(400, "All fields are required");
    }

    // step-3 : check if user already exists in database : use username or email to check if user already exists
    const userExists =  await User.findone({ $or: [{ username }, { email }] });  // this will check if user already exists in database by checking username or email

    if(userExists) {
        throw new ApiError(409, "User already exists with this username or email");
    }

    // step-4 : check for images, check for avatar
    // if(!req.files || !req.files.avatar) {
    //     throw new ApiError(400, "Avatar image is required");
    // }

    const avatarLocal = req.files?.avatar[0].path;  // this will get the path of the uploaded avatar image
    const coverImageLocal = req.files?.coverImage[0].path;  // this will get the path of the uploaded cover image

    if(!avatarLocal) {
        throw new ApiError(400, "Avatar image is required");
    }

    //step-5 : upload image to cloudinary and get the image url
    const avatarUrl = await uploadToCloudinary(avatarLocal);
    const coverImageUrl = await uploadToCloudinary(coverImageLocal);

    if(!avatarUrl) {
        throw new ApiError(400, "Failed to upload avatar image to cloudinary");
    }

    // step-6 : create user object
    const user = await User.create({
        username : username.toLowerCase(),
        email,
        password,
        fullname,
        avatar: avatarUrl.url,
        coverImage: coverImageUrl?.url || " "
    })

    // step-7 : save user data to database
    await user.save();

    // step-8 : remove password and refresh token field from response
    // user.password = undefined;
    // user.refreshToken = undefined;

    //another way to remove password and refresh token field from response is to use select method in mongoose query
    const userData = await User.findById(user._id).select("-password -refreshToken");

    // step-9 : check for user creation
    if(!userData) {
        throw new ApiError(500, "Failed to create user");
    }

    // step-10 : return response
    return res.status(201).json(new ApiResponse(201, userData, "User registered successfully"));

    res.status(200).json({
        message: "User registered successfully"
    })
})

export { registerUser }