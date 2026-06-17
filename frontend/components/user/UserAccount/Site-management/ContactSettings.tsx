"use client";

interface ContactItem {
  label: string; // نام (مثلا: تلفن)
  value: string; // مقدار (مثلا: 0912...)
}

interface ContactSettingsProps {
  items: ContactItem[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, key: keyof ContactItem, value: string) => void;
}

export default function ContactSettings({ items, onAdd, onRemove, onUpdate }: ContactSettingsProps) {
  return (
    <div className="md:col-span-2 p-6 rounded-2xl border border-custom-gray-200 dark:border-white/5 bg-light/50 dark:bg-dark-700/30 backdrop-blur-sm space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-white/5">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">راه‌های ارتباطی</h3>
        <button type="button" onClick={onAdd} className="text-xs px-4 py-2 rounded-xl bg-violet-600 text-white hover:bg-violet-700 font-medium transition-all shadow-sm active:scale-95">
          + افزودن جدید
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-center py-4 text-gray-400 dark:text-gray-500">هیچ راه ارتباطی ثبت نشده است.</p>
      ) : (
        <div className="space-y-3">
          {items.map((contact, index) => (
            <div key={index} className="flex gap-3 items-center group animate-fadeIn">
              <input
                type="text"
                value={contact.label}
                onChange={(e) => onUpdate(index, "label", e.target.value)}
                placeholder="عنوان (تلفن)..."
                className="input-info w-32! text-sm!"
              />
              <input
                type="text"
                value={contact.value}
                onChange={(e) => onUpdate(index, "value", e.target.value)}
                placeholder="مقدار یا شماره..."
                className="input-info"
              />
              <button type="button" onClick={() => onRemove(index)} className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all text-sm">
                حذف
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}