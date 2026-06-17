"use client";

export default function ProductRow({ product, onDelete, onEdit, onShowDetails, type, className }: any) {
  if (type === "desktop") {
    return (
      <tr className={`border-b border-custom-gray-400/20 hover:bg-custom-gray-300/20 transition-colors ${className}`}>
        <td className="py-4 px-4 text-xs">{product.id}</td>
        <td className="py-2 px-4">
          <img src={`${process.env.NEXT_PUBLIC_ASSET_URL}/storage/${product.img}`} className="w-12 h-12 rounded-lg object-cover" alt={product.name} />
        </td>
        <td className="py-4 px-4 font-semibold">{product.name}</td>
        <td className="py-4 px-4">{Number(product.price).toLocaleString()}</td>
        <td className="py-4 px-4">{product.discount ? `${product.discount}%` : '-'}</td>
        <td className="py-4 px-4 flex justify-center gap-2 text-sm [&>button]:px-3 [&>button]:py-1 [&>button]:rounded-lg [&>button]:transition-colors">
          <button onClick={() => onEdit(product)} className="text-violet-600 bg-violet-50 hover:bg-violet-100">ویرایش</button>
          <button onClick={() => onDelete(product.id)} className="text-ui-red-600 bg-red-50 hover:bg-red-100">حذف</button>
        </td>
      </tr>
    );
  }

  // mobile
  return (
    <div className={`p-4 bg-white border border-gray-100 rounded-2xl shadow-sm ${className}`}>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <img src={`${process.env.NEXT_PUBLIC_ASSET_URL}/storage/${product.img}`} className="w-12 h-12 rounded-xl object-cover" />
          <p className="font-bold">{product.name}</p>
        </div>
      </div>
      <div className="flex justify-between mt-3 bg-gray-50 p-2 rounded-lg">
        <p className="text-sm">قیمت: {Number(product.price).toLocaleString()}</p>
        <div className="flex gap-2">
          <button onClick={() => onEdit(product)} className="text-xs text-violet-600">ویرایش</button>
          <button onClick={() => onDelete(product.id)} className="text-xs text-red-600">حذف</button>
        </div>
      </div>
    </div>
  );
}