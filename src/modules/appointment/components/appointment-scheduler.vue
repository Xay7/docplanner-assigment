<template>
  <v-container max-width="1000">
    <appointment-header
      :doctor="appointmentStore.doctor"
      :is-loading="appointmentStore.isUpdateBookSlotPending"
      :scheduled-appointment-date="appointmentStore.scheduledAppointmentDate"
    />
    <div class="pt-6" />
    <appointment-calendar @click-date="onCalendarDateClick" />
    <div class="pt-6" />
    <appointment-footer
      v-if="appointmentStore.proposedAppointmentDate"
      :is-loading="appointmentStore.isUpdateBookSlotPending"
      :proposed-appointment-date="appointmentStore.proposedAppointmentDate"
    />
  </v-container>
</template>
<script setup lang="ts">
import AppointmentHeader from "@/modules/appointment/components/appointment-header.vue";
import AppointmentCalendar from "@/modules/appointment/components/appointment-calendar.vue";
import AppointmentFooter from "@/modules/appointment/components/appointment-footer.vue";
import { useAppointmentStore } from "@/modules/appointment/stores/appointment-store";
import type { AppointmentDateRange } from "@/modules/appointment/types/appoinments-api";

const appointmentStore = useAppointmentStore();

const onCalendarDateClick = (date: AppointmentDateRange) => {
  appointmentStore.proposedAppointmentDate = date;
};
</script>
