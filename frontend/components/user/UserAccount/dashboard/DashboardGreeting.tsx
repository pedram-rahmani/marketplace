interface DashboardGreetingProps {
  userName: string;
}

export default function DashboardGreeting({
  userName,
}: DashboardGreetingProps) {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800/80 p-6 md:p-8 rounded-3xl shadow-sm transition-all">
      <div className="absolute -left-20 -top-20 w-48 h-48 bg-violet-500/10 dark:bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-fuchsia-500/10 dark:bg-fuchsia-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-linier-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-xl font-bold shadow-sm shadow-violet-600/25 shrink-0">
            {userName ? userName.charAt(0).toUpperCase() : "کاربر"}
          </div>

          <div>
            <h1 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              سلام، {userName} عزیز! 👋
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-xs md:text-sm leading-relaxed">
              به پنل کاربری خود خوش آمدید. از اینجا می‌توانید وضعیت سفارش‌ها و
              حساب خود را مدیریت کنید.
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-xs font-medium text-gray-600 dark:text-gray-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          حساب کاربری فعال
        </div>
      </div>
    </div>
  );
}
