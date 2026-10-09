import mongoose, { Schema, Document } from 'mongoose';

export type PaymentType = 'LandTax' | 'CSRSRecord' | 'CSRSImport' | 'DeedFee' | 'MutationFee';
export type PaymentStatus = 'Success' | 'Failed' | 'Pending';

export interface IPayment extends Document {
  type: PaymentType;
  amount: number;
  payer_id?: mongoose.Types.ObjectId;
  reference_id: string;
  status: PaymentStatus;
  transaction_id?: string;
  payment_method?: string;
  paid_at?: Date;
  created_at: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    type: {
      type: String,
      enum: ['LandTax', 'CSRSRecord', 'CSRSImport', 'DeedFee', 'MutationFee'],
      required: true,
    },
    amount: { type: Number, required: true },
    payer_id: { type: Schema.Types.ObjectId, ref: 'User' },
    reference_id: { type: String, required: true },
    status: {
      type: String,
      enum: ['Success', 'Failed', 'Pending'],
      default: 'Pending',
      required: true,
    },
    transaction_id: { type: String },
    payment_method: { type: String, default: 'Mock Gateway' },
    paid_at: { type: Date },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } }
);

export const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);
