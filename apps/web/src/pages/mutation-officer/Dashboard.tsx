import { Card, CardHeader, CardTitle, CardContent } from '../../components/Card';
import { StatusBadge } from '../../components/StatusBadge';

export function MutationOfficerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[24px] md:text-[28px] font-bold text-brand-900">
          সহকারী কমিশনার (ভূমি) কনসোল
        </h1>
        <p className="text-[14px] text-ink-muted">
          Assistant Commissioner (Land) · Mutation Verification & RS/BS Update
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card>
          <CardContent>
            <div className="text-[13px] text-ink-muted">অপেক্ষমাণ নামজারি কেস</div>
            <div className="text-[28px] font-bold text-amber-800 mt-1">৩টি</div>
            <StatusBadge status="MutationInProgress" size="sm" className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-[13px] text-ink-muted">নিষ্পত্তিকৃত নামজারি</div>
            <div className="text-[28px] font-bold text-brand-800 mt-1">১২টি</div>
            <StatusBadge status="Resolved" size="sm" className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-[13px] text-ink-muted">আরএস/বিএস হালনাগাদ সম্পন্ন</div>
            <div className="text-[28px] font-bold text-brand-800 mt-1">৯টি</div>
            <StatusBadge status="TransferredUpdated" size="sm" className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle titleBn="নামজারি আবেদন কিউ" titleEn="Mutation Case Queue" />
        </CardHeader>
        <CardContent>
          <p className="text-[14px] text-ink-muted py-4 text-center">
            নামজারি যাচাই, দলিল বনাম সিএস/আরএস রেকর্ড তুলনা ও আরএস/বিএস হালনাগাদ ফেইজ ৪-এ সংযুক্ত করা হবে।
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
