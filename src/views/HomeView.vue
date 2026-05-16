<script setup lang="ts">
import { RouterLink } from "vue-router";
import SubjectCard from "../components/SubjectCard.vue";
import AssignmentCard from "../components/AssignmentCard.vue";
import CalendarWidget from "../components/CalendarWidget.vue";
import {
  PhTrophy,
  PhPalette,
  PhBrain,
  PhLightning,
  PhPlay,
  PhRocket,
  PhStar,
  PhCloud,
  PhFlask,
  PhBookOpen,
} from "@phosphor-icons/vue";
</script>

<template>
  <div class="space-y-8 pt-4 md:pt-6">
    <!-- Hero Banner for Kids -->
    <div
      v-motion-slide-bottom
      class="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-sky-200/50 border-4 border-b-8 border-sky-200 relative overflow-hidden group/hero"
    >
      <!-- Floating shapes -->
      <div
        class="absolute -right-10 -top-10 text-9xl opacity-40 -rotate-12 select-none group-hover/hero:rotate-12 transition-transform duration-700 text-sky-500"
      >
        <PhRocket weight="fill" />
      </div>
      <div
        class="absolute right-32 md:right-40 bottom-10 text-6xl opacity-50 rotate-45 select-none group-hover/hero:-rotate-45 transition-transform duration-700 text-yellow-400"
      >
        <PhStar weight="fill" />
      </div>
      <div
        class="absolute left-1/2 top-10 text-4xl opacity-50 rotate-12 select-none group-hover/hero:-rotate-45 transition-transform duration-1000 -translate-x-1/2 text-pink-300"
      >
        <PhCloud weight="fill" />
      </div>

      <h1
        class="text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight mb-4 relative z-10 w-3/4"
      >
        Hi, Sanvi! Ready for an
        <span
          class="inline-block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500"
          >Adventure?</span
        >
      </h1>
      <p
        class="text-slate-500 font-bold text-lg md:text-2xl max-w-2xl leading-relaxed relative z-10 mt-4"
      >
        You're doing great! You have <span class="text-pink-500">3 new games</span> and a
        <span class="text-blue-500">math puzzle</span> waiting for you today.
      </p>

      <div class="mt-8 relative z-10 inline-block">
        <RouterLink
          to="/games"
          class="bg-gradient-to-r inline-flex items-center gap-2 from-pink-400 to-orange-400 text-white text-xl font-extrabold px-8 py-4 rounded-full shadow-[0_8px_0_#db2777] active:shadow-[0_0px_0_#db2777] active:translate-y-2 hover:scale-105 transition-all border-4 border-white cursor-pointer outline-none"
        >
          Start Playing!
          <PhPlay weight="duotone" />
        </RouterLink>
      </div>
    </div>

    <!-- Quick Stats / Badges -->
    <h2 v-motion-fade-visible class="text-3xl font-extrabold text-slate-700 ml-4 mt-12 mb-6">My Super Badges!</h2>
    <div v-motion-slide-visible-bottom class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-2">
      <!-- Card 1 -->
      <div
        class="bg-white p-6 rounded-2xl shadow-md border-4 border-yellow-200 flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform cursor-pointer group"
      >
        <div
          class="text-6xl mb-4 drop-shadow-md text-yellow-500 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300"
        >
          <PhTrophy weight="duotone" />
        </div>
        <h3 class="font-extrabold text-xl text-slate-700">Star Student</h3>
        <p class="text-yellow-700 font-extrabold bg-yellow-100 px-4 py-4 rounded-full mt-3 text-sm">
          Level 3
        </p>
      </div>

      <!-- Card 2 -->
      <div
        class="bg-white p-6 rounded-2xl shadow-md border-4 border-green-200 flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform cursor-pointer group"
      >
        <div
          class="text-6xl mb-4 drop-shadow-md text-green-500 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300"
        >
          <PhPalette weight="duotone" />
        </div>
        <h3 class="font-extrabold text-xl text-slate-700">Super Artist</h3>
        <p class="text-green-700 font-extrabold bg-green-100 px-4 py-4 rounded-full mt-3 text-sm">
          Level 2
        </p>
      </div>

      <!-- Card 3 -->
      <div
        class="bg-white p-6 rounded-2xl shadow-md border-4 border-blue-200 flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform cursor-pointer group"
      >
        <div
          class="text-6xl mb-4 drop-shadow-md text-blue-500 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300"
        >
          <PhBrain weight="duotone" />
        </div>
        <h3 class="font-extrabold text-xl text-slate-700">Math Genius</h3>
        <p class="text-blue-700 font-extrabold bg-blue-100 px-4 py-4 rounded-full mt-3 text-sm">
          Level 4
        </p>
      </div>

      <!-- Card 4 -->
      <div
        class="bg-white p-6 rounded-2xl shadow-md border-4 border-purple-200 flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform cursor-pointer group"
      >
        <div
          class="text-6xl mb-4 drop-shadow-md text-purple-500 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300"
        >
          <PhLightning weight="duotone" />
        </div>
        <h3 class="font-extrabold text-xl text-slate-700">Fast Reader</h3>
        <p class="text-purple-700 font-extrabold bg-purple-100 px-4 py-4 rounded-full mt-3 text-sm">
          Level 5
        </p>
      </div>
    </div>

    <!-- My Subjects Row -->
    <h2 v-motion-fade-visible class="text-3xl font-extrabold text-slate-700 ml-4 mt-12 mb-6">My Classes Today</h2>
    <div v-motion-slide-visible-bottom class="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
      <SubjectCard title="Science Safari" :progress="60" color="indigo">
        <template #icon>
          <div class="text-6xl drop-shadow-sm pb-2 text-indigo-500">
            <PhFlask weight="duotone" />
          </div>
        </template>
      </SubjectCard>

      <SubjectCard title="Story Time" :progress="85" color="rose">
        <template #icon>
          <div class="text-6xl drop-shadow-sm pb-2 text-rose-500">
            <PhBookOpen weight="duotone" />
          </div>
        </template>
      </SubjectCard>
    </div>

    <!-- Assignments & Schedule Row -->
    <h2 v-motion-fade-visible class="text-3xl font-extrabold text-slate-700 ml-4 mt-12 mb-6">My Quests & Schedule!</h2>
    <div v-motion-slide-visible-bottom class="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2 pb-10">
      <!-- Quests Column -->
      <div class="lg:col-span-2 space-y-4">
        <AssignmentCard title="Math Magic Worksheet" subtitle="Due Today!" reward="15" isNew>
          <template #icon>
            <div class="text-4xl drop-shadow-sm pb-1">🧮</div>
          </template>
        </AssignmentCard>

        <AssignmentCard title="Draw your hero" subtitle="Art class project" reward="10">
          <template #icon>
            <div class="text-4xl drop-shadow-sm pb-1">🖍️</div>
          </template>
        </AssignmentCard>
      </div>

      <!-- Calendar Widget Column -->
      <div class="lg:col-span-1">
        <CalendarWidget />
      </div>
    </div>
  </div>
</template>
