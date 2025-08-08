import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  bio?: string;
  image?: string;
  createdAt: Date;
  role: string;
  comparePassword: (password: string) => Promise<boolean>
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 30,
      select: false,
    },
    phone: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
      maxlength: 255,
    },
    image: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    }
  },
  {
    timestamps: true,
  },
);

userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);
export default User;
