"use client";

export default function ProductRow({ product, onDelete, onEdit, permissions, className }: any) {
  
  const btnBase = "text-[11px] py-1 px-3 rounded-lg font-medium transition-colors";
  
  const editClass = permissions.canEdit 
    ? `${btnBase} bg-violet-100 text-violet-600 hover:bg-violet-200` 
    : `${btnBase} bg-gray-100 text-gray-400 opacity-50 cursor-default`;

  const deleteClass = permissions.canDelete 
    ? `${btnBase} bg-red-100 text-red-600 hover:bg-red-200` 
    : `${btnBase} bg-gray-100 text-gray-400 opacity-50 cursor-default`;

  return (
    <div className={`p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 mt-2 flex flex-col md:flex-row md:items-center gap-4 bg-white dark:bg-dark-900/20 ${className}`}>
      
      {/* img/name */}
      <div className="flex items-center gap-4 flex-1">
        <img 
          src={`${process.env.NEXT_PUBLIC_ASSET_URL}/storage/${product.img}`} 
          className="w-14 h-14 rounded-xl object-cover" 
          alt={product.name} 
        />
        <div className="flex flex-col">
          <p className="font-bold text-sm">{product.name}</p>
          <span className="text-[10px] text-gray-400 font-mono">ID: {product.id}</span>
        </div>
      </div>

      {/* price/discount */}
      <div className="flex justify-between md:justify-end gap-6 md:flex-1">
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-gray-400">قیمت</span>
          <p className="text-sm font-semibold">{Number(product.price).toLocaleString()}</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-gray-400">تخفیف</span>
          <p className={`text-sm font-bold ${product.discount ? "text-red-500" : "text-gray-300"}`}>
            {product.discount ? `${product.discount}%` : '-'}
          </p>
        </div>
      </div>

      {/* btns  */}
      <div className="flex gap-2 md:justify-end md:flex-1">
        <button onClick={() => onEdit(product)} disabled={!permissions.canEdit} className={editClass}>ویرایش</button>
        <button onClick={() => onDelete(product.id)} disabled={!permissions.canDelete} className={deleteClass}>حذف</button>
      </div>
    </div>
  );
}