export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 w-full lg:hidden bg-white/80 dark:bg-dark-700 backdrop-blur-md border-b border-gray-100 dark:border-white/5 z-50">
      <div className="flex items-center justify-between h-14 px-4 w-full text-gray-800 dark:text-white">
        {/* Left - Menu */}
        <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Center - Logo */}
        <span className="font-extrabold text-sm tracking-wider text-violet-600 dark:text-cyan-400">
          MARKETPLACE
        </span>

        {/* Right - Search */}
        <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </header>
  );
}