import { ObjectId } from 'mongodb';

export type TransactionStatus =
  | 'Available'
  | 'MutationInProgress'
  | 'TransferredUpdated'
  | 'Restricted';

export interface ILandParcel {
  _id?: ObjectId;
  mouza: string;
  dag: string;
  khatian: string;
  area_decimal: number;
  transaction_status: TransactionStatus;
  current_owner_id?: ObjectId;
  current_owner_name_bn: string;
  current_owner_name_en: string;
  district: string;
  upazila: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  land_class?: string;
  created_at?: Date;
  updated_at?: Date;
}
