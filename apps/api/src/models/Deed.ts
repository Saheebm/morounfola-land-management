import { ObjectId } from 'mongodb';

export type DeedStatus = 'Draft' | 'UnderVerification' | 'Approved' | 'Rejected';

export interface IDeed {
  _id?: ObjectId;
  deed_number: string;
  type: string;
  dolil_lekhok_id: ObjectId;
  sub_registrar_id?: ObjectId;
  parcel_id: ObjectId;
  cs_rs_id?: ObjectId;
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
  created_at?: Date;
  updated_at?: Date;
}
