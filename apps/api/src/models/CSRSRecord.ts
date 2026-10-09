import { ObjectId } from 'mongodb';

export type RecordType = 'CS' | 'RS';

export interface ICSRSRecord {
  _id?: ObjectId;
  parcel_id: ObjectId;
  record_type: RecordType;
  data: Record<string, any>;
  document_url?: string;
  verified: boolean;
  created_at?: Date;
}
