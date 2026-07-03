import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) throw new Error("No file path provided for upload.");
        // upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto", // this will automatically detect the file type (image, video, etc.)
        })
        //file upload sucessfully 
        console.log("File uploaded to Cloudinary:");
        console.log(result.url);
        return result

    }
    catch (err) {
       fs.unlinkSync(localFilePath); // delete the local file if upload fails
       return null
    }
}

export default uploadToCloudinary