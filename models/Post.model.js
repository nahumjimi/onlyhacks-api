const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: [true, 'Content of the post is required']
    },
    img: {
      type: String,
      required: [true, 'Image is required']
    }
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret._id;

        return ret
      }
    }
  }
)

const Post = mongoose.model('Post', PostSchema)

module.exports = Post