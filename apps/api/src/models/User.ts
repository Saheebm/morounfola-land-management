import mongoose, { Schema, Document } from 'mongoose';

export type UserRole = 'citizen' | 'dolil-lekhok' | 'sub-registrar' | 'mutation-officer' | 'admin';

export interface IUser extends Document {
  name_bn: string;
  name_en: string;
  role: UserRole;
  active: boolean;
  email?: string;
  phone?: string;
  nid?: string;
  created_at: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name_bn: { type: String, required: true },
    name_en: { type: String, required: true },
    role: {
      type: String,
      enum: ['citizen', 'dolil-lekhok', 'sub-registrar', 'mutation-officer', 'admin'],
      required: true,
    },
    active: { type: Boolean, default: true },
    email: { type: String },
    phone: { type: String },
    nid: { type: String },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } }
);

export const User = mongoose.model<IUser>('User', UserSchema);
