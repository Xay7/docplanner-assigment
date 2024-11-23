import { describe, it, expect, vi, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { DateTime } from "luxon";
import { useAppointmentStore } from "@/modules/appointment/stores/appointment-store";
import type { AppointmentDateRange } from "@/modules/appointment/types/appoinments-api";

vi.mock("@/modules/appointment/composables/mutations/useBookSlotMutation", () => ({
  useBookSlotMutation: vi.fn(() => ({
    mutateAsync: vi.fn().mockResolvedValue({}),
  })),
}));

describe("useAppointmentStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("Should book slot and update scheduled date", async () => {
    const store = useAppointmentStore();
    const newProposedDate: AppointmentDateRange = {
      Start: DateTime.fromObject({
        year: 2024,
        month: 1,
        day: 10,
        hour: 9,
        minute: 0,
      }),
      End: DateTime.fromObject({
        year: 2024,
        month: 1,
        day: 10,
        hour: 10,
        minute: 0,
      }),
      Taken: false
    };

    store.updateProposedAppointmentDate(newProposedDate);

    await store.updateBookSlot();

    expect(store.scheduledAppointmentDate.toISO()).toBe(
      newProposedDate.Start.toISO()
    );
  });
});
