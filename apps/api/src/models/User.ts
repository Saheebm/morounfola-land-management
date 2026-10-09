import { ObjectId } from 'mongodb';

export type UserRole = 'citizen' | 'dolil-lekhok' | 'sub-registrar' | 'mutation-officer' | 'admin';

export interface IUser {
  _id?: ObjectId;
  name_bn: string;
  name_en: string;
  role: UserRole;
  active: boolean;
  email?: string;
  phone?: string;
  nid?: string;
  created_at?: Date;
}
