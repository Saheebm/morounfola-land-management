import { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router';
import { Landmark, Bell, Globe, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/useAppStore';
import { RoleSwitcher } from '../components/RoleSwitcher';
import { ToastContainer } from '../components/Toast';

export function CitizenLayout() {
  const { i18n } = useTranslation();
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const unreadCount = useAppStore((state) => state.unreadNotificationsCount);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const nextLang = language === 'bn' ? 'en' : 'bn';
    setLanguage(nextLang);
    i18n.changeLanguage(nextLang);
  };

  const navItems = [
    { to: '/citizen/services', labelBn: 'নাগরিক সেবা', labelEn: 'Services' },
    { to: '/citizen/land-records', labelBn: 'জমির রেকর্ড', labelEn: 'Land Records' },
    { to: '/citizen/map', labelBn: 'স্মার্ট ম্যাপ', labelEn: 'Smart Map' },
    { to: '/citizen/notices', labelBn: 'বিজ্ঞপ্তি', labelEn: 'Notices' },
    { to: '/citizen/track', labelBn: 'ট্র্যাকিং', labelEn: 'Track' },
    { to: '/kitchen-sink', labelBn: 'ডিজাইন সিস্টেম', labelEn: 'UI Kit' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface-subtle text-ink font-sans">
      {/* 4px Flag Accent Line: green bar + short red segment */}
      <div className="w-full h-1 flex sticky top-0 z-50">
        <div className="flex-1 bg-brand-600" />
        <div className="w-16 md:w-24 bg-accent-500" />
      </div>

      {/* Sticky White Header */}
      <header className="sticky top-1 z-40 bg-white border-b border-[#e5e7eb] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo & Identity */}
          <Link to="/" className="flex items-center gap-3 shrink-0 text-decoration-none group">
            <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 group-hover:bg-brand-100 transition-colors">
              <Landmark size={22} aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[19px] font-bold text-brand-900 tracking-tight">
                  ভূমিলিংক
                </span>
                <span className="text-[14px] font-semibold text-ink-muted">
                  · BhumiLink
                </span>
              </div>
              <p className="text-[11px] text-ink-muted hidden sm:block">
                গণপ্রজাতন্ত্রী বাংলাদেশ সরকার · ডিজিটাল ভূমি সেবা
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-[14px] font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-800 font-semibold'
                      : 'text-ink-soft hover:text-brand-700 hover:bg-surface-sunken'
                  }`
                }
              >
                <span>{language === 'bn' ? item.labelBn : item.labelEn}</span>
              </NavLink>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Role Switcher */}
            <RoleSwitcher />

            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              aria-pressed={language === 'en'}
              className="inline-flex items-center gap-1 min-h-[40px] px-2.5 py-1.5 rounded-lg border border-[#d1d5db] bg-white text-[13px] font-semibold text-ink hover:bg-surface-sunken cursor-pointer transition-colors"
              title="Change Language"
            >
              <Globe size={15} className="text-ink-muted" aria-hidden="true" />
              <span>{language === 'bn' ? 'EN' : 'বাংলা'}</span>
            </button>

            {/* Notification Bell */}
            <button
              type="button"
              disabled
              className="relative cursor-not-allowed rounded-lg p-2 text-ink-muted opacity-60"
              aria-label={
                language === 'bn'
                  ? 'প্রোটোটাইপে বিজ্ঞপ্তি সুবিধা চালু নেই'
                  : 'Notifications are unavailable in this prototype'
              }
              title={
                language === 'bn'
                  ? 'প্রোটোটাইপে বিজ্ঞপ্তি সুবিধা চালু নেই'
                  : 'Notifications are unavailable in this prototype'
              }
            >
              <Bell size={20} aria-hidden="true" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-accent-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden rounded-lg text-ink-muted hover:text-ink hover:bg-surface-sunken cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#e5e7eb] bg-white px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-[14px] font-medium ${
                    isActive
                      ? 'bg-brand-50 text-brand-800 font-semibold'
                      : 'text-ink-soft hover:bg-surface-sunken'
                  }`
                }
              >
                {language === 'bn' ? item.labelBn : item.labelEn}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 md:py-8">
        <Outlet />
      </main>

      {/* Global Toast Container */}
      <ToastContainer />

      {/* Government Formal Footer */}
      <footer className="bg-brand-900 text-brand-100 border-t border-brand-800 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-[14px]">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <Landmark size={22} className="text-brand-300" />
              <span className="font-bold text-[17px]">ভূমিলিংক · BhumiLink</span>
            </div>
            <p className="text-brand-200 text-[13px] leading-relaxed">
              ভূমি মন্ত্রণালয় ও আইন মন্ত্রণালয়ের সমন্বিত উদ্যোগে পরিচালিত ডিজিটাল জমি রেকর্ড ও দলিল যাচাই সেবা পোর্টাল।
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">গুরুত্বপূর্ণ সেবা</h4>
            <ul className="space-y-2 text-[13px] text-brand-200">
              <li>ই-নামজারি আবেদন</li>
              <li>অনলাইন ভূমি উন্নয়ন কর</li>
              <li>সিএস ও আরএস রেকর্ড অনুসন্ধান</li>
              <li>ডিজিটাল দলিল যাচাইকরণ</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">জরুরি সেবা ও সহায়তা</h4>
            <p className="text-[13px] text-brand-200">ভূমি সেবা হটলাইন:</p>
            <p className="text-[18px] font-bold text-white mt-1">১৬১২২ (16122)</p>
            <p className="text-[12px] text-brand-300 mt-1">সকাল ৯টা থেকে বিকাল ৫টা (ছুটির দিন ব্যতিত)</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">সরকারি নীতি ও শর্তাবলী</h4>
            <p className="text-[12px] text-brand-200 leading-relaxed">
              এই পোর্টালের সমস্ত তথ্য ও রেকর্ড বাংলাদেশ ভূমি রেকর্ড ও জরিপ অধিদপ্তরের নিয়মাবলী অনুযায়ী পরিচালিত।
            </p>
            <p className="text-[12px] text-brand-300 mt-3">
              © ২০২৬ গণপ্রজাতন্ত্রী বাংলাদেশ সরকার। সর্বস্বত্ব সংরক্ষিত।
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
