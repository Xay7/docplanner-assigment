<template>
  <v-row>
    <v-col class="text-h6">
      Confirm your appointment with <span class="font-weight-bold">{{ doctorFullName }}</span>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-card class="rounded-lg pa-4 d-flex align-center" variant="flat">
        <v-icon v-if="!isLoading" :icon="mdiCalendar" />
        <v-progress-circular v-else indeterminate color="primary" size="small" />
        <span
          :class="[
            'font-weight-bold ml-2',
            {
              'text-decoration-line-through': isLoading,
            },
          ]"
        >
          {{ readableScheduledAppointmentDate }}</span
        >
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-h6 font-weight-bold"> Did you have an unexpected situation? </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col class="text-h6"> You can change the appoinment for when it suits you better </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { mdiCalendar } from "@mdi/js";
import type { Doctor } from "@/modules/appointment/types/appoinments";
import { DateTime } from "luxon";

const props = defineProps<{
  doctor: Doctor;
  scheduledAppointmentDate: DateTime;
  isLoading: boolean;
}>();

const doctorFullName = computed(() => {
  return `Dr. ${props.doctor.name} ${props.doctor.surname}`;
});

const readableScheduledAppointmentDate = computed(() => {
  // Strictly "en" for demo purpose
  return `On ${props.scheduledAppointmentDate.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY, { locale: "en" })}`;
});
</script>
