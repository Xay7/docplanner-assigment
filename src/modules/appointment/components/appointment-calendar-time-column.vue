<template>
  <template v-for="dateRange in dates" :key="dateRange.Start">
    <v-row>
      <v-col>
        <v-btn
          size="small"
          :disabled="dateRange.Taken"
          color="primary"
          :variant="dateRange.Taken ? 'text' : 'elevated'"
          @click="handleButtonClick(dateRange)"
        >
          <span
            :class="{
              'text-grey': dateRange.Taken,
              'text-decoration-line-through': dateRange.Taken,
            }"
          >
            {{ dateRange.Start.toFormat("HH:mm") }}
          </span>
        </v-btn>
      </v-col>
    </v-row>
  </template>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { AppointmentDateRange } from "@/modules/appointment/types/appoinments-api";

defineProps<{ dates: AppointmentDateRange[] }>();

const emit = defineEmits<{
  clickDate: [date: AppointmentDateRange];
}>();

const handleButtonClick = async (dateRange: AppointmentDateRange) => {
  emit("clickDate", dateRange);
};
</script>
