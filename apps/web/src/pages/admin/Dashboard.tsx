import { Card, CardHeader, CardTitle, CardContent } from '../../components/Card';
import { StatusBadge } from '../../components/StatusBadge';

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[24px] md:text-[28px] font-bold text-brand-900">
          সিস্টেম অ্যাডমিনিস্ট্রেটর পোর্টাল
        </h1>
        <p className="text-[14px] text-ink-muted">
          System Administration & Oversight Dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Card>
          <CardContent>
            <div className="text-[13px] text-ink-muted">মোট নিবন্ধিত ব্যবহারকারী</div>
            <div className="text-[28px] font-bold text-ink mt-1">৫ জন</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-[13px] text-ink-muted">মোট জমি খতিয়ান রেকর্ড</div>
            <div className="text-[28px] font-bold text-ink mt-1">৮টি</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-[13px] text-ink-muted">সিস্টেম স্ট্যাটাস</div>
            <div className="text-[28px] font-bold text-brand-800 mt-1">সক্রিয়</div>
            <StatusBadge status="Completed" size="sm" className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-[13px] text-ink-muted">মোট অডিট লগ</div>
            <div className="text-[28px] font-bold text-ink mt-1">২৪টি</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle titleBn="সিস্টেম স্বাস্থ্য ও কার্যকলাপ" titleEn="System Activity" />
        </CardHeader>
        <CardContent>
          <p className="text-[14px] text-ink-muted py-4 text-center">
            ব্যবহারকারী ব্যবস্থাপনা, সার্বিক রাজস্ব অডিট ও রিপোর্ট ফেইজ ৫-এ সংযুক্ত করা হবে।
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
