import { ObjectId } from 'mongodb';

export type PaymentType = 'LandTax' | 'CSRSRecord' | 'CSRSImport' | 'DeedFee' | 'MutationFee';
export type PaymentStatus = 'Success' | 'Failed' | 'Pending';

export interface IPayment {
  _id?: ObjectId;
  type: PaymentType;
  amount: number;
  payer_id?: ObjectId;
  reference_id: string;
  status: PaymentStatus;
  transaction_id?: string;
  payment_method?: string;
  paid_at?: Date;
  created_at?: Date;
}
