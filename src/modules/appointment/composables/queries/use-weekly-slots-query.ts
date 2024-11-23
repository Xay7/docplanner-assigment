import {
  useAppointmentClient,
} from "@/modules/appointment/clients/use-appointment-client";
import type { GetWeeklySlotsRequest } from "@/modules/appointment/types/appoinments-api";
import { useQuery } from "@tanstack/vue-query";
import type { Ref } from "vue";

const key = "weekly-slots-query";

type ReactiveRequest = Ref<GetWeeklySlotsRequest>;
export function getWeeklySlotsQueryKey(req?: ReactiveRequest) {
  if (req === undefined) return [key]

  return [key, req];
}

export const useWeeklySlotsQuery = (req: ReactiveRequest) => {
  const { GetWeeklySlots } = useAppointmentClient();

  return useQuery({
    queryKey: getWeeklySlotsQueryKey(req),
    queryFn: () => GetWeeklySlots(req.value),
  });
};
