<script setup lang="ts">
import {
  PhCat,
  PhGraduationCap,
  PhUser,
  PhPhone,
  PhMapTrifold,
  PhHouse,
  PhPencilSimple,
} from "@phosphor-icons/vue";
import { ref } from "vue";

// Ideally this data would come from a Pinia Store/API, mocking locally for the UI!
const kidProfile = ref({
  name: "Sanvi!",
  standard: "First Grade (Class 1)",
  motherData: {
    name: "Tanaya Hawaldar",
    phone: "+91 98765-43210",
  },
  fatherData: {
    name: "Shubh Hawaldar",
    phone: "+91 98765-12345",
  },
  address: "A-102, Sunshine Apartments,\nMarathahalli, Bengaluru,\nKarnataka 560037",
});
</script>

<template>
  <div class="px-2 md:px-6 py-6 space-y-8 max-w-5xl mx-auto h-full w-full font-sans">
    <!-- Hero Header Component -->
    <div
      class="relative bg-white rounded-4xl p-8 md:p-12 shadow-xl border-4 border-orange-200 mt-16 mb-8 flex flex-col items-center text-center group"
      v-motion-slide-bottom
    >
      <div class="absolute top-4 right-4 md:top-6 md:right-6">
        <button
          class="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center border-2 border-orange-200 hover:bg-orange-500 hover:text-white transition-all shadow-sm outline-none active:scale-95"
        >
          <PhPencilSimple weight="bold" class="text-2xl" />
        </button>
      </div>

      <!-- Avatar Profile Pic safely centered in flex flow -->
      <div
        class="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center border-4 border-orange-300 shadow-lg group-hover:-translate-y-2 transition-transform duration-300 -mt-20 mb-4 relative z-10"
        v-motion-pop
      >
        <PhCat :size="64" weight="fill" class="text-orange-500 mt-1" />
      </div>

      <div class="space-y-3">
        <h1 class="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-4">
          {{ kidProfile.name }}
        </h1>
        <div class="flex items-center justify-center">
          <p
            class="inline-flex items-center gap-2 px-6 py-3 bg-orange-100 text-orange-600 rounded-full font-extrabold text-lg border-2 border-orange-200 shadow-sm cursor-default"
          >
            <PhGraduationCap weight="fill" class="text-2xl" /> {{ kidProfile.standard }}
          </p>
        </div>
      </div>
    </div>

    <!-- Info Grids -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      <!-- Parents Contact Block -->
      <div
        class="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-md border-4 border-blue-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
        v-motion-slide-bottom
        :delay="100"
      >
        <div class="flex items-center gap-3 mb-4">
          <PhUser :size="24" color="#3b82f6" weight="fill" />
          <h2 class="text-2xl font-bold text-blue-500 tracking-tight">Parents Info</h2>
        </div>

        <div class="space-y-6">
          <!-- Mother -->
          <div class="flex items-center gap-5">
            <div
              class="p-6 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center shrink-0 border-2 border-pink-200 shadow-sm text-3xl"
            >
              <PhUser weight="fill" />
            </div>
            <div class="w-full p-4">
              <p class="text-pink-400 font-bold uppercase tracking-widest text-xs mb-1">Mother</p>
              <p class="text-xl md:text-2xl font-extrabold text-slate-700 leading-none mb-2">
                {{ kidProfile.motherData.name }}
              </p>
              <p class="text-slate-500 font-bold flex items-center gap-2 py-3 rounded-lg w-max">
                <PhPhone weight="fill" class="text-pink-400" />
                {{ kidProfile.motherData.phone }}
              </p>
            </div>
          </div>

          <!-- Divider -->
          <div class="h-1 w-full border-b-4 border-dashed border-slate-100 rounded-full"></div>

          <!-- Father -->
          <div class="flex items-center gap-5">
            <div
              class="p-6 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center shrink-0 border-2 border-blue-200 shadow-sm text-3xl"
            >
              <PhUser weight="fill" />
            </div>
            <div class="w-full p-4">
              <p class="text-blue-400 font-bold uppercase tracking-widest text-xs mb-1">Father</p>
              <p class="text-xl md:text-2xl font-extrabold text-slate-700 leading-none mb-2">
                {{ kidProfile.fatherData.name }}
              </p>
              <p class="text-slate-500 font-bold flex items-center gap-2 py-3 rounded-lg w-max">
                <PhPhone weight="fill" class="text-blue-400" />
                {{ kidProfile.fatherData.phone }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Address & Emergency Contact Block -->
      <div
        class="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-md border-4 border-green-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col"
        v-motion-slide-bottom
        :delay="200"
      >
        <div class="flex items-center gap-3 mb-4">
          <PhMapTrifold :size="24" color="#10b981" weight="fill" />
          <h2 class="text-2xl font-bold text-green-500 tracking-tight">Home Details</h2>
        </div>

        <div class="flex items-center gap-5">
          <div
            class="p-6 bg-green-100 text-green-500 rounded-full flex items-center justify-center shrink-0 border-2 border-green-200 shadow-sm text-3xl"
          >
            <PhHouse weight="fill" />
          </div>
          <div class="w-full p-4">
            <p class="text-green-500 font-bold uppercase tracking-widest text-sm">Home Address</p>
            <div class="bg-green-50/50 rounded-3xl border-green-100/50">
              <p
                class="text-lg md:text-xl font-bold text-slate-600 leading-relaxed whitespace-pre-wrap"
              >
                {{ kidProfile.address }}
              </p>
            </div>
          </div>
        </div>
        <div class="h-1 w-full border-b-4 border-dashed border-slate-100 rounded-full"></div>

        <div class="mt-4">
          <div class="flex items-center gap-4 bg-red-50 p-4 md:p-5 border-red-100">
            <div
              class="p-4 bg-red-100 text-red-500 rounded-full flex items-center justify-center shrink-0 border-2 border-red-200 shadow-sm text-3xl"
            >
              <PhPhone weight="fill" />
            </div>
            <div>
              <p class="text-red-400 font-extrabold uppercase tracking-widest text-xs">
                Primary Emergency Form
              </p>
              <p class="text-2xl font-black text-red-500 tracking-tight mt-0.5">
                {{ kidProfile.motherData.phone }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
