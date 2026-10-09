import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../models/User.js';

export interface SimulatedUser {
  id: string;
  role: UserRole;
  name_bn: string;
  name_en: string;
  email: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: SimulatedUser;
    }
  }
}

const DEMO_USERS: Record<UserRole, SimulatedUser> = {
  citizen: {
    id: 'usr_citizen_001',
    role: 'citizen',
    name_bn: 'মো: রফিকুল ইসলাম',
    name_en: 'Md. Rafiqul Islam',
    email: 'citizen.demo@bhumilink.gov.bd',
  },
  'dolil-lekhok': {
    id: 'usr_lekhok_002',
    role: 'dolil-lekhok',
    name_bn: 'আব্দুস সাত্তার (সনদ নং-১২৮)',
    name_en: 'Abdus Sattar (License No: 128)',
    email: 'lekhok.demo@bhumilink.gov.bd',
  },
  'sub-registrar': {
    id: 'usr_sr_003',
    role: 'sub-registrar',
    name_bn: 'কাজী মাহমুদ হাসান',
    name_en: 'Kazi Mahmud Hasan',
    email: 'subregistrar.demo@bhumilink.gov.bd',
  },
  'mutation-officer': {
    id: 'usr_mo_004',
    role: 'mutation-officer',
    name_bn: 'তাহমিনা আক্তার (সহকারী কমিশনার - ভূমি)',
    name_en: 'Tahmina Akhter (AC Land)',
    email: 'acland.demo@bhumilink.gov.bd',
  },
  admin: {
    id: 'usr_admin_005',
    role: 'admin',
    name_bn: 'সিস্টেম অ্যাডমিনিস্ট্রেটর',
    name_en: 'System Administrator',
    email: 'admin@bhumilink.gov.bd',
  },
};

export function simulatedAuthMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const headerRole = (req.headers['x-role'] as string)?.toLowerCase() as UserRole;
  const activeRole: UserRole = DEMO_USERS[headerRole] ? headerRole : 'citizen';

  req.user = DEMO_USERS[activeRole];
  next();
}
