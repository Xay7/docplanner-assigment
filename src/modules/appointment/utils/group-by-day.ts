import type { GetWeeklySlotsResponse, AppointmentDateRangeGrouped } from "@/modules/appointment/types/appoinments-api";
import { DateTime } from "luxon";

export function groupAppointmentsByDay(
  appointments: GetWeeklySlotsResponse[]
): AppointmentDateRangeGrouped{
  return appointments.reduce<AppointmentDateRangeGrouped>(
    (acc, appointment) => {
      const startDate = DateTime.fromISO(appointment.Start);
      const endDate = DateTime.fromISO(appointment.End);

      const date = startDate.toISODate();
      
      if (date == null) {
        throw new Error("ISO Date is invalid");
      }

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push({
        ...appointment, 
        Start: startDate,
        End: endDate,
      });

      return acc;
    },
    {}
  );
}
