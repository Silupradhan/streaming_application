import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new mongoose.Schema({
   videoFile : {
    type : String,  //cloudinary url
    required : true,
   },
   thumbnail : {
    type : String,  //cloudinary url
    required : true,
    },
    title : {
        type : String,
        required : true,
        trim : true,
    },
    description : {
        type : String,
        required : true,
        trim : true,
    },
    duration : {
        type : Number,
        required : true,
    },
    views : {
        type : Number,
        default : 0
    },
    isPublished : {
        type : Boolean,
        default : true
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }


},{timestamps : true});

// before export the videoSchema, we need to add the mongoose-aggregate-paginate plugin to it so that we can use the aggregate pagination feature in our video model. This will allow us to paginate the results of our video queries using the aggregate framework of MongoDB.
videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model('Video', videoSchema);