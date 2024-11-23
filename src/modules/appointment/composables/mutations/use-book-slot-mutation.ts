import { queryClient } from "@/core/plugins/query-client";
import {
  useAppointmentClient,
  type PostBookSlotRequest,
} from "@/modules/appointment/clients/use-appointment-client";
import { getWeeklySlotsQueryKey } from "@/modules/appointment/composables/queries/use-weekly-slots-query";
import { useMutation } from "@tanstack/vue-query";
import type { Ref } from "vue";
type ReactiveRequest = Ref<PostBookSlotRequest>;

export const useBookSlotMutation = (req: ReactiveRequest) => {
  const { PostBookSlot } = useAppointmentClient();

  return useMutation({
    mutationFn: () => PostBookSlot(req.value),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: getWeeklySlotsQueryKey()})
    }
  });
};
