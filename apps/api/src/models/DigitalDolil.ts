import { ObjectId } from 'mongodb';

export interface IDigitalDolil {
  _id?: ObjectId;
  deed_id: ObjectId;
  parcel_id: ObjectId;
  dolil_number: string;
  generated_at?: Date;
  document_url?: string;
}
