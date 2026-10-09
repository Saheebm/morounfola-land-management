import { Card, CardHeader, CardTitle, CardContent } from '../../components/Card';
import { StatusBadge } from '../../components/StatusBadge';

export function SubRegistrarDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[24px] md:text-[28px] font-bold text-brand-900">
          সাব-রেজিস্ট্রার পরীক্ষণ ও অনুমোদন কনসোল
        </h1>
        <p className="text-[14px] text-ink-muted">
          Sub-Registrar Deed Verification & Registration Console · সাভার কার্যালয়
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card>
          <CardContent>
            <div className="text-[13px] text-ink-muted">অপেক্ষমাণ দলিল যাচাই</div>
            <div className="text-[28px] font-bold text-amber-800 mt-1">৪টি</div>
            <StatusBadge status="UnderVerification" size="sm" className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-[13px] text-ink-muted">আজকের অনুমোদিত দলিল</div>
            <div className="text-[28px] font-bold text-brand-800 mt-1">৭টি</div>
            <StatusBadge status="Approved" size="sm" className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-[13px] text-ink-muted">সংশোধন চাওয়া হয়েছে</div>
            <div className="text-[28px] font-bold text-red-700 mt-1">১টি</div>
            <StatusBadge status="Rejected" size="sm" className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle titleBn="যাচাই কিউ" titleEn="Deed Review Queue" />
        </CardHeader>
        <CardContent>
          <p className="text-[14px] text-ink-muted py-4 text-center">
            সাব-রেজিস্ট্রার রিভিউ ও ডিজিটাল দলিল অনুমোদন প্রক্রিয়া ফেইজ ৩-এ বিস্তারিতভাবে সংযুক্ত করা হবে।
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
