import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    userName: { type: String, required: true },
    userImage: { type: String },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
const moviesSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  titleImage: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  time: {
    type: Number,
    require: true,
  },
  video: {
    type: String,
  },
  rate: {
    type: Number,
    require: true,
    default: 0,
  },
  numberOfRevies: {
    type: Number,
    required: true,
    default: 0,
  },
  reviews: [reviewSchema],
  casts: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
    },
  ],
});

export default mongoose.model('Movies', moviesSchema);
