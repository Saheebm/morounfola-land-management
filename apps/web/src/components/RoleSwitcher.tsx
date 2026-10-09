import { UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAppStore, type UserRole } from '../store/useAppStore';

const rolesList: { role: UserRole; nameBn: string; nameEn: string }[] = [
  { role: 'citizen', nameBn: 'নাগরিক', nameEn: 'Citizen' },
  { role: 'dolil-lekhok', nameBn: 'দলিল লেখক', nameEn: 'Dolil Lekhok' },
  { role: 'sub-registrar', nameBn: 'সাব-রেজিস্ট্রার', nameEn: 'Sub-Registrar' },
  { role: 'mutation-officer', nameBn: 'সহকারী কমিশনার (ভূমি)', nameEn: 'Mutation Officer' },
  { role: 'admin', nameBn: 'সিস্টেম প্রশাসক', nameEn: 'Admin' },
];

export function RoleSwitcher({ className = '' }: { className?: string }) {
  const activeRole = useAppStore((state) => state.activeRole);
  const setActiveRole = useAppStore((state) => state.setActiveRole);
  const navigate = useNavigate();

  const handleRoleChange = (newRole: UserRole) => {
    setActiveRole(newRole);
    if (newRole === 'citizen') {
      navigate('/');
    } else {
      navigate(`/staff/${newRole}`);
    }
  };

  return (
    <div className={`flex items-center gap-1.5 bg-brand-50/80 border border-brand-200 rounded-lg px-2.5 py-1 text-[13px] ${className}`}>
      <UserCheck size={15} className="text-brand-600 shrink-0" aria-hidden="true" />
      <label htmlFor="role-select" className="text-brand-800 font-semibold sr-only md:not-sr-only">
        রোল পরিবর্তন:
      </label>
      <select
        id="role-select"
        value={activeRole}
        onChange={(e) => handleRoleChange(e.target.value as UserRole)}
        className="bg-transparent font-semibold text-brand-900 border-none outline-none cursor-pointer text-[13px] py-0.5 pr-1 focus:ring-0"
      >
        {rolesList.map((r) => (
          <option key={r.role} value={r.role} className="bg-white text-ink">
            {r.nameBn} ({r.nameEn})
          </option>
        ))}
      </select>
    </div>
  );
}
