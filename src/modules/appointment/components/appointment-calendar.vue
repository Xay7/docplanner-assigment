<template>
  <v-container class="bg-white rounded-lg">
    <v-row :class="['bg-white', 'rounded-lg', 'pa-4', 'container', { expanded: isExpanded }]">
      <v-row justify="center" no-gutters>
        <v-btn variant="text" :icon="mdiChevronLeft" :disabled="currentDate <= DateTime.now()" @click="goBackward">
        </v-btn>
        <v-col v-for="day in weekdays" :key="day.date.toString()" class="d-flex flex-column align-center text-center">
          <span class="font-weight-bold">{{ day.dayName }}</span>
          <span>{{ day.dayDate }}</span>
          <div v-if="data && doesWeekdayDateExists(day.date) && !isPending" class="pt-4">
            <appointment-calendar-time-column
              :dates="data[day.date.toFormat('yyyy-MM-dd')]"
              @click-date="onTimeClick"
            />
          </div>
          <div v-if="isPending">
            <v-skeleton-loader v-for="index in 6" :key="index" type="list-item-two-line" />
          </div>
        </v-col>
        <v-btn variant="text" :icon="mdiChevronRight" @click="goForward" />
      </v-row>
    </v-row>
    <v-row align="center" justify="center" class="text-primary">
      <v-col align="center" justify="center">
        <v-divider />
        <span>See more hours</span>
        <v-btn :icon="expandIcon" variant="flat" @click="isExpanded = !isExpanded" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { useWeeklySlotsQuery } from "@/modules/appointment/composables/queries/use-weekly-slots-query";
import { useWeekdays } from "@/modules/appointment/composables/use-weekdays";
import { DateTime } from "luxon";
import { computed, ref } from "vue";
import { mdiChevronLeft, mdiChevronRight, mdiChevronDown, mdiChevronUp } from "@mdi/js";
import AppointmentCalendarTimeColumn from "@/modules/appointment/components/appointment-calendar-time-column.vue";
import type { AppointmentDateRange, GetWeeklySlotsRequest } from "@/modules/appointment/types/appoinments-api";

const { weekdays, goForward, goBackward, currentDate, lastDay } = useWeekdays();
const isExpanded = ref(false);

const emit = defineEmits<{
  clickDate: [date: AppointmentDateRange];
}>();

const request = computed<GetWeeklySlotsRequest>(() => {
  return {
    from: currentDate.value,
    to: lastDay.value,
  };
});
const { data, isPending } = useWeeklySlotsQuery(request);

const expandIcon = computed(() => {
  return isExpanded.value ? mdiChevronUp : mdiChevronDown;
});

const doesWeekdayDateExists = (date: DateTime) => {
  if (!data.value) return false;
  if (data.value[date.toFormat("yyyy-MM-dd")]) return true;
  return false;
};

const onTimeClick = (date: AppointmentDateRange) => {
  emit("clickDate", date);
};
</script>
<style scoped>
.container {
  max-height: 400px;
  overflow: hidden;
}

.container.expanded {
  max-height: 100%;
}
</style>
