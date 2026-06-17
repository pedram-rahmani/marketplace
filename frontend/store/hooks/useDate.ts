import { useMemo } from "react";
import { toJalaali } from "jalaali-js";

const jalaaliMonths = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];

const jalaaliDays = [
  'شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'
];

/**
 * @param {string | Date} date - The input date (Gregorian).
 * @param {'long' | 'short'} format - The desired format ('long' => "پنجشنبه 27 دی 1403", 'short' => "1403/11/25").
 * @returns {string} - The formatted Jalaali date.
 */
const useDate = (date, format = "long") => {
  const jalaaliDate = useMemo(() => toJalaali(date), [date]);

  // Get the day of the week
  const gregorianDate = new Date(date);
  const dayOfWeek = gregorianDate.getDay();
  const dayOfWeekInJalaali = jalaaliDays[dayOfWeek];

  if (format === "long") {
    return `${dayOfWeekInJalaali} ${jalaaliDate.jd} ${
      jalaaliMonths[jalaaliDate.jm - 1]
    } ${jalaaliDate.jy}`;
  }

  if (format === "short") {
    return `${jalaaliDate.jy}-${String(jalaaliDate.jm).padStart(
      2,
      "0"
    )}-${String(jalaaliDate.jd).padStart(2, "0")}`;
  }

  return "";
};

export default useDate;
