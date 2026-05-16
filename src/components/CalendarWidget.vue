<script setup lang="ts">
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNext,
  CalendarPrev,
  CalendarRoot,
} from "reka-ui";
import { PhCaretLeft, PhCaretRight, PhCalendarBlank } from "@phosphor-icons/vue";
import { today, getLocalTimeZone, type DateValue } from "@internationalized/date";

// Custom assignment markers for specific days (mocking today + 2, today + 5)
const currentDate = today(getLocalTimeZone());
const assignmentDates = [
  currentDate.add({ days: 2 }),
  currentDate.add({ days: 5 }),
];

function hasAssignment(date: DateValue) {
  return assignmentDates.some((d) => d.compare(date) === 0);
}
</script>

<template>
  <div
    class="bg-white rounded-2xl p-6 shadow-md border-4 border-violet-200 h-full flex flex-col group hover:-translate-y-1 transition-transform"
  >
    <div class="flex items-center gap-3 mb-6">
      <div
        class="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center border-4 border-violet-200 group-hover:rotate-12 transition-transform"
      >
        <PhCalendarBlank weight="duotone" class="text-violet-600 text-2xl" />
      </div>
      <h3 class="font-extrabold text-2xl text-slate-700">My Calendar</h3>
    </div>

    <!-- Reka UI Headless Calendar Component -->
    <CalendarRoot v-slot="{ weekDays, grid }" class="flex-1 w-full">
      <CalendarHeader
        class="flex items-center justify-between mb-4 bg-violet-50 rounded-2xl p-2 border-2 border-violet-100"
      >
        <CalendarPrev
          class="w-10 h-10 flex items-center justify-center bg-white rounded-xl border-2 border-violet-200 text-violet-700 hover:bg-violet-100 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer text-xl font-bold"
        >
          <PhCaretLeft weight="bold" />
        </CalendarPrev>
        <CalendarHeading class="font-extrabold text-violet-800 text-lg mx-2" />
        <CalendarNext
          class="w-10 h-10 flex items-center justify-center bg-white rounded-xl border-2 border-violet-200 text-violet-700 hover:bg-violet-100 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer text-xl font-bold"
        >
          <PhCaretRight weight="bold" />
        </CalendarNext>
      </CalendarHeader>

      <div class="flex flex-col gap-4">
        <CalendarGrid
          v-for="month in grid"
          :key="month.value.toString()"
          class="w-full border-collapse"
        >
          <CalendarGridHead>
            <CalendarGridRow class="flex w-full justify-between mb-2 px-1">
              <CalendarHeadCell
                v-for="day in weekDays"
                :key="day"
                class="w-10 text-center font-extrabold text-violet-400 text-sm"
              >
                {{ day.slice(0, 2) }}
              </CalendarHeadCell>
            </CalendarGridRow>
          </CalendarGridHead>
          <CalendarGridBody>
            <CalendarGridRow
              v-for="(weekDates, index) in month.rows"
              :key="`weekDate-${index}`"
              class="flex w-full justify-between mt-2 px-1"
            >
              <CalendarCell
                v-for="weekDate in weekDates"
                :key="weekDate.toString()"
                :date="weekDate"
                class="relative text-center"
              >
                <!-- Using data attributes automatically applied by Reka UI -->
                <CalendarCellTrigger
                  :day="weekDate"
                  :month="month.value"
                  class="relative w-10 h-10 flex items-center justify-center rounded-xl font-extrabold text-slate-600 transition-all cursor-pointer hover:bg-violet-100 hover:text-violet-700 border-2 border-transparent data-[selected]:bg-violet-500 data-[selected]:text-white data-[selected]:border-violet-600 data-[selected]:shadow-[0_4px_0_#7c3aed] data-[today]:border-violet-300 data-[today]:bg-violet-50 data-[disabled]:opacity-30 data-[disabled]:cursor-not-allowed active:translate-y-1"
                >
                  <span class="mb-0.5">{{ weekDate.day }}</span>
                  <div
                    v-if="hasAssignment(weekDate)"
                    class="absolute bottom-1 w-1.5 h-1.5 bg-orange-500 rounded-full shadow-sm"
                  ></div>
                </CalendarCellTrigger>
              </CalendarCell>
            </CalendarGridRow>
          </CalendarGridBody>
        </CalendarGrid>
      </div>
    </CalendarRoot>
  </div>
</template>
