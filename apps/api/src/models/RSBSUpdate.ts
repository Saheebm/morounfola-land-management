import { ObjectId } from 'mongodb';

export interface IRSBSUpdate {
  _id?: ObjectId;
  mutation_id: ObjectId;
  parcel_id: ObjectId;
  old_owner_id?: ObjectId;
  new_owner_id: ObjectId;
  khatian_number?: string;
  updated_at?: Date;
}
