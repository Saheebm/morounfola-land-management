import { ObjectId } from 'mongodb';

export type NotificationType = 'info' | 'warning' | 'success' | 'critical';

export interface INotification {
  _id?: ObjectId;
  user_id: ObjectId;
  type: NotificationType;
  title_bn: string;
  title_en: string;
  body_bn: string;
  body_en: string;
  read: boolean;
  action_url?: string;
  created_at?: Date;
}
