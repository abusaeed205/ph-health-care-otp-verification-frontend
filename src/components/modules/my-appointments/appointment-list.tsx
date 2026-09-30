"use client";

import { format } from "date-fns";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { useGetMyAppointments } from "@/hooks/appointment.hook";

export default function AppointmentList() {
  const params = useSearchParams();
  const paymentStatus = params.get("status");
  const { data, error, isPending } = useGetMyAppointments({
    page: 1,
    limit: 100,
  });
  const appointments = data?.data || [];

  if (isPending) {
    return <p>Loading appointments...</p>;
  }

  if (error) {
    return <p>Could not load appointments. Please try again.</p>;
  }

  return (
    <div className="space-y-4">
      {paymentStatus === "success" && (
        <div className="rounded-md border border-green-200 bg-green-50 p-4">
          <h1 className="font-semibold text-green-900">Payment successful</h1>
          <p className="text-sm text-green-800">
            Your appointment confirmation is shown below.
          </p>
        </div>
      )}

      {(paymentStatus === "failure" ||
        paymentStatus === "failue" ||
        paymentStatus === "cancel") && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4">
          <h1 className="font-semibold text-red-900">
            {paymentStatus === "cancel"
              ? "Payment cancelled"
              : "Payment failed"}
          </h1>
          <p className="text-sm text-red-800">
            No payment confirmation was received. Please try again.
          </p>
        </div>
      )}

      {appointments.length === 0 ? (
        <p>There are no appointments.</p>
      ) : (
        appointments.map((appointment) => {
          const doctor = appointment.doctor;
          const schedule = appointment.schedule;

          return (
            <div key={appointment.id} className="rounded-md border p-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="min-w-48">
                  <p className="font-medium">{doctor?.name ?? "Doctor"}</p>
                  <p className="text-sm text-muted-foreground">
                    {doctor?.specialization ?? "Healthcare specialist"}
                  </p>
                </div>
                <span className="rounded-full bg-muted px-3 py-1 text-sm">
                  {appointment.status}
                </span>
                {appointment.payment && (
                  <span className="rounded-full bg-muted px-3 py-1 text-sm">
                    Payment: {appointment.payment.status}
                  </span>
                )}
                {appointment.status === "CONFIRMED" &&
                  schedule?.meetingLink && (
                    <Link
                      className={buttonVariants({ className: "ml-auto" })}
                      href={schedule.meetingLink}
                    >
                      Join
                    </Link>
                  )}
              </div>
              {schedule && (
                <p className="mt-3 text-sm text-muted-foreground">
                  {format(new Date(schedule.startDateTime), "PPP p")}
                  {appointment.joiningTime &&
                    ` - Join at ${format(new Date(appointment.joiningTime), "p")}`}
                </p>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
