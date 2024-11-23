import { ref, computed } from "vue";
import { DateTime } from "luxon";
import { useDisplay } from "vuetify";

export function useWeekdays() {
  const currentDate = ref(DateTime.now());
  const { mobile } = useDisplay();

  const amountOfDays = computed(() => (mobile.value ? 3 : 7));

  const weekdays = computed(() => {
    const days = Array.from({ length: amountOfDays.value }, (_, index) => {
      const day = currentDate.value.plus({ days: index });
      const dayName = getDayName(day);
      const dayDate = day.toFormat("dd MMM");

      return {
        dayName,
        dayDate,
        date: day,
      };
    });

    return days;
  });

  const getDayName = (day: DateTime) => {
    if (day.hasSame(currentDate.value, "day")) return "Today";
    if (day.hasSame(currentDate.value.plus({ days: 1 }), "day")) return "Tomorrow";
    return day.toFormat("ccc");
  };

  const goForward = () => {
    currentDate.value = currentDate.value.plus({ days: amountOfDays.value });
  };

  const goBackward = () => {
    const today = DateTime.now();
    if (currentDate.value > today) {
      currentDate.value = currentDate.value.minus({ days: amountOfDays.value });
    }
  };

  const lastDay = computed(() => currentDate.value.plus({ week: 1 }));

  return {
    weekdays,
    goForward,
    goBackward,
    currentDate,
    lastDay,
  };
}

interface Weekday {
  dayName: string;
  dayDate: string;
  date: DateTime;
}
