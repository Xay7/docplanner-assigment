<template>
  <v-row>
    <v-col class="font-weight-bold text-h6">Reschedule</v-col>
  </v-row>
  <v-row no-gutters>
    <v-col class="text-h6">Click the button to confirm</v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-btn block color="primary" :loading="isLoading" @click="handleClick">
        {{ readableProposedAppointmentDate }}
      </v-btn>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { useAppointmentStore } from "@/modules/appointment/stores/appointment-store";
import type { AppointmentDateRange } from "@/modules/appointment/types/appoinments-api";
import { DateTime } from "luxon";
import { computed } from "vue";

const props = defineProps<{
  isLoading: boolean;
  proposedAppointmentDate: AppointmentDateRange;
}>();

const appointmentStore = useAppointmentStore();

const handleClick = async () => {
  try {
    await appointmentStore.updateBookSlot();
  } catch (error) {
    // Show some info to the user, try again, send logs
  }
};

const readableProposedAppointmentDate = computed(() => {
  return `On ${props.proposedAppointmentDate?.Start.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY, { locale: "en" })}`;
});
</script>
