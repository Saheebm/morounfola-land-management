import { useState } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router';
import {
  FileText,
  FileCheck,
  ClipboardCheck,
  Users,
  Bell,
  Globe,
  Menu,
  X,
  Landmark,
  ShieldAlert,
  ArrowLeft,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/useAppStore';
import { RoleSwitcher } from '../components/RoleSwitcher';
import { ToastContainer } from '../components/Toast';

export function StaffLayout() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const activeRole = useAppStore((state) => state.activeRole);
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const unreadCount = useAppStore((state) => state.unreadNotificationsCount);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleLanguage = () => {
    const nextLang = language === 'bn' ? 'en' : 'bn';
    setLanguage(nextLang);
    i18n.changeLanguage(nextLang);
  };

  // Sidebar navigation sections based on current staff role
  const staffNavMap = {
    'dolil-lekhok': [
      {
        sectionBn: 'দলিল লেখক কনসোল',
        sectionEn: 'Dolil Lekhok Console',
        items: [
          { to: '/staff/dolil-lekhok', icon: FileText, labelBn: 'ড্যাশবোর্ড ও খসড়া', labelEn: 'Dashboard & Drafts' },
          { to: '/staff/dolil-lekhok/create', icon: FileCheck, labelBn: 'নতুন দলিল নিবন্ধন (৭-ধাপ)', labelEn: 'Create Deed (7-step)' },
        ],
      },
    ],
    'sub-registrar': [
      {
        sectionBn: 'সাব-রেজিস্ট্রার কনসোল',
        sectionEn: 'Sub-Registrar Console',
        items: [
          { to: '/staff/sub-registrar', icon: ClipboardCheck, labelBn: 'দলিল যাচাই ও অনুমোদন', labelEn: 'Deed Review Queue' },
        ],
      },
    ],
    'mutation-officer': [
      {
        sectionBn: 'সহকারী কমিশনার (ভূমি) কনসোল',
        sectionEn: 'Mutation Officer Console',
        items: [
          { to: '/staff/mutation-officer', icon: ShieldAlert, labelBn: 'নামজারি আবেদন ও তুলনা', labelEn: 'Mutation Review Queue' },
        ],
      },
    ],
    admin: [
      {
        sectionBn: 'সিস্টেম অ্যাডমিন',
        sectionEn: 'System Administration',
        items: [
          { to: '/staff/admin', icon: Users, labelBn: 'সার্বিক পর্যবেক্ষণ', labelEn: 'Overview' },
          { to: '/staff/admin/users', icon: Users, labelBn: 'ব্যবহারকারী ব্যবস্থাপনা', labelEn: 'User Management' },
          { to: '/staff/admin/notices', icon: FileText, labelBn: 'বিজ্ঞপ্তি পরিচালনা', labelEn: 'Notice Management' },
        ],
      },
    ],
    citizen: [],
  };

  const currentNavGroups = staffNavMap[activeRole] || staffNavMap['dolil-lekhok'];

  return (
    <div className="min-h-screen flex bg-surface-subtle text-ink font-sans">
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 256px brand-900 Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-brand-900 text-brand-100 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-0 -translate-x-full lg:translate-x-0'
        }`}
        aria-label="Staff Navigation"
      >
        {/* Sidebar Header */}
        <div className="h-16 px-5 border-b border-brand-800 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 text-white group">
            <div className="w-8 h-8 rounded-lg bg-brand-800 flex items-center justify-center text-brand-300">
              <Landmark size={18} />
            </div>
            <div>
              <span className="font-bold text-[17px] tracking-tight">ভূমিলিংক</span>
              <span className="text-[12px] text-brand-200 block">স্টাফ পোর্টাল</span>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-brand-200 hover:text-white"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Nav Items */}
        <div className="flex-1 py-4 px-3 overflow-y-auto space-y-6">
          {currentNavGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-brand-300">
                {language === 'bn' ? group.sectionBn : group.sectionEn}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] transition-colors ${
                          isActive
                            ? 'bg-brand-50 text-brand-800 font-semibold shadow-sm'
                            : 'text-brand-100 hover:bg-brand-800 hover:text-white'
                        }`
                      }
                    >
                      <Icon size={18} aria-hidden="true" className="shrink-0" />
                      <span>{language === 'bn' ? item.labelBn : item.labelEn}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quick Return to Public Portal */}
          <div className="pt-4 border-t border-brand-800 space-y-1">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-brand-300">
              সাধারণ লিঙ্ক
            </p>
            <Link
              to="/citizen/services"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-brand-200 hover:text-white hover:bg-brand-800"
            >
              <ArrowLeft size={16} />
              <span>নাগরিক পোর্টালে যান</span>
            </Link>
            <Link
              to="/kitchen-sink"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-brand-200 hover:text-white hover:bg-brand-800"
            >
              <span>ডিজাইন সিস্টেম প্রিভিউ</span>
            </Link>
          </div>
        </div>

        {/* Active Role Card at Bottom of Sidebar */}
        <div className="p-4 border-t border-brand-800 bg-brand-950/40">
          <div className="text-[12px] text-brand-300">বর্তমান দায়িত্ব:</div>
          <div className="text-[14px] font-semibold text-white capitalize mt-0.5">
            {activeRole.replace('-', ' ')}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Bar (White, bordered) */}
        <header className="h-16 bg-white border-b border-[#e5e7eb] px-4 md:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-sunken"
              aria-label="Open sidebar menu"
            >
              <Menu size={20} />
            </button>
            <div className="text-[14px] text-ink-muted hidden sm:block">
              <span className="font-semibold text-ink">ভূমিলিংক স্টাফ কনসোল</span>
              <span className="mx-2">/</span>
              <span>{location.pathname}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Global Role Switcher */}
            <RoleSwitcher />

            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              aria-pressed={language === 'en'}
              className="inline-flex items-center gap-1 min-h-[40px] px-2.5 py-1.5 rounded-lg border border-[#d1d5db] bg-white text-[13px] font-semibold text-ink hover:bg-surface-sunken cursor-pointer transition-colors"
            >
              <Globe size={15} className="text-ink-muted" aria-hidden="true" />
              <span>{language === 'bn' ? 'EN' : 'বাংলা'}</span>
            </button>

            {/* Notification Bell */}
            <button
              type="button"
              className="relative p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-sunken cursor-pointer transition-colors"
              aria-label={`Notifications (${unreadCount} unread)`}
            >
              <Bell size={20} aria-hidden="true" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-accent-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Fluid Page Body */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full">
          <Outlet />
        </main>

        <ToastContainer />
      </div>
    </div>
  );
}
