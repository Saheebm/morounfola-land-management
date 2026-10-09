import { ObjectId } from 'mongodb';

export interface IAuditLog {
  _id?: ObjectId;
  actor_id?: ObjectId;
  actor_role?: string;
  entity_type: string;
  entity_id: string;
  action: string;
  old_val?: any;
  new_val?: any;
  timestamp?: Date;
}
