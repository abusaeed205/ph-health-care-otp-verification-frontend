
import VerifyAccountForm from "@/components/form/verify-accountForm";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function VerifyAccountPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex items-center gap-2">
              <span>PH Healthcare</span>
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {/* এখানে Suspense দিয়ে ভেরিফাই form যুক্ত করে দিছে যাতে build করতে Error না আসে */}
            <Suspense fallback={<p>Loading...</p>}>
              <VerifyAccountForm />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/doctor.jpg"
          alt="doctor"
          fill
          className="object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
