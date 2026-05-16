<script setup lang="ts">
import { PhStar } from "@phosphor-icons/vue";

defineProps<{
  title: string;
  subtitle: string;
  reward: string;
  isNew?: boolean;
}>();
</script>

<template>
  <div
    class="bg-white border-4 border-slate-200 p-6 rounded-[2rem] flex items-center gap-4 hover:border-blue-300 hover:shadow-[0_8px_30px_rgba(37,99,235,0.1)] transition-all cursor-pointer group"
  >
    <div
      class="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center border-4 border-slate-100 group-hover:scale-110 group-hover:rotate-6 transition-transform relative shrink-0"
    >
      <slot name="icon">
        <span class="text-3xl">📝</span>
      </slot>
      <span
        v-if="isNew"
        class="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"
      ></span>
    </div>
    <div class="flex-1">
      <h4 class="font-extrabold text-lg text-slate-800">{{ title }}</h4>
      <p class="text-slate-500 font-bold text-sm">{{ subtitle }}</p>
    </div>
    <div
      class="shrink-0 bg-yellow-100 text-yellow-700 font-extrabold px-4 py-2 rounded-full border-2 border-yellow-300 flex items-center gap-2 shadow-sm"
    >
      +{{ reward }} <PhStar weight="fill" class="text-xl -mt-0.5 drop-shadow-sm text-yellow-500" />
    </div>
  </div>
</template>
