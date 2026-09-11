"use client";

import { useEffect, useState } from "react";
import { usePermissions } from "@/store/hooks/usePermissions";

interface UserRowProps {
  user: any;
  permissions: {
    canDelete: boolean;
    canPromote: boolean;
    canDemote: boolean;
    canEditUser: boolean;
  };
  onDelete: (id: number) => void;
  onEdit: (user: any) => void;
  onPromote: (id: number) => void;
  onDemote: (id: number) => void;
  type: "desktop" | "mobile";
  className?: string;
}

export default function UserRow({
  user,
  permissions,
  onDelete,
  onEdit,
  onPromote,
  onDemote,
  type,
  className,
}: UserRowProps) {
  const { canEditUser, canDeleteUser, isAuthorized } = usePermissions();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const canEdit = isAuthorized && permissions.canEditUser && canEditUser(user);
  const canDelete =
    isAuthorized && permissions.canDelete && canDeleteUser(user);

  const getStatusClass = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  };

  const getRoleClass = (role: string) => {
    if (role === "admin")
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    if (role === "co-admin")
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    return "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400";
  };

  const Icons = {
    ArrowUp: () => (
      <svg viewBox="0 0 24 24" className="size-3.5!" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
      </svg>
    ),
    ArrowDown: () => (
      <svg viewBox="0 0 24 24" className="size-3.5!" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
      </svg>
    ),
    Edit: () => (
      <svg className="size-3.5!" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    Trash: () => (
      <svg className="size-3.5!" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  };

  if (type === "desktop") {
    return (
      <tr
        className={`border-b border-gray-100 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-dark-700/30 transition-all ${className}`}
      >
        <td className="px-6 py-4">
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 dark:text-white">
              {user.name}
            </span>
            <span className="text-[10px] text-gray-400 mt-0.5">
              عضویت:{" "}
              {user.created_at
                ? new Date(user.created_at).toLocaleDateString("fa-IR")
                : "-"}
            </span>
          </div>
        </td>
        <td className="px-6 py-4 text-gray-500">{user.email}</td>
        <td className="px-6 py-4 text-gray-500">{user.phone || "-"}</td>
        <td className="px-6 py-4">
          <div>
            <span className="text-[10px] text-gray-400 mt-0.5">
              {user.updated_at
                ? new Date(user.updated_at).toLocaleDateString("fa-IR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "-"}
            </span>
          </div>
        </td>
        <td className="px-6 py-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${getRoleClass(user.role)}`}
          >
            {user.role.toUpperCase()}
          </span>
        </td>
        <td className="px-6 py-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusClass(user.status)}`}
          >
            {user.status === "active" ? "فعال" : "مسدود"}
          </span>
        </td>
        <td className="px-6 py-4 text-sm whitespace-nowrap">
          <div className="flex gap-2.5 items-center">
            {/* promote */}
            {permissions.canPromote && user.role === "user" && (
              <button
                onClick={() => onPromote(user.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-400/10 dark:to-teal-400/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all duration-200 active:scale-95 shadow-sm"
              >
                <Icons.ArrowUp /> ارتقا
              </button>
            )}
            {/* demote - استایل اختصاصی کهربایی/نارنجی ملایم */}
            {permissions.canDemote && user.role === "co-admin" && (
              <button
                onClick={() => onDemote(user.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all duration-200 active:scale-95 shadow-sm"
              >
                <Icons.ArrowDown /> تنزل
              </button>
            )}
            {/* edit */}
            {isAuthorized && permissions.canEditUser && canEditUser(user) && (
              <button
                onClick={() => onEdit(user)}
                className="btn-edit"
              >
                <Icons.Edit /> ویرایش
              </button>
            )}

            {/* delete */}
            {isAuthorized && permissions.canDelete && canDeleteUser(user) && (
              <button
                onClick={() => onDelete(user.id)}
                className="btn-delete"
              >
                <Icons.Trash /> حذف
              </button>
            )}
          </div>
        </td>
      </tr>
    );
  }

  // Mobile Version
  return (
    <div
      className={`p-4 bg-white dark:bg-dark-800 border border-gray-100 dark:border-white/5 rounded-2xl shadow-sm space-y-4 ${className}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold text-gray-900 dark:text-white">{user.name}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">
            عضویت:{" "}
            {user.created_at
              ? new Date(user.created_at).toLocaleDateString("fa-IR")
              : "-"}
          </p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-[10px] font-bold ${getRoleClass(user.role)}`}
        >
          {user.role.toUpperCase()}
        </span>
      </div>

      <div className="space-y-1 text-sm text-gray-500">
        <p>ایمیل: {user.email}</p>
        <p>تلفن: {user.phone || "-"}</p>
        <p className="text-[10px] text-gray-400 pt-1">
          آخرین فعالیت:{" "}
          {user.updated_at
            ? new Date(user.updated_at).toLocaleDateString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-"}
        </p>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-white/5">
        <span
          className={`px-2 py-1 rounded-full text-[10px] font-bold ${getStatusClass(user.status)}`}
        >
          {user.status === "active" ? "فعال" : "مسدود"}
        </span>

        <div className="flex gap-2.5 items-center">
          {/* promote */}
          {permissions.canPromote && user.role === "user" && (
            <button
              onClick={() => onPromote(user.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-400/10 dark:to-teal-400/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all duration-200 active:scale-95 shadow-sm"
            >
              <Icons.ArrowUp /> ارتقا
            </button>
          )}
          {/* demote - استایل اختصاصی کهربایی/نارنجی ملایم */}
          {permissions.canDemote && user.role === "co-admin" && (
            <button
              onClick={() => onDemote(user.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all duration-200 active:scale-95 shadow-sm"
            >
              <Icons.ArrowDown /> تنزل
            </button>
          )}
          {/* edit */}
          {permissions.canEditUser && canEditUser(user) && (
            <button onClick={() => onEdit(user)} className="btn-edit">
              <Icons.Edit /> ویرایش
            </button>
          )}
          {/* delete */}
          {permissions.canDelete && canDeleteUser(user) && (
            <button
              onClick={() => onDelete(user.id)}
              className="btn-delete"
            >
              <Icons.Trash /> حذف
            </button>
          )}

          {!permissions.canDelete && user.role === "admin" && (
            <span className="text-gray-400 text-[10px]">ادمین کل</span>
          )}
        </div>
      </div>
    </div>
  );
}