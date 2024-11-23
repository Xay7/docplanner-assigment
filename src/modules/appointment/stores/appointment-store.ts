import { useBookSlotMutation } from "@/modules/appointment/composables/mutations/use-book-slot-mutation";
import type { Doctor } from "@/modules/appointment/types/appoinments";
import type { AppointmentDateRange, Patient, PostBookSlotRequest } from "@/modules/appointment/types/appoinments-api";
import { DateTime } from "luxon"
import { defineStore } from "pinia"
import { shallowRef, computed, ref } from "vue"

const mockedDate = DateTime.fromObject({
    year: 2021,
    month: 5,
    day: 21,
    hour: 10,
    minute: 30
});

export const useAppointmentStore = defineStore('appointment-store', () => {
    const scheduledAppointmentDate = shallowRef<DateTime>(mockedDate);
    const proposedAppointmentDate = shallowRef<AppointmentDateRange | undefined>();
    const patient = ref<Patient>({
        Name: "Jonathan",
        SecondName: "Banks",
        Email: "coolestdoctor@docplanner.com",
        Phone: "123 456 789",
      });
      
      const doctor = ref<Doctor>({
        name: "Jonathan",
        surname: "Banks",
      });


    const bookSlotMutationRequest = computed<PostBookSlotRequest>(() => {
        return {
            Patient: patient.value,
            Comments: "hello world",
            Start: proposedAppointmentDate.value?.Start.toFormat("yyyy-LL-dd HH:mm:ss") as string,
            End: proposedAppointmentDate.value?.End.toFormat("yyyy-LL-dd HH:mm:ss") as string
        }
    })

    const { mutateAsync , isPending: isUpdateBookSlotPending } = useBookSlotMutation(bookSlotMutationRequest);


    const readableProposedAppointmentDate = computed(() => {
        return `On ${proposedAppointmentDate.value?.Start.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY, {locale: "en"})}`})

    const readableScheduledAppointmentDate = computed(() => {
        return `On ${scheduledAppointmentDate.value.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY, {locale: "en"})}`})

    function updateScheduledAppointmentDate(date: DateTime) {
        scheduledAppointmentDate.value = date;
    }

    function updateProposedAppointmentDate(date: AppointmentDateRange) {
        proposedAppointmentDate.value = date;
    }

    async function updateBookSlot() {
        await mutateAsync();
        if (proposedAppointmentDate.value?.Start) {
            scheduledAppointmentDate.value = proposedAppointmentDate.value?.Start
            proposedAppointmentDate.value = undefined;
        }
    }
  
    return { scheduledAppointmentDate, proposedAppointmentDate, updateScheduledAppointmentDate, updateProposedAppointmentDate, readableScheduledAppointmentDate, readableProposedAppointmentDate, patient, doctor, updateBookSlot, isUpdateBookSlotPending }
})