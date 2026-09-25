"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorApprovalTable from "./doctor-approval-table";
import { ChangeEvent, Suspense, useState } from "react";
import DoctorApprovalTableLoading from "./doctor-approval-table-loading";
import { DoctorParams, DoctorVerificationStatus } from "@/types";
import { Input } from "@/components/ui/input";
import DoctorApprovalSheet from "./doctor-approval-sheet";
import useDebounce from "@/hooks/debounce.hook";

const verificationStatus: ["ALL" | DoctorVerificationStatus, string][] = [
  ["APPROVED", "Approved"],
  ["PANDING", "Pending"],
  ["REJECTED", "Rejected"],
  ["ALL", "All"],
];

//এটা UI তে দেখতে Dashboard admin/approve-doctor এর সাথে যুক্ত করবো
export default function DoctorReviewTabs() {
  const [tab, setTab] = useState<"ALL" | DoctorVerificationStatus>("ALL");
  const [selectedId, setSelectedID] = useState(""); // for popops modal
  const [searchInput, setSearchInput] = useState(""); //সার্চ এর জন্য
    const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchInput); //search

  const handelSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
    setPage(1) // যখন সার্চ করবে তখন পেইজ 1টা হবে
  }

  // নিচের ডাটা গুলো আমরা props করে api তে পাঠাবো
  const queryParams: DoctorParams = {
    page: page,
    limit: 10,
    // tab এর মধ্যে all থাকলে {} দিচ্ছি অন্যথায় Tab কে দিচ্ছি
    ...(tab === "ALL" ? {} : { verificationStatus: tab }),
    ...(debouncedSearch?{searchTerm: debouncedSearch}:{}), //search
  };

  return (
    <>
      <div className="flex justify-between my-5">
        <div>
          {/* সার্চ এর জন্য */}
          <Input
            onChange={(e) =>handelSearch(e) }
            type="search"
            placeholder="search by name or email"
          />
        </div>
        <Tabs value={tab} onValueChange={(value) => setTab(value)}>
          <TabsList>
            {/* উপরের ভেরিফিকেশন Status কে Map করছি */}
            {verificationStatus.map(([value, label]) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      {/* Loading */}
      <Suspense fallback={<DoctorApprovalTableLoading />}>
        {/* Ui এর Tabile এর ডাটা এটা থেকে আসতেছে*/}
        <DoctorApprovalTable {...queryParams} handelReview={setSelectedID} handelPageChange={setPage} />
      </Suspense>

      {/* popops modal কম্পন্টে এটা (doctor-approval-table থেকে useStateজমা হওয়া ID যাচ্ছে ) */}
      <DoctorApprovalSheet
        selectedId={selectedId}
        onClose={() => setSelectedID("")}
        {...queryParams}
      />
    </>
  );
}
