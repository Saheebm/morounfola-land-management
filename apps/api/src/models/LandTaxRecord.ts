import mongoose, { Schema, Document } from 'mongoose';

export interface ILandTaxRecord extends Document {
  parcel_id: mongoose.Types.ObjectId;
  fiscal_year: string;
  amount: number;
  payer_id?: mongoose.Types.ObjectId;
  payment_id?: mongoose.Types.ObjectId;
  dakhila_number: string;
  dakhila_url?: string;
  issued_at: Date;
}

const LandTaxRecordSchema = new Schema<ILandTaxRecord>(
  {
    parcel_id: { type: Schema.Types.ObjectId, ref: 'LandParcel', required: true },
    fiscal_year: { type: String, default: '২০২৫-২০২৬' },
    amount: { type: Number, required: true },
    payer_id: { type: Schema.Types.ObjectId, ref: 'User' },
    payment_id: { type: Schema.Types.ObjectId, ref: 'Payment' },
    dakhila_number: { type: String, required: true, unique: true },
    dakhila_url: { type: String },
    issued_at: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

export const LandTaxRecord = mongoose.model<ILandTaxRecord>('LandTaxRecord', LandTaxRecordSchema);
