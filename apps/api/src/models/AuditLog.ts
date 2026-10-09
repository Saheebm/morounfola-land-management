import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  actor_id?: mongoose.Types.ObjectId;
  actor_role?: string;
  entity_type: string;
  entity_id: string;
  action: string;
  old_val?: any;
  new_val?: any;
  timestamp: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    actor_id: { type: Schema.Types.ObjectId, ref: 'User' },
    actor_role: { type: String },
    entity_type: { type: String, required: true },
    entity_id: { type: String, required: true },
    action: { type: String, required: true },
    old_val: { type: Schema.Types.Mixed },
    new_val: { type: Schema.Types.Mixed },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

export const AuditLog = mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
