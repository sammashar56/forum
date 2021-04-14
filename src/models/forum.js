import mongoose from "mongoose";

const Schema = mongoose.Schema;

const forumSchema = Schema(
    { 
        forum_comment: {
        type: String,
        required: true
        },
        user: {
            type:Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        views: {
            type: Number,
            required: false,
            default: 0
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Forum", forumSchema);
