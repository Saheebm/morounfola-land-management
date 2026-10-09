import { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  StatusBadge,
  FormField,
  Input,
  Select,
  Textarea,
  DataTable,
  Modal,
  TransactionStatusPanel,
  ComparisonTable,
} from '../components';
import { useAppStore } from '../store/useAppStore';
import { formatCurrency } from '../lib/formatCurrency';
import { FilePlus, Download, Trash2 } from 'lucide-react';

export function KitchenSink() {
  const [modalOpen, setModalOpen] = useState(false);
  const addToast = useAppStore((state) => state.addToast);
  const [formInput, setFormInput] = useState('');
  const [hasError, setHasError] = useState(false);

  // Sample data for DataTable
  const sampleTableData = [
    {
      _id: '1',
      khatian: '১২৪/ক',
      dag: '৫৬৭',
      mouza: 'বিরুলিয়া',
      area: '১২.৫০ শতাংশ',
      status: 'Available' as const,
    },
    {
      _id: '2',
      khatian: '৯৮',
      dag: '১২৮',
      mouza: 'কাউন্দিয়া',
      area: '৫.০০ শতাংশ',
      status: 'MutationInProgress' as const,
    },
    {
      _id: '3',
      khatian: '৪৫০',
      dag: '৭৮৯',
      mouza: 'আমিনবাজার',
      area: '৮.২৫ শতাংশ',
      status: 'Restricted' as const,
    },
    {
      _id: '4',
      khatian: '২১',
      dag: '৩৪',
      mouza: 'ধামরাই',
      area: '১৫.০০ শতাংশ',
      status: 'TransferredUpdated' as const,
    },
  ];

  const columns = [
    { key: 'mouza', headerBn: 'মৌজা', headerEn: 'Mouza', sortable: true },
    { key: 'khatian', headerBn: 'খতিয়ান নং', headerEn: 'Khatian No', sortable: true },
    { key: 'dag', headerBn: 'দাগ নং', headerEn: 'Dag No', sortable: true },
    { key: 'area', headerBn: 'জমির পরিমাণ', headerEn: 'Area (Decimal)' },
    {
      key: 'status',
      headerBn: 'অবস্থা',
      headerEn: 'Status',
      render: (item: any) => <StatusBadge status={item.status} />,
    },
  ];

  // Sample comparison items for ComparisonTable
  const comparisonItems = [
    {
      fieldBn: 'মৌজা ও জে.এল নং',
      fieldEn: 'Mouza & J.L No',
      deedValue: 'বিরুলিয়া (জে.এল-২৪)',
      csrsValue: 'বিরুলিয়া (জে.এল-২৪)',
    },
    {
      fieldBn: 'দাগ নম্বর',
      fieldEn: 'Dag Number',
      deedValue: 'দাগ নং-৫৬৭',
      csrsValue: 'দাগ নং-৫৬৭',
    },
    {
      fieldBn: 'জমির পরিমাণ',
      fieldEn: 'Land Area',
      deedValue: '১২.৫০ শতাংশ',
      csrsValue: '১০.০০ শতাংশ', // Mismatch!
    },
    {
      fieldBn: 'রেকর্ডিয় মালিকের নাম',
      fieldEn: 'Recorded Owner Name',
      deedValue: 'মো: আব্দুল করিম',
      csrsValue: 'মো: আব্দুল করিম',
    },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Page Title */}
      <div>
        <h1 className="text-[28px] md:text-[32px] font-bold text-brand-900">
          ডিজাইন সিস্টেম ও শেয়ার্ড কম্পোনেন্ট গ্যালারি
        </h1>
        <p className="text-ink-muted text-[15px] mt-1">
          BhumiLink UI Primitives & Design System Verification (Design.md §2–§9)
        </p>
      </div>

      {/* 1. Transaction Status Panels (§9.1) */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-semibold text-ink border-b pb-2">
          ১. লেনদেনের অবস্থা প্যানেল (TransactionStatusPanel — §9.1)
        </h2>
        <div className="space-y-4">
          <TransactionStatusPanel
            status="Available"
            onActionClick={() => addToast({ type: 'info', message: 'নিবন্ধন সেবা চালু আছে' })}
            actionTextBn="দলিল তৈরির জন্য আবেদন করুন"
          />
          <TransactionStatusPanel
            status="MutationInProgress"
            onActionClick={() => addToast({ type: 'warning', message: 'নামজারি ট্র্যাকিং পৃষ্ঠা খোলা হচ্ছে' })}
          />
          <TransactionStatusPanel
            status="Restricted"
            onActionClick={() => addToast({ type: 'error', message: 'আইনি নোটিশ দেখুন' })}
          />
          <TransactionStatusPanel status="TransferredUpdated" />
          <TransactionStatusPanel status="MutationInProgress" compact />
        </div>
      </section>

      {/* 2. Buttons (§8) */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-semibold text-ink border-b pb-2">
          ২. বাটন প্রিমিটিভস (Button Variants & Actions — §8)
        </h2>
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="primary" leftIcon={<FilePlus size={16} />}>
            Submit Application
          </Button>
          <Button variant="secondary">Approve Deed</Button>
          <Button variant="outline" rightIcon={<Download size={16} />}>
            Download Dakhila
          </Button>
          <Button variant="danger" leftIcon={<Trash2 size={16} />}>
            Reject Application
          </Button>
          <Button variant="ghost">Save Draft</Button>
          <Button variant="primary" isLoading>
            Loading...
          </Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </section>

      {/* 3. Status Badges (§8, statusMap) */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-semibold text-ink border-b pb-2">
          ৩. স্ট্যাটাস ব্যাজ (StatusBadges — color + text + icon)
        </h2>
        <div className="flex flex-wrap gap-2.5 items-center">
          <StatusBadge status="Approved" />
          <StatusBadge status="Verified" />
          <StatusBadge status="Submitted" />
          <StatusBadge status="Pending" />
          <StatusBadge status="MutationInProgress" />
          <StatusBadge status="DueSoon" />
          <StatusBadge status="Rejected" />
          <StatusBadge status="Restricted" />
          <StatusBadge status="UnderVerification" />
          <StatusBadge status="Draft" />
          <StatusBadge status="Approved" bilingual />
        </div>
      </section>

      {/* 4. Form Fields & Inputs (§8) */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-semibold text-ink border-b pb-2">
          ৪. ফর্ম ফিল্ড ও ইনপুট কন্ট্রোল (FormField, Input, Select, Textarea)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FormField
            labelBn="মালিকের পূর্ণ নাম"
            labelEn="Owner Full Name"
            required
            helperText="জাতীয় পরিচয়পত্র অনুযায়ী নাম লিখুন"
          >
            {(props) => (
              <Input
                {...props}
                placeholder="যেমন: মো: রফিকুল ইসলাম"
                value={formInput}
                onChange={(e) => setFormInput(e.target.value)}
              />
            )}
          </FormField>

          <FormField
            labelBn="দাগ নম্বর"
            labelEn="Dag Number"
            required
            error={hasError ? 'দাগ নম্বর সঠিকভাবে লিখুন (ভুল ইনপুট)' : undefined}
          >
            {(props) => (
              <Input
                {...props}
                placeholder="যেমন: ৫৬৭"
                onBlur={() => setHasError(!formInput)}
              />
            )}
          </FormField>

          <FormField labelBn="জমির শ্রেণি" labelEn="Land Classification">
            {(props) => (
              <Select {...props}>
                <option value="nal">নাল (Nal)</option>
                <option value="bari">বাড়ি (Residential)</option>
                <option value="bagan">বাগান (Garden)</option>
                <option value="commercial">বাণিজ্যিক (Commercial)</option>
              </Select>
            )}
          </FormField>
        </div>

        <FormField labelBn="মন্তব্য ও বিশেষ দ্রষ্টব্য" labelEn="Remarks">
          {(props) => <Textarea {...props} placeholder="কোনো বিশেষ মন্তব্য থাকলে লিখুন..." />}
        </FormField>
      </section>

      {/* 5. Currency & Numerals (§6) */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-semibold text-ink border-b pb-2">
          ৫. মুদ্রা ও সংখ্যা ফরম্যাটিং (formatCurrency & Numerals — §6)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent>
              <div className="text-[13px] text-ink-muted">আমদানি ফি (Import Fee)</div>
              <div className="text-[24px] font-bold text-brand-800 mt-1">
                {formatCurrency(120, 'bn')}
              </div>
              <div className="text-[12px] text-ink-muted mt-0.5">
                English: {formatCurrency(120, 'en')}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="text-[13px] text-ink-muted">ভূমি উন্নয়ন কর (Land Tax)</div>
              <div className="text-[24px] font-bold text-brand-800 mt-1">
                {formatCurrency(5450, 'bn')}
              </div>
              <div className="text-[12px] text-ink-muted mt-0.5">
                English: {formatCurrency(5450, 'en')}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="text-[13px] text-ink-muted">নিবন্ধন ফি (Deed Fee)</div>
              <div className="text-[24px] font-bold text-brand-800 mt-1">
                {formatCurrency(25000, 'bn')}
              </div>
              <div className="text-[12px] text-ink-muted mt-0.5">
                English: {formatCurrency(25000, 'en')}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 6. DataTable (§8) */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-semibold text-ink border-b pb-2">
          ৬. ডেটা টেবিল (DataTable — Search, Sort, Real Table)
        </h2>
        <DataTable
          columns={columns}
          data={sampleTableData}
          searchKeys={['mouza', 'khatian', 'dag']}
        />
      </section>

      {/* 7. Comparison Table (§9.7) */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-semibold text-ink border-b pb-2">
          ৭. তুলনা টেবিল (ComparisonTable with DiffRow Mismatch Highlighting — §9.7)
        </h2>
        <ComparisonTable items={comparisonItems} />
      </section>

      {/* 8. Cards & Modals (§8) */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-semibold text-ink border-b pb-2">
          ৮. কার্ড ও ডায়ালগ মডাল (Card & Modal Dialogs)
        </h2>
        <Card>
          <CardHeader
            action={
              <Button variant="secondary" onClick={() => setModalOpen(true)}>
                মডাল প্রিভিউ খুলুন
              </Button>
            }
          >
            <CardTitle
              titleBn="খতিয়ান বিস্তারিত তথ্য"
              titleEn="Khatian Details"
              badge={<StatusBadge status="Verified" size="sm" />}
            />
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-[14px] text-ink-soft">
              এটি একটি প্রমাণীকৃত সরকারি ভূমি রেকর্ড প্রিভিউ কার্ড।
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              onClick={() =>
                addToast({
                  type: 'success',
                  title: 'সাফল্য',
                  message: 'বিজ্ঞপ্তি সফলভাবে তৈরি করা হয়েছে!',
                })
              }
            >
              ট্রিগার সাকসেস টোস্ট
            </Button>
          </CardFooter>
        </Card>
      </section>

      {/* Modal Demonstration */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        titleBn="আবেদন যাচাইকরণ ও অনুমোদন"
        titleEn="Application Review & Approval"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setModalOpen(false);
                addToast({
                  type: 'success',
                  title: 'অনুমোদিত',
                  message: 'আবেদনটি সফলভাবে অনুমোদিত হয়েছে।',
                });
              }}
            >
              Approve Deed
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-[14px]">
          <p className="text-ink">
            আপনি কি নিশ্চিত যে আপনি সাব-রেজিস্ট্রার হিসেবে এই দলিলটি নিবন্ধন ও অনুমোদন করতে চান?
          </p>
          <div className="p-3 bg-brand-50 border border-brand-200 rounded-lg text-brand-900 text-[13px]">
            ✓ সকল সরকারি ফি পরিশোধ নিশ্চিত করা হয়েছে।
          </div>
        </div>
      </Modal>
    </div>
  );
}
