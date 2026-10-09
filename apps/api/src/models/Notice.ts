import { ObjectId } from 'mongodb';

export interface INotice {
  _id?: ObjectId;
  title_bn: string;
  title_en: string;
  body_bn: string;
  body_en: string;
  created_by?: ObjectId;
  category?: string;
  published_at?: Date;
}
