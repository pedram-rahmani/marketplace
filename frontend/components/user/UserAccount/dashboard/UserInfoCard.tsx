interface UserInfoCardProps {
  user: any;
  onOpenEditModal: () => void;
}

export default function UserInfoCard({ user, onOpenEditModal }: UserInfoCardProps) {
  const targetUser = user?.user || user;

  const userEmail = targetUser?.email || "ایمیل ثبت نشده";
  const userPhone = targetUser?.phone || targetUser?.addresses?.[0]?.phone || "شماره تماس ثبت نشده";
  
  // استخراج هوشمند آدرس از رابطه addresses یا فیلدهای احتمالی
  const rawAddresses = targetUser?.addresses || user?.addresses;
  const defaultAddressObj = 
    Array.isArray(rawAddresses) 
      ? (rawAddresses.find((addr: any) => addr.is_default === true || addr.is_default === 1) || rawAddresses[0])
      : null;

  const userAddress =
    defaultAddressObj?.postal_address ||
    targetUser?.postal_address ||
    targetUser?.address ||
    user?.postal_address ||
    "آدرسی ثبت نشده است. برای تکمیل اطلاعات کلیک کنید.";

  const fullName = targetUser?.name || "کاربر عزیز";

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
        <h2 className="font-bold text-gray-900 dark:text-white text-base">
          اطلاعات حساب کاربری و آدرس پیش‌فرض
        </h2>
        <button
          onClick={onOpenEditModal}
          className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-medium cursor-pointer"
          type="button"
        >
          ویرایش مشخصات
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
        <div>
          <span className="block text-gray-400 text-xs mb-1">نام و نام خانوادگی</span>
          <span className="font-semibold text-gray-800 dark:text-white">{fullName}</span>
        </div>
        <div>
          <span className="block text-gray-400 text-xs mb-1">شماره تماس</span>
          <span className="font-semibold text-gray-800 dark:text-white" dir="ltr">{userPhone}</span>
        </div>
        <div>
          <span className="block text-gray-400 text-xs mb-1">ایمیل</span>
          <span className="font-semibold text-gray-800 dark:text-white" dir="ltr">{userEmail}</span>
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          <span className="block text-gray-400 text-xs mb-1">آدرس پستی</span>
          <span className="font-medium text-gray-800 dark:text-gray-200 leading-relaxed block">
            {userAddress}
          </span>
        </div>
      </div>
    </div>
  );
}