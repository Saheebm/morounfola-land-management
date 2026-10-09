import mongoose, { Schema, Document } from 'mongoose';

export interface IDigitalDolil extends Document {
  deed_id: mongoose.Types.ObjectId;
  parcel_id: mongoose.Types.ObjectId;
  dolil_number: string;
  generated_at: Date;
  document_url: string;
}

const DigitalDolilSchema = new Schema<IDigitalDolil>(
  {
    deed_id: { type: Schema.Types.ObjectId, ref: 'Deed', required: true },
    parcel_id: { type: Schema.Types.ObjectId, ref: 'LandParcel', required: true },
    dolil_number: { type: String, required: true, unique: true },
    generated_at: { type: Date, default: Date.now },
    document_url: { type: String, default: '' },
  },
  { timestamps: false }
);

export const DigitalDolil = mongoose.model<IDigitalDolil>('DigitalDolil', DigitalDolilSchema);
