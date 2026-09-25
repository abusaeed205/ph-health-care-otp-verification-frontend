import { useEffect, useState } from "react";

// User search box-এ যখন সর্চ করবে
export default function useDebounce<T>(value: T, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// প্রতিটি লেখা সঙ্গে সঙ্গে API call করবে না।
// User লেখা থামানোর 500ms পর API call হবে।
// User আবার লিখলে আগের timer বাতিল হবে।
// ফলে অপ্রয়োজনীয় অনেক API request হবে না।