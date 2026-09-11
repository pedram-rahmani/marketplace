export default function ActiveSessions() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-purple-300">دستگاه‌های متصل به حساب</h2>
      <div className="space-y-4 max-w-xl">
        <div className="flex items-center justify-between p-4 bg-gray-950/50 rounded-xl border border-gray-800">
          <div>
            <p className="text-sm font-medium text-white">Windows • Chrome (همین دستگاه)</p>
            <p className="text-xs text-gray-400 mt-1">آخرین فعالیت: هم اکنون</p>
          </div>
          <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">فعال</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-950/50 rounded-xl border border-gray-800">
          <div>
            <p className="text-sm font-medium text-white">iPhone • Safari</p>
            <p className="text-xs text-gray-400 mt-1">آخرین فعالیت: ۲ روز پیش</p>
          </div>
          <button className="text-xs text-red-400 hover:text-red-300 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20 transition cursor-pointer">
            خروج از دستگاه
          </button>
        </div>
      </div>
    </div>
  );
}