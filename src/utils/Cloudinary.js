import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto", // this will automatically detect the file type (image, video, etc.)
        })
        //file upload sucessfully 
        // console.log("File uploaded to Cloudinary:");
        // console.log(result.url);
        fs.unlinkSync(localFilePath); // delete the local file after successful upload  
        return result

    }
    catch (err) {
       console.error("Cloudinary upload error:", err.message);
       if (localFilePath && fs.existsSync(localFilePath)) {
           fs.unlinkSync(localFilePath);
       }
       return null
    }
}

export default uploadToCloudinary
