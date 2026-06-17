interface PageHeaderProps {
  title: string;
  buttonText?: string;
  onButtonClick?: () => void;
  isLoading?: boolean;
  formId?: string;
}

export default function PageHeader({ title, buttonText, onButtonClick, isLoading, formId }: PageHeaderProps) {
  return (
    <div className="sticky top-20 z-20 bg-white/70 dark:bg-dark-900/70 backdrop-blur-xl py-3 px-6 mb-8 border border-gray-200 dark:border-white/10 rounded-2xl shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] flex items-center justify-between transition-all">
      <h1 className="text-lg font-extrabold text-gray-800 dark:text-white flex items-center gap-2">
        <span className="w-1.5 h-6 bg-violet-600 rounded-full"></span> {title}
      </h1>
      
      {buttonText && (
        <button 
          type={formId ? "submit" : "button"} 
          form={formId} 
          onClick={onButtonClick} 
          disabled={isLoading} 
          className="px-6 py-2.5 rounded-xl bg-violet-600 text-white font-bold text-sm hover:bg-violet-700 disabled:opacity-50"
        >
          {isLoading ? "در حال ذخیره..." : buttonText}
        </button>
      )}
    </div>
  );
}