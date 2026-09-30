import apiClient from "@/lib/apiclient";
import type { ApiResponse } from "@/types";
import type {
  Appointment,
  BookAppointmentPayload,
  BookAppointmentResponse,
} from "@/types/appointment.type";

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
  return apiClient<ApiResponse<Appointment[]>>("/appointment/my-appointments", {
    params,
  });
}
