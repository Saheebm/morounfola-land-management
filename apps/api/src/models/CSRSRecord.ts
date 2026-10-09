import mongoose, { Schema, Document } from 'mongoose';

export type RecordType = 'CS' | 'RS';

export interface ICSRSRecord extends Document {
  parcel_id: mongoose.Types.ObjectId;
  record_type: RecordType;
  data: Record<string, any>;
  document_url?: string;
  verified: boolean;
  created_at: Date;
}

const CSRSRecordSchema = new Schema<ICSRSRecord>(
  {
    parcel_id: { type: Schema.Types.ObjectId, ref: 'LandParcel', required: true },
    record_type: { type: String, enum: ['CS', 'RS'], required: true },
    data: { type: Schema.Types.Mixed, default: {} },
    document_url: { type: String },
    verified: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } }
);

export const CSRSRecord = mongoose.model<ICSRSRecord>('CSRSRecord', CSRSRecordSchema);
