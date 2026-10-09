import { Card, CardHeader, CardTitle, CardContent } from '../../components/Card';
import { Button } from '../../components/Button';
import { StatusBadge } from '../../components/StatusBadge';
import { FilePlus } from 'lucide-react';
import { Link } from 'react-router';

export function DolilLekhokDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] md:text-[28px] font-bold text-brand-900">
            দলিল লেখক ড্যাশবোর্ড
          </h1>
          <p className="text-[14px] text-ink-muted">
            Dolil Lekhok Management Console · সনদ নং: ১২৮
          </p>
        </div>
        <Link to="/staff/dolil-lekhok/create">
          <Button variant="primary" leftIcon={<FilePlus size={16} />}>
            Create New Deed (৭-ধাপ)
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card>
          <CardContent>
            <div className="text-[13px] text-ink-muted">খসড়া দলিল</div>
            <div className="text-[28px] font-bold text-ink mt-1">৩টি</div>
            <StatusBadge status="Draft" size="sm" className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-[13px] text-ink-muted">যাচাই প্রক্রিয়াধীন</div>
            <div className="text-[28px] font-bold text-ink mt-1">২টি</div>
            <StatusBadge status="UnderVerification" size="sm" className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-[13px] text-ink-muted">নিবন্ধিত ও নামজারিযোগ্য</div>
            <div className="text-[28px] font-bold text-ink mt-1">১টি</div>
            <StatusBadge status="Approved" size="sm" className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle titleBn="সর্বশেষ দলিলসমূহ" titleEn="Recent Deeds" />
        </CardHeader>
        <CardContent>
          <p className="text-[14px] text-ink-muted py-4 text-center">
            দলিল তৈরির প্রক্রিয়া ফেইজ ৩-এ বিস্তারিতভাবে সংযুক্ত করা হবে।
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
