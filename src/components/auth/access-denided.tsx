import { Shield, ShieldAlert, ShieldIcon } from "lucide-react";
import Link from "next/link";

export default function AccessDenided() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex gap-3">
        <div className="bg-red-300 rounded-full p-2">
          <ShieldAlert className=" size-8 text-red-700" />
        </div>
        <div>
          <h1 className="text-lg font-semibold">You do not have access to this page</h1>
          <p>
            Go back to<Link href={"/"} className="underline"> home </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
