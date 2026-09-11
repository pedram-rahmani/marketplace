export default function NotificationSettings() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-purple-300">کانال‌های اطلاع‌رسانی</h2>
      <div className="space-y-4 max-w-xl">
        <label className="flex items-center justify-between cursor-pointer p-3 bg-gray-950/50 rounded-xl border border-gray-800/50">
          <span className="text-gray-300 text-sm">دریافت پیامک وضعیت سفارش‌ها</span>
          <input type="checkbox" className="accent-purple-600 w-5 h-5 rounded cursor-pointer" defaultChecked />
        </label>
        <label className="flex items-center justify-between cursor-pointer p-3 bg-gray-950/50 rounded-xl border border-gray-800/50">
          <span className="text-gray-300 text-sm">عضویت در خبرنامه ایمیلی و تخفیف‌ها</span>
          <input type="checkbox" className="accent-purple-600 w-5 h-5 rounded cursor-pointer" />
        </label>
        <label className="flex items-center justify-between cursor-pointer p-3 bg-gray-950/50 rounded-xl border border-gray-800/50">
          <span className="text-gray-300 text-sm">اعلان‌های درون‌سایت</span>
          <input type="checkbox" className="accent-purple-600 w-5 h-5 rounded cursor-pointer" defaultChecked />
        </label>
      </div>
    </div>
  );
}