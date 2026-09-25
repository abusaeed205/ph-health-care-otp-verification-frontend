"use client"
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


// এটা doctor-review-tabs এর সাথে যুক্ত


export default function DoctorApprovalTableLoading() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>License No.</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact No.</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        {/* এটা সম্পন্ন টা টেবিল থেকে কপি করা , তার পর রেনডম  একটা [] map করছি */}
        <TableBody>
          {[1,2,3].map((index) => (
            <TableRow key={index}>
              <TableCell colSpan={6}>
                <Skeleton className="h-5 w-100"></Skeleton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
