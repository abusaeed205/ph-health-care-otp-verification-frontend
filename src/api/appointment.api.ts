import apiClient from "@/lib/apiclient";
import { ApiResponse } from "@/types";
import { BookAppointmentPayload, BookAppointmentResponse } from "@/types/appointment.type";


export function bookAppointment(payload: BookAppointmentPayload) {
  return apiClient<ApiResponse<BookAppointmentResponse>>(
    "/appointment/book-appointment",
    {
      method: "POST",
      body: payload,
    },
  );
}

export function getMyAppointments(params: { page?: number; limit?: number }) {
  return apiClient("/appointment/my-appointments", {
    params,
  });
}
