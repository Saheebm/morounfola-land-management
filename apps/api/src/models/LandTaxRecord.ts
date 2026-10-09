import { ObjectId } from 'mongodb';

export interface ILandTaxRecord {
  _id?: ObjectId;
  parcel_id: ObjectId;
  fiscal_year: string;
  amount: number;
  payer_id?: ObjectId;
  payment_id?: ObjectId;
  dakhila_number: string;
  dakhila_url?: string;
  issued_at?: Date;
}
