import mongoose, { Schema, Document } from 'mongoose';

export interface IRSBSUpdate extends Document {
  mutation_id: mongoose.Types.ObjectId;
  parcel_id: mongoose.Types.ObjectId;
  old_owner_id?: mongoose.Types.ObjectId;
  new_owner_id: mongoose.Types.ObjectId;
  khatian_number?: string;
  updated_at: Date;
}

const RSBSUpdateSchema = new Schema<IRSBSUpdate>(
  {
    mutation_id: { type: Schema.Types.ObjectId, ref: 'Mutation', required: true },
    parcel_id: { type: Schema.Types.ObjectId, ref: 'LandParcel', required: true },
    old_owner_id: { type: Schema.Types.ObjectId, ref: 'User' },
    new_owner_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    khatian_number: { type: String },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

export const RSBSUpdate = mongoose.model<IRSBSUpdate>('RSBSUpdate', RSBSUpdateSchema);
