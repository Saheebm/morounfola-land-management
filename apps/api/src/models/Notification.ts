import mongoose, { Schema, Document } from 'mongoose';

export type NotificationType = 'info' | 'warning' | 'success' | 'critical';

export interface INotification extends Document {
  user_id: mongoose.Types.ObjectId;
  type: NotificationType;
  title_bn: string;
  title_en: string;
  body_bn: string;
  body_en: string;
  read: boolean;
  action_url?: string;
  created_at: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['info', 'warning', 'success', 'critical'],
      default: 'info',
    },
    title_bn: { type: String, required: true },
    title_en: { type: String, required: true },
    body_bn: { type: String, required: true },
    body_en: { type: String, required: true },
    read: { type: Boolean, default: false },
    action_url: { type: String },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } }
);

export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
