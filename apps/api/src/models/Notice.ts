import mongoose, { Schema, Document } from 'mongoose';

export interface INotice extends Document {
  title_bn: string;
  title_en: string;
  body_bn: string;
  body_en: string;
  created_by?: mongoose.Types.ObjectId;
  category?: string;
  published_at: Date;
}

const NoticeSchema = new Schema<INotice>(
  {
    title_bn: { type: String, required: true },
    title_en: { type: String, required: true },
    body_bn: { type: String, required: true },
    body_en: { type: String, required: true },
    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    category: { type: String, default: 'সাধারণ বিজ্ঞপ্তি' },
    published_at: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

export const Notice = mongoose.model<INotice>('Notice', NoticeSchema);
