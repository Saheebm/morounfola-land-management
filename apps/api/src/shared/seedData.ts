import { ObjectId } from 'mongodb';
import { connectDB, disconnectDB, COLLECTIONS } from './db.js';

export async function seedDatabase(disconnectAfter = true): Promise<boolean> {
  console.log('--- [BhumiLink Database Seeding] Started ---');

  let db;
  try {
    db = await connectDB();
  } catch (err: any) {
    console.error('Failed to connect to MongoDB. Aborting seed:', err.message);
    if (disconnectAfter) process.exit(1);
    return false;
  }

  const usersCol = db.collection(COLLECTIONS.USERS);
  const parcelsCol = db.collection(COLLECTIONS.LAND_PARCELS);
  const csrsCol = db.collection(COLLECTIONS.CSRS_RECORDS);
  const noticesCol = db.collection(COLLECTIONS.NOTICES);
  const notificationsCol = db.collection(COLLECTIONS.NOTIFICATIONS);

  // 1. Clear existing collections
  console.log('Clearing existing records...');
  await usersCol.deleteMany({});
  await parcelsCol.deleteMany({});
  await csrsCol.deleteMany({});
  await noticesCol.deleteMany({});
  await notificationsCol.deleteMany({});

  // 2. Insert 5 Demo Users (one for each role)
  console.log('Inserting demo users...');
  const citizenId = new ObjectId('6ac83c2410c2f9623caf49e0');
  const lekhokId = new ObjectId('6ac83c2410c2f9623caf49e1');
  const srId = new ObjectId('6ac83c2410c2f9623caf49e2');
  const moId = new ObjectId('6ac83c2410c2f9623caf49e3');
  const adminId = new ObjectId('6ac83c2410c2f9623caf49e4');

  await usersCol.insertMany([
    {
      _id: citizenId,
      name_bn: 'মো: রফিকুল ইসলাম',
      name_en: 'Md. Rafiqul Islam',
      role: 'citizen',
      active: true,
      email: 'citizen.demo@bhumilink.gov.bd',
      phone: '01711000001',
      nid: '1985269450001',
      created_at: new Date(),
    },
    {
      _id: lekhokId,
      name_bn: 'আব্দুস সাত্তার',
      name_en: 'Abdus Sattar',
      role: 'dolil-lekhok',
      active: true,
      email: 'lekhok.demo@bhumilink.gov.bd',
      phone: '01812000002',
      nid: '1978269450002',
      created_at: new Date(),
    },
    {
      _id: srId,
      name_bn: 'কাজী মাহমুদ হাসান',
      name_en: 'Kazi Mahmud Hasan',
      role: 'sub-registrar',
      active: true,
      email: 'subregistrar.demo@bhumilink.gov.bd',
      phone: '01913000003',
      nid: '1982269450003',
      created_at: new Date(),
    },
    {
      _id: moId,
      name_bn: 'তাহমিনা আক্তার',
      name_en: 'Tahmina Akhter',
      role: 'mutation-officer',
      active: true,
      email: 'acland.demo@bhumilink.gov.bd',
      phone: '01614000004',
      nid: '1989269450004',
      created_at: new Date(),
    },
    {
      _id: adminId,
      name_bn: 'সিস্টেম অ্যাডমিনিস্ট্রেটর',
      name_en: 'System Administrator',
      role: 'admin',
      active: true,
      email: 'admin@bhumilink.gov.bd',
      phone: '01515000005',
      nid: '1990269450005',
      created_at: new Date(),
    },
  ]);

  // 3. Insert 8 Land Parcels covering all transaction_status enum values
  console.log('Inserting land parcels with varied transaction statuses...');
  const parcel0Id = new ObjectId('6ac83c2410c2f9623caf49e6');
  const parcel1Id = new ObjectId('6ac83c2410c2f9623caf49e7');
  const parcel2Id = new ObjectId('6ac83c2410c2f9623caf49e8');
  const parcel3Id = new ObjectId('6ac83c2410c2f9623caf49e9');
  const parcel4Id = new ObjectId('6ac83c2410c2f9623caf49ea');
  const parcel5Id = new ObjectId('6ac83c2410c2f9623caf49eb');
  const parcel6Id = new ObjectId('6ac83c2410c2f9623caf49ec');
  const parcel7Id = new ObjectId('6ac83c2410c2f9623caf49ed');

  await parcelsCol.insertMany([
    {
      _id: parcel0Id,
      mouza: 'বিরুলিয়া',
      dag: '৫৬৭',
      khatian: '১২৪/ক',
      area_decimal: 12.5,
      transaction_status: 'Available',
      current_owner_id: citizenId,
      current_owner_name_bn: 'মো: রফিকুল ইসলাম',
      current_owner_name_en: 'Md. Rafiqul Islam',
      district: 'ঢাকা',
      upazila: 'সাভার',
      land_class: 'নাল',
      coordinates: { lat: 23.8234, lng: 90.3156 },
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      _id: parcel1Id,
      mouza: 'বিরুলিয়া',
      dag: '৫৬৮',
      khatian: '১২৫',
      area_decimal: 8.0,
      transaction_status: 'Available',
      current_owner_id: citizenId,
      current_owner_name_bn: 'আনোয়ার হোসেন',
      current_owner_name_en: 'Anwar Hossain',
      district: 'ঢাকা',
      upazila: 'সাভার',
      land_class: 'বাড়ি',
      coordinates: { lat: 23.824, lng: 90.3162 },
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      _id: parcel2Id,
      mouza: 'আমিনবাজার',
      dag: '১০২২',
      khatian: '৩১০',
      area_decimal: 20.0,
      transaction_status: 'Available',
      current_owner_name_bn: 'বেগম ফাতেমা খাতুন',
      current_owner_name_en: 'Begum Fatema Khatun',
      district: 'ঢাকা',
      upazila: 'সাভার',
      land_class: 'বাণিজ্যিক',
      coordinates: { lat: 23.785, lng: 90.334 },
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      _id: parcel3Id,
      mouza: 'কাউন্দিয়া',
      dag: '১২৮',
      khatian: '৯৮',
      area_decimal: 5.0,
      transaction_status: 'MutationInProgress',
      current_owner_name_bn: 'মো: জহিরুল হক',
      current_owner_name_en: 'Md. Zahirul Haque',
      district: 'ঢাকা',
      upazila: 'সাভার',
      land_class: 'ভিটি',
      coordinates: { lat: 23.805, lng: 90.328 },
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      _id: parcel4Id,
      mouza: 'সাভার পৌরসভা',
      dag: '৩৪০',
      khatian: '৫১২',
      area_decimal: 10.25,
      transaction_status: 'MutationInProgress',
      current_owner_name_bn: 'শাহেদা আক্তার',
      current_owner_name_en: 'Shaheda Akhter',
      district: 'ঢাকা',
      upazila: 'সাভার',
      land_class: 'বাগান',
      coordinates: { lat: 23.856, lng: 90.261 },
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      _id: parcel5Id,
      mouza: 'ধামরাই',
      dag: '৩৪',
      khatian: '২১',
      area_decimal: 15.0,
      transaction_status: 'TransferredUpdated',
      current_owner_name_bn: 'মো: আব্দুল করিম',
      current_owner_name_en: 'Md. Abdul Karim',
      district: 'ঢাকা',
      upazila: 'ধামরাই',
      land_class: 'নাল',
      coordinates: { lat: 23.918, lng: 90.207 },
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      _id: parcel6Id,
      mouza: 'বিরুলিয়া',
      dag: '৫৭০',
      khatian: '১৪০',
      area_decimal: 6.5,
      transaction_status: 'TransferredUpdated',
      current_owner_name_bn: 'মোজাম্মেল হক',
      current_owner_name_en: 'Mozammel Haque',
      district: 'ঢাকা',
      upazila: 'সাভার',
      land_class: 'বাড়ি',
      coordinates: { lat: 23.8248, lng: 90.317 },
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      _id: parcel7Id,
      mouza: 'আমিনবাজার',
      dag: '৭৮৯',
      khatian: '৪৫০',
      area_decimal: 8.25,
      transaction_status: 'Restricted',
      current_owner_name_bn: 'বিচারধীন / সরকারি খাস খতিয়ান',
      current_owner_name_en: 'Court Hold / Khas Registry',
      district: 'ঢাকা',
      upazila: 'সাভার',
      land_class: 'পুকুর',
      coordinates: { lat: 23.788, lng: 90.337 },
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);

  // 4. Insert Sample CS/RS Records linked to parcels
  console.log('Inserting CS/RS records...');
  await csrsCol.insertMany([
    {
      parcel_id: parcel0Id,
      record_type: 'CS',
      data: {
        historical_owner_bn: 'রামকৃষ্ণ মজুমদার',
        historical_owner_en: 'Ramkrishna Majumder',
        dag_no: '৫৬৭',
        khatian_no: '১২৪',
        share: '১৬ আনা',
        remarks_bn: 'সিএস জরিপ ১৯৪০ খ্রিস্টাব্দে প্রণীত।',
      },
      verified: true,
      document_url: '/documents/cs-birulia-567.pdf',
      created_at: new Date(),
    },
    {
      parcel_id: parcel0Id,
      record_type: 'RS',
      data: {
        historical_owner_bn: 'মো: রফিকুল ইসলাম',
        historical_owner_en: 'Md. Rafiqul Islam',
        dag_no: '৫৬৭',
        khatian_no: '১২৪/ক',
        share: '১৬ আনা',
        remarks_bn: 'আরএস রেকর্ড ১৯৯২ খ্রিস্টাব্দে চূড়ান্ত প্রকাশিত।',
      },
      verified: true,
      document_url: '/documents/rs-birulia-567.pdf',
      created_at: new Date(),
    },
    {
      parcel_id: parcel3Id,
      record_type: 'CS',
      data: {
        historical_owner_bn: 'যোগেশ চন্দ্র রায়',
        historical_owner_en: 'Jogesh Chandra Roy',
        dag_no: '১২৮',
        khatian_no: '৯৮',
        share: '১৬ আনা',
      },
      verified: true,
      created_at: new Date(),
    },
    {
      parcel_id: parcel5Id,
      record_type: 'RS',
      data: {
        historical_owner_bn: 'মো: আব্দুল করিম',
        historical_owner_en: 'Md. Abdul Karim',
        dag_no: '৩৪',
        khatian_no: '২১',
        share: '১৬ আনা',
      },
      verified: true,
      created_at: new Date(),
    },
  ]);

  // 5. Insert Sample Notices
  console.log('Inserting public notices...');
  await noticesCol.insertMany([
    {
      title_bn: 'সাভার উপজেলার ২০২৬ সনের ভূমি উন্নয়ন কর পরিশোধ সংক্রান্ত বিজ্ঞপ্তি',
      title_en: 'Notice regarding payment of Land Development Tax 2026 in Savar Upazila',
      body_bn: 'সকল সম্মানিত ভূমি মালিকদের জানানো যাচ্ছে যে, ২০২৬ সনের ভূমি উন্নয়ন কর অনলাইন পোর্টালে দাখিলা সংগ্রহ সহ পরিশোধ করা যাবে।',
      body_en: 'All land owners are notified that 2026 Land Development Tax can be paid online with digital Dakhila generation.',
      category: 'কর বিজ্ঞপ্তি',
      created_by: adminId,
      published_at: new Date(),
    },
    {
      title_bn: 'বিরুলিয়া মৌজার খতিয়ান হালনাগাদকরণ ও নামজারি শুনানি বিজ্ঞপ্তি',
      title_en: 'Hearing notice for Mouza Birulia Khatian Updates & Mutation Hearings',
      body_bn: 'বিরুলিয়া মৌজার দাগ নং ৫৬৭ ও সংলগ্ন দাগসমূহের নামজারি শুনানি আগামী সপ্তাহে উপজেলা ভূমি অফিসে অনুষ্ঠিত হবে।',
      body_en: 'Mutation hearing for plot 567 and adjacent dag in Birulia Mouza will be held next week at Upazila Land Office.',
      category: 'শুনানি নোটিশ',
      created_by: adminId,
      published_at: new Date(),
    },
  ]);

  // 6. Insert Sample Notifications
  console.log('Inserting initial notifications...');
  await notificationsCol.insertMany([
    {
      user_id: citizenId,
      type: 'info',
      title_bn: 'ভূমি উন্নয়ন কর পরিশোধের সময়সূচি',
      title_en: 'Land Development Tax Schedule',
      body_bn: 'আপনার মালিকানাধীন বিরুলিয়া মৌজার খতিয়ান নং ১২৪/ক এর চলতি অর্থবছরের কর পরিশোধের রশিদ প্রস্তুত রয়েছে।',
      body_en: 'Tax receipt for Khatian 124/A in Mouza Birulia is ready for payment.',
      read: false,
      action_url: '/citizen/land-records',
      created_at: new Date(),
    },
    {
      user_id: citizenId,
      type: 'success',
      title_bn: 'দলিল নম্বর ২০২৬-০০১ নিবন্ধিত হয়েছে',
      title_en: 'Deed No 2026-001 has been registered',
      body_bn: 'সাব-রেজিস্ট্রার কর্তৃক আপনার বিক্রয় কবলা দলিল অনুমোদিত হয়েছে। পরবর্তী ধাপ হিসেবে নামজারির আবেদন করুন।',
      body_en: 'Your Sale deed has been approved by the Sub-Registrar. Next step: Apply for mutation.',
      read: false,
      action_url: '/citizen/land-records',
      created_at: new Date(),
    },
  ]);

  console.log('--- [BhumiLink Database Seeding] Successfully Completed! ---');
  if (disconnectAfter) {
    await disconnectDB();
  }
  return true;
}
