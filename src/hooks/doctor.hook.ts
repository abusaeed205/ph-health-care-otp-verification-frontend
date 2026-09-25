
import { applyAsDoctor, approveDoctor, getAllDoctors, getAllPublicDoctors, getPublicDoctorProfile, getTodayScheduleByDoctor, verifyDoctorAccount } from "@/api";
import { DoctorParams, PublicDoctorParams } from "@/types";
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

export function useApplyAsDoctor() {
  return useMutation({
    mutationFn: applyAsDoctor,// form api
  });
}


export function useVerifyDoctorAccount(){
  return useMutation({
    mutationFn:verifyDoctorAccount
  })
}

export function useGetAllDoctors(params:DoctorParams){
  return useQuery({
    queryKey:["doctors",params],
    queryFn:()=> getAllDoctors(params) //form api
  })
}

export function useGetAllPublicDoctors(params: PublicDoctorParams) {
  return useQuery({
    queryKey: ["doctor", "public", params],
    queryFn: () => getAllPublicDoctors(params),
  });
}


export function useSuspenseGetPublicDoctors(params: PublicDoctorParams) {
  return useSuspenseQuery({
    queryKey: ["doctors", "public", params],
    queryFn: () => getAllPublicDoctors(params),
  });
}

export function usePublicDoctorProfile(doctorId: string) {
  return useQuery({
    queryKey: ["doctor", "public", doctorId],
    queryFn: () => getPublicDoctorProfile(doctorId),
    enabled: !!doctorId,
  });
}



export function useSuspenseGetAllDoctors(params:DoctorParams){
  return useSuspenseQuery({
    queryKey:["doctors",params],
    queryFn:()=> getAllDoctors(params) //form api
  })
}

export function useApproveDoctor(){
  const queryClient=useQueryClient()
  return useMutation({
    mutationFn:approveDoctor, //form api
    onSuccess:()=>{
      // Approval সফল হলে doctor list-এর পুরনো cached data মুছে দিয়ে সর্বশেষ data fetch করাবে
      queryClient.invalidateQueries({queryKey:["doctors"]})
    }
  })
}


export function useGetTodayScheduleByDoctor(params: {
  doctorId?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["schedule", params],
    queryFn: () => getTodayScheduleByDoctor(params),
  });
}
