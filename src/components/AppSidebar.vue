<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import {
  PhStar,
  PhBooks,
  PhGameController,
  PhTrophy,
  PhBalloon,
  PhCaretRight,
  PhCaretLeft,
  PhCat,
} from "@phosphor-icons/vue";

const isCollapsed = ref(false);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<template>
  <aside
    :class="[
      isCollapsed ? 'w-28' : 'w-72',
      'bg-white text-slate-700 flex  gap-3 flex-col shrink-0 shadow-[8px_0_30px_rgba(0,0,0,0.06)] relative z-30 transition-all duration-300 rounded-[2rem] border-4 border-b-8 border-r-8 border-purple-200 hidden md:flex',
    ]"
  >
    <!-- Decorative floating element -->
    <div
      class="absolute -top-6 -left-4 text-5xl opacity-80 rotate-12 select-none group-hover:-rotate-12 transition-transform text-red-400"
    >
      <PhBalloon weight="fill" />
    </div>

    <!-- Sidebar Header -->
    <div
      class="h-24 flex items-center justify-between px-4 border-b-4 border-dashed border-purple-100 shrink-0 relative z-10 w-full overflow-hidden"
    >
      <RouterLink to="/" class="flex items-center gap-3 overflow-hidden ml-2" v-if="!isCollapsed">
        <PhStar weight="fill" class="text-yellow-400 text-4xl drop-shadow-md pb-1 shrink-0" />
        <span
          class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 tracking-widest uppercase"
          >Bodhi</span
        >
      </RouterLink>
      <RouterLink to="/" class="mx-auto" v-else>
        <PhStar weight="fill" class="text-yellow-400 text-4xl drop-shadow-md pb-1 shrink-0" />
      </RouterLink>
    </div>

    <!-- Toggle Button (Absolute over the border) -->
    <button
      @click="toggleSidebar"
      class="absolute -right-5 top-12 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:bg-purple-600 transition-all z-40 font-extrabold text-xl border-4 border-white cursor-pointer active:scale-95"
    >
      <PhCaretRight weight="bold" v-if="isCollapsed" />
      <PhCaretLeft weight="bold" v-else />
    </button>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-6 px-4 space-y-4 relative z-10 overflow-x-hidden">
      <!-- 1. Books -->
      <RouterLink class="" to="/" v-slot="{ isActive }">
        <div
          class="flex items-center transition-all group cursor-pointer border-4 mb-3"
          :class="[
            isCollapsed
              ? 'justify-center mx-auto w-16 h-16 rounded-[1.5rem]'
              : 'gap-4 px-3 py-4 rounded-3xl w-full',
            isActive
              ? 'bg-blue-100/80 text-blue-700 border-blue-400 shadow-sm'
              : 'border-transparent hover:bg-blue-50',
          ]"
        >
          <PhBooks
            weight="duotone"
            class="text-4xl group-hover:scale-125 group-hover:-rotate-12 transition-transform drop-shadow-sm shrink-0"
            :class="isActive ? 'text-blue-600' : 'text-blue-500'"
          />
          <span v-if="!isCollapsed" class="font-extrabold text-xl select-none whitespace-nowrap"
            >My Subjects</span
          >
        </div>
      </RouterLink>

      <!-- 2. Games -->
      <RouterLink class="" to="/games" v-slot="{ isActive }">
        <div
          class="flex items-center transition-all group cursor-pointer border-4 mb-3"
          :class="[
            isCollapsed
              ? 'justify-center mx-auto w-16 h-16 rounded-[1.5rem]'
              : 'gap-4 px-3 py-4 rounded-[1.5rem] w-full',
            isActive
              ? 'bg-pink-100/80 text-pink-700 border-pink-400 shadow-sm'
              : 'border-transparent hover:bg-pink-50',
          ]"
        >
          <PhGameController
            weight="duotone"
            class="text-4xl group-hover:scale-125 group-hover:rotate-12 transition-transform drop-shadow-sm shrink-0"
            :class="isActive ? 'text-pink-600' : 'text-pink-500'"
          />
          <span v-if="!isCollapsed" class="font-extrabold text-xl select-none whitespace-nowrap"
            >Fun Games</span
          >
        </div>
      </RouterLink>

      <!-- 3. Rewards -->
      <RouterLink class="" to="/rewards" v-slot="{ isActive }">
        <div
          class="flex items-center transition-all group cursor-pointer border-4 mb-3"
          :class="[
            isCollapsed
              ? 'justify-center mx-auto w-16 h-16 rounded-[1.5rem]'
              : 'gap-4 px-3 py-4 rounded-[1.5rem] w-full',
            isActive
              ? 'bg-yellow-100/80 text-yellow-700 border-yellow-400 shadow-sm'
              : 'border-transparent hover:bg-yellow-50',
          ]"
        >
          <PhTrophy
            weight="duotone"
            class="text-4xl group-hover:scale-125 group-hover:-rotate-12 transition-transform drop-shadow-sm shrink-0"
            :class="isActive ? 'text-yellow-600' : 'text-yellow-500'"
          />
          <span v-if="!isCollapsed" class="font-extrabold text-xl select-none whitespace-nowrap"
            >My Rewards</span
          >
        </div>
      </RouterLink>
    </nav>

    <!-- Sidebar Footer User Profile -->
    <div
      class="p-4 border-t-4 border-dashed border-purple-100 shrink-0 relative z-10 w-full overflow-hidden flex flex-col items-center justify-center transition-all"
    >
      <RouterLink
        to="/profile"
        class="flex items-center transition-all cursor-pointer border-4 outline-none hover:-translate-y-1 active:translate-y-1 bg-orange-50 hover:bg-orange-100 border-orange-200"
        :class="[
          isCollapsed
            ? 'justify-center w-16 h-16 rounded-full p-0 mx-auto'
            : 'gap-3 p-3 rounded-[1.5rem] w-full',
        ]"
      >
        <div
          class="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border-2 border-orange-300 text-3xl pb-1"
        >
          <PhCat weight="duotone" class="text-orange-500 text-4xl mt-1" />
        </div>
        <div class="flex-1 min-w-0" v-if="!isCollapsed">
          <p class="text-xl font-extrabold text-orange-600 truncate">Sanvi!</p>
          <p class="text-sm font-bold text-orange-400 truncate tracking-widest uppercase">
            Level 5 Hero
          </p>
        </div>
      </RouterLink>
    </div>
  </aside>
</template>
