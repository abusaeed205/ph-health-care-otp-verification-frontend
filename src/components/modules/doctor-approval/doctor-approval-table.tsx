import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "@/components/ui/table-pagination";
import { useSuspenseGetAllDoctors } from "@/hooks";
import type { DoctorParams } from "@/types";
import { SearchX } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface Props extends DoctorParams {
  handelPageChange: Dispatch<SetStateAction<number>>; //types
  handelReview: (doctorId: string) => void;
}

//01 doctor-review-tabs থেকে আসা Props এর মাধ্যমে রিছিব করছি
export default function DoctorApprovalTable({
  handelReview,
  handelPageChange,
  ...params
}: Props) {
  // 02 এবং সেই[Pending , Approve] Stotus api তে পাঠাচ্ছি
  const { data } = useSuspenseGetAllDoctors(params); // featch data

  
  const doctors = data?.data ?? [];
  const isEmpty = doctors.length === 0;

  return (
    <div className="border rounded-lg">
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
        <TableBody>
          {isEmpty ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={6}>
                <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
                  <span className="rounded-full bg-muted p-3">
                    <SearchX className="size-5 text-muted-foreground" />
                  </span>
                  <p className="font-medium">No doctors found</p>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    {params.searchTerm
                      ? `No results for "${params.searchTerm}". Try a different name or email.`
                      : "There are no doctors in this view yet."}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell className="font-medium">{doctor.name}</TableCell>
                <TableCell className="font-mono text-xs">
                  {doctor.licenseNumber}
                </TableCell>
                <TableCell
                  className="max-w-55 truncate text-muted-foreground"
                  title={doctor.email}
                >
                  {doctor.email}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {doctor.contactNumber ? doctor.contactNumber : "-"}
                </TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell className="text-right">
                  {doctor.user.emailVerified ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handelReview(doctor.id)}
                      disabled={doctor.verificationStatus !== "PANDING"}
                    >
                      Review
                    </Button>
                  ) : (
                    <Button disabled variant="outline" size="sm">
                      Not Verified
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {/* pagination  */}
      <div className="my-5">
        <TablePagination
          page={params.page ?? 0}
          totalPages={data?.meta?.totalPages ?? 0}
          handelPageChange={handelPageChange}
        />
      </div>
    </div>
  );
}

//এটা আমরা doctor-review-tabs এর মধ্যে কল করে দিবো
