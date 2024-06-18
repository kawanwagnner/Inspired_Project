import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Exportando o modelo Post
export default mongoose.model("Post", postSchema);
