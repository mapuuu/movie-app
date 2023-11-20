import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide a full name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide a gmail address'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password '],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    image: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    likedMovies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movies',
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
