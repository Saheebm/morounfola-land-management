import mongoose, { Schema, Document } from 'mongoose';

export type TransactionStatus =
  | 'Available'
  | 'MutationInProgress'
  | 'TransferredUpdated'
  | 'Restricted';

export interface ILandParcel extends Document {
  mouza: string;
  dag: string;
  khatian: string;
  area_decimal: number;
  transaction_status: TransactionStatus;
  current_owner_id?: mongoose.Types.ObjectId;
  current_owner_name_bn: string;
  current_owner_name_en: string;
  district: string;
  upazila: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  land_class?: string;
  created_at: Date;
  updated_at: Date;
}

const LandParcelSchema = new Schema<ILandParcel>(
  {
    mouza: { type: String, required: true },
    dag: { type: String, required: true },
    khatian: { type: String, required: true },
    area_decimal: { type: Number, required: true },
    transaction_status: {
      type: String,
      enum: ['Available', 'MutationInProgress', 'TransferredUpdated', 'Restricted'],
      default: 'Available',
      required: true,
    },
    current_owner_id: { type: Schema.Types.ObjectId, ref: 'User' },
    current_owner_name_bn: { type: String, required: true },
    current_owner_name_en: { type: String, required: true },
    district: { type: String, default: 'ঢাকা' },
    upazila: { type: String, default: 'সাভার' },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    land_class: { type: String, default: 'নাল' },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const LandParcel = mongoose.model<ILandParcel>('LandParcel', LandParcelSchema);
