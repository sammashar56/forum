import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tagsSchema = Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            text: true
        }
    },
    {
        autoIndex: true
    }
);

tagsSchema.index.index(
    {name: "text"},
    {
        weights: {
            name: 10
        }
    }
);

export default mongoose.model("tags", tagsSchema);