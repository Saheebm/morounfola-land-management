import mongoose, { Schema, Document } from 'mongoose';

export type MutationStatus = 'Pending' | 'InReview' | 'Approved' | 'Rejected';

export interface IMutation extends Document {
  case_number: string;
  dolil_id?: mongoose.Types.ObjectId;
  parcel_id: mongoose.Types.ObjectId;
  applicant_id?: mongoose.Types.ObjectId;
  mutation_officer_id?: mongoose.Types.ObjectId;
  status: MutationStatus;
  fee_paid: boolean;
  rejection_reason?: string;
  corrections_required?: string;
  created_at: Date;
  updated_at: Date;
}

const MutationSchema = new Schema<IMutation>(
  {
    case_number: { type: String, required: true, unique: true },
    dolil_id: { type: Schema.Types.ObjectId, ref: 'DigitalDolil' },
    parcel_id: { type: Schema.Types.ObjectId, ref: 'LandParcel', required: true },
    applicant_id: { type: Schema.Types.ObjectId, ref: 'User' },
    mutation_officer_id: { type: Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['Pending', 'InReview', 'Approved', 'Rejected'],
      default: 'Pending',
      required: true,
    },
    fee_paid: { type: Boolean, default: false },
    rejection_reason: { type: String },
    corrections_required: { type: String },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const Mutation = mongoose.model<IMutation>('Mutation', MutationSchema);
