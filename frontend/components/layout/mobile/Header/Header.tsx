export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 md:hidden 
  backdrop-blur-md bg-white/80 dark:bg-dark-700
  border-b border-light dark:border-dark-600 
  z-50"
    >
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left - Menu */}
        <button className="text-text-on-light dark:text-text-on-dark">☰</button>

        {/* Center - Logo */}
        <span className="font-bold text-base tracking-wide">MARKETPLACE</span>

        {/* Right - Search */}
        <button className="text-text-on-light dark:text-text-on-dark">
          {" "}
          <svg viewBox="0 0 24 24" className="size-5!">
            <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" />
            <path d="M21.707 21.707a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.414l3.5 3.5a1 1 0 0 1 0 1.414Z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
