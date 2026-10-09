import { ObjectId } from 'mongodb';

export type MutationStatus = 'Pending' | 'InReview' | 'Approved' | 'Rejected';

export interface IMutation {
  _id?: ObjectId;
  case_number: string;
  dolil_id?: ObjectId;
  parcel_id: ObjectId;
  applicant_id?: ObjectId;
  mutation_officer_id?: ObjectId;
  status: MutationStatus;
  fee_paid: boolean;
  rejection_reason?: string;
  corrections_required?: string;
  created_at?: Date;
  updated_at?: Date;
}
