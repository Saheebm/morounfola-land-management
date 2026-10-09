import { ObjectId } from 'mongodb';

export interface IDeedDocument {
  _id?: ObjectId;
  deed_id: ObjectId;
  file_url: string;
  doc_type: string;
  created_at?: Date;
}
