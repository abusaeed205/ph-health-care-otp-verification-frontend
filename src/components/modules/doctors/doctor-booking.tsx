"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useGetMe, useGetTodayScheduleByDoctor } from "@/hooks";
import { useBookAppointment } from "@/hooks/appointment.hook";
import type { Schedule } from "@/types/schedule.type";


import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BookingConfirmation {
  schedule: Schedule;
  paymentUrl: string;
}

export default function DoctorBooking({ doctorId }: { doctorId: string }) {
  const router = useRouter();


  const { data: me, isPending: mePending } = useGetMe(); //ইউজার লগইন করা আছে কিনা
  const { data, isPending, error } = useGetTodayScheduleByDoctor({ doctorId });//ডাক্তারের আজকের schedule/slot fetch করে
  const { mutate: book, isPending: bookingPending } = useBookAppointment(); //বুকিং API request চালানো হচ্ছে

  // ৪) সফল বুকিংয়ের পর payment dialog/URL store করার state
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(
    null,
  );

  // API response থেকে slot list বের করে array বানানো
  const schedules = data?.data ?? [];

  // ৫) Book Now button-এ click হলে এই function কাজ করে
  // - login না থাকলে login page-এ পাঠায়
  // - login থাকলে backend-এ booking request পাঠায়
  // - success হলে paymentUrl + selected schedule state-এ save করে
  const handleBooking = (schedule: Schedule) => {
    if (!mePending && !me?.data) {
      router.push("/login");
      return;
    }

    book(
      { scheduleId: schedule.id },
      {
        onSuccess: (res) => {
          console.log(res);
          setConfirmation({ paymentUrl: res.data.paymentUrl, schedule });
        },
      },
    );
  };

  // ৬) Loading state: slots fetch হওয়া পর্যন্ত spinner + skeleton show করা
  if (isPending) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Spinner />
          <span className="text-sm text-muted-foreground">
            Loading today&apos;s slots…
          </span>
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  // API call fail হলে userকে error message দেখাই
  if (error) {
    return (
      <p className="py-10 text-center text-muted-foreground">
        Could not load slots. Please try again.
      </p>
    );
  }

  // আজকের একটা slot-ও না থাকলে userকে informative message দিই
  if (schedules.length === 0) {
    return (
      <p className="py-10 text-center text-muted-foreground">
        No bookable slots today for this doctor. Try another day or doctor.
      </p>
    );
  }

  return (
    <>
      <div>
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="border rounded-md p-3 flex gap-5 items-center"
          >
            {/* eee সপ্তাহ দেখায়  */}
            <span>{format(schedule.startDateTime, "eeee")}</span>
            <span>{format(schedule.startDateTime, "PP")}</span>
            <span className="text-sm text-muted-foreground">
              Starts at {format(schedule.startDateTime, "p")}
            </span>
            <span className="text-sm text-muted-foreground">
              Ends at {format(schedule.endDateTime, "p")}
            </span>
            <Button className="ml-auto" onClick={() => handleBooking(schedule)}>
              {bookingPending ? "Booking..." : "Book Now"}
            </Button>
          </div>
        ))}
      </div>

      {/* Booking success-এ confirmation modal open হবে।
          এখানে payment URL-কে Pay Now-এ redirect করা হয়, আর “Pay Later” দিলে modal বন্ধ হয়। */}
      <Dialog
        open={!!confirmation}
        onOpenChange={(open) => {
          // modal close হলে confirmation state reset করা হয়, যাতে আবার নতুন booking start করা যায়
          if (!open) {
            setConfirmation(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Successful</DialogTitle>
            <DialogDescription>
              Please pay within 10 minutes to keep your booking
            </DialogDescription>
            <span>
              Data and Time:
              {confirmation
                ? format(confirmation.schedule.startDateTime, "PPP") //date and time
                : "-"}
            </span>
          </DialogHeader>
          <DialogFooter>
            {/* user যদি পরে পেমেন্ট করতে চায়, modal বন্ধ করে দিতে পারবে */}
            <Button variant="outline" onClick={() => setConfirmation(null)}>
              Pay Later
            </Button>
            {/* payment URL-এ redirect করে পেমেন্ট শুরু করবে */}
            <Button
              onClick={() => {
                if (confirmation) {
                  window.location.href = confirmation.paymentUrl;
                }
              }}
            >
              Pay Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

//Payment failed => http://localhost:3000/dashboard/my-appointments?status=failue
