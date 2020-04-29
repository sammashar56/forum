import mongoose from "mongoose";

const schema = mongoose.Schema;

const forumSchema = Schema(
    { 
        forum_comment: {
        type: String,
        required: true
        },
        views: {
            type: Number,
            required: false,
            default: 0
        },
        user: {
            type:Schema.Types.ObjectId,
            ref: "User"
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Forum", forumSchema);