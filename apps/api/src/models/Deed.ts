import mongoose, { Schema, Document } from 'mongoose';

export type DeedStatus = 'Draft' | 'UnderVerification' | 'Approved' | 'Rejected';

export interface IDeed extends Document {
  deed_number: string;
  type: string;
  dolil_lekhok_id: mongoose.Types.ObjectId;
  sub_registrar_id?: mongoose.Types.ObjectId;
  parcel_id: mongoose.Types.ObjectId;
  cs_rs_id?: mongoose.Types.ObjectId;
  status: DeedStatus;
  template_html: string;
  structured_data: {
    seller_name_bn?: string;
    seller_nid?: string;
    buyer_name_bn?: string;
    buyer_nid?: string;
    valuation_bdt?: number;
    registration_fee_bdt?: number;
    import_fee_bdt?: number;
    [key: string]: any;
  };
  fee_paid: boolean;
  rejection_reason?: string;
  corrections_required?: string;
  created_at: Date;
  updated_at: Date;
}

const DeedSchema = new Schema<IDeed>(
  {
    deed_number: { type: String, required: true, unique: true },
    type: { type: String, required: true, default: 'বিক্রয় কবলা' },
    dolil_lekhok_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sub_registrar_id: { type: Schema.Types.ObjectId, ref: 'User' },
    parcel_id: { type: Schema.Types.ObjectId, ref: 'LandParcel', required: true },
    cs_rs_id: { type: Schema.Types.ObjectId, ref: 'CSRSRecord' },
    status: {
      type: String,
      enum: ['Draft', 'UnderVerification', 'Approved', 'Rejected'],
      default: 'Draft',
      required: true,
    },
    template_html: { type: String, default: '' },
    structured_data: { type: Schema.Types.Mixed, default: {} },
    fee_paid: { type: Boolean, default: false },
    rejection_reason: { type: String },
    corrections_required: { type: String },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const Deed = mongoose.model<IDeed>('Deed', DeedSchema);
