import { groupAppointmentsByDay } from "@/modules/appointment/utils/group-by-day";
import type { GetWeeklySlotsRequest, AppointmentDateRangeGrouped, GetWeeklySlotsResponse, PostBookSlotRequest } from "@/modules/appointment/types/appoinments-api";
import axios from "axios";
import { DateTime } from "luxon";

const apiClient = axios.create({
  baseURL: "https://draliatest.azurewebsites.net/api/availability",
  headers: {
    "Content-Type": "application/json",
  },
});

export const useAppointmentClient = () => {
  return {
    async GetWeeklySlots(
      req: GetWeeklySlotsRequest
    ): Promise<AppointmentDateRangeGrouped> {
      // Have to do double request since API returns day for a mondays only
      const currentDate = req.from.startOf("week");
      const numberOfWeeks = Math.floor(req.to.diff(currentDate, "weeks").weeks) + 1;
      const mondays: string[] = Array.from(
        { length: numberOfWeeks },
        (_, index) => {
          return currentDate.plus({ weeks: index }).toFormat("yyyyMMdd");
        }
      );

      const promises: Promise<GetWeeklySlotsResponse[]>[] = mondays.map(
        (monday) =>
          apiClient
            .get(`/GetWeeklySlots/${monday}`)
            .then((response) => response.data)
      );

      const results = await Promise.all(promises);
      return groupAppointmentsByDay(results.flat());
    },

    async PostBookSlot(req: PostBookSlotRequest) {
      await apiClient.post("/BookSlot", req);
    },
  };
};

