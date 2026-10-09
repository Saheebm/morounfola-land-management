import mongoose, { Schema, Document } from 'mongoose';

export interface IDeedDocument extends Document {
  deed_id: mongoose.Types.ObjectId;
  file_url: string;
  doc_type: string;
  created_at: Date;
}

const DeedDocumentSchema = new Schema<IDeedDocument>(
  {
    deed_id: { type: Schema.Types.ObjectId, ref: 'Deed', required: true },
    file_url: { type: String, required: true },
    doc_type: { type: String, required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } }
);

export const DeedDocument = mongoose.model<IDeedDocument>('DeedDocument', DeedDocumentSchema);
