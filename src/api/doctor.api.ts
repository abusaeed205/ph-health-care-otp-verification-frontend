
import apiClient from "@/lib/apiclient";
import { ApiResponse, verifyAccountPayload } from "@/types";
import { ApproveDoctorPayload, Doctor, DoctorApplicationPayload, DoctorParams, PublicDoctorParams, PublicDoctorProfile } from "@/types/doctor.type";
import { Schedule } from "@/types/schedule.type";


export function applyAsDoctor(payload: DoctorApplicationPayload) {
    // এইটা আমরা পাঠাবো Api তে নিচে
  const formData = new FormData();

//   ফর্মের ডাটা গুলো এখানে stringify করে দিচ্ছি 
  formData.append("data", JSON.stringify(payload.data));
  formData.append("resume", payload.resume);

  for (const file of payload.additionalFiles) {
    formData.append("additionalFiles", file);
  }

  return apiClient("/doctor/apply-as-doctor", {
    method: "POST",
    body: formData, // উপর থেকে পাচ্ছি
  });
}

export function verifyDoctorAccount(payload:verifyAccountPayload){
  return apiClient("/doctor/apply-as-doctor/verify-email",{
    method:"POST",
    body:payload
  })
}

// Doctor[] টাইপ এটা 
export function getAllDoctors(params:DoctorParams){
  return apiClient<ApiResponse<Doctor[]>>("/doctor/all-doctors",{
    // params:{verificationStatus:"PENDING"} Data get করার পর এটা দিয়ে Status পরিবর্তন করবো
    params,
  })
}


export function approveDoctor(payload:ApproveDoctorPayload){
  return apiClient("/doctor/approve-doctor",{
    method:"POST",
    body:payload
  })
}


export function getAllPublicDoctors(params: PublicDoctorParams) {
  return apiClient<ApiResponse<PublicDoctorProfile[]>>(
    "/doctor/public/all-doctors",
    {
      params,
    },
  );
}

export function getPublicDoctorProfile(doctorId: string) {
  return apiClient<ApiResponse<PublicDoctorProfile>>(
    `/doctor/public/${doctorId}`,
  );
}

export function getTodayScheduleByDoctor(params: {
  doctorId?: string;
  page?: number;
  limit?: number;
}) {
  return apiClient<ApiResponse<Schedule[]>>("/schedule/todays-schedule", {
    params,
  });
}


// এর পর এখান থেকে hooks এ যাবো  