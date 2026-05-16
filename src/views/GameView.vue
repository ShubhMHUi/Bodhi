<script setup lang="ts">
import GameCard from "../components/GameCard.vue";
import { PhHandGrabbing, PhCards, PhCalculator, PhSpeakerHigh, PhGameController, PhStar } from "@phosphor-icons/vue";
</script>

<template>
  <div class="space-y-8 pt-4 md:pt-6 pb-12">
    <!-- Hero Banner for Games -->
    <div
      class="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-purple-200/50 border-4 border-b-8 border-purple-200 relative overflow-hidden group/hero"
    >
      <!-- Floating shapes -->
      <div
        class="absolute -right-10 -top-10 text-9xl opacity-20 rotate-12 select-none group-hover/hero:-rotate-12 transition-transform duration-700 text-purple-500"
      >
        <PhGameController weight="fill" />
      </div>
      <div
        class="absolute right-40 bottom-10 text-6xl opacity-30 -rotate-12 select-none group-hover/hero:rotate-45 transition-transform duration-700 text-yellow-400"
      >
        <PhStar weight="fill" />
      </div>

      <h1
        class="text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight mb-4 relative z-10 w-full md:w-3/4"
      >
        It's time for
        <span
          class="inline-block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
        >
          Fun Games!
        </span>
      </h1>
      <p
        class="text-slate-500 font-bold text-lg md:text-2xl max-w-2xl leading-relaxed relative z-10 mt-4"
      >
        Choose an adventure below. Will you match pairs, solve funny math, or test your ears?
      </p>
    </div>

    <!-- Games Grid -->
    <h2 class="text-3xl font-extrabold text-slate-700 ml-4 mt-8 mb-6">Game Arcade ✨</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
      
      <!-- 1. Drag Games -->
      <RouterLink to="/games/drag-drop" class="block outline-none hover:transition-all active:scale-95 duration-200">
        <GameCard
          title="Drag & Drop"
          description="Grab the shapes and drop them into the correct matching holes to win stars!"
          color="pink"
        >
          <template #icon>
            <PhHandGrabbing weight="duotone" class="text-6xl" />
          </template>
        </GameCard>
      </RouterLink>

      <!-- 2. Match Pair -->
      <RouterLink to="/games/match" class="block outline-none hover:transition-all active:scale-95 duration-200">
        <GameCard
          title="Match the Pairs"
          description="Connect the perfect pair—match the image to the correct word to win!"
          color="blue"
        >
          <template #icon>
            <PhCards weight="duotone" class="text-6xl" />
          </template>
        </GameCard>
      </RouterLink>

      <!-- 3. Funny Math -->
      <RouterLink to="/games/math" class="block outline-none hover:transition-all active:scale-95 duration-200">
        <GameCard
          title="Funny Math"
          description="Pop the balloons with the right numbers to solve these silly math puzzles."
          color="yellow"
        >
          <template #icon>
            <PhCalculator weight="duotone" class="text-6xl" />
          </template>
        </GameCard>
      </RouterLink>

      <!-- 4. Audio Game Card -->
      <RouterLink to="/games/audio" class="block outline-none hover:transition-all active:scale-95 duration-200">
        <GameCard
          title="Listen & Guess"
          description="Listen carefully to the sounds and try to guess what animal it is!"
          color="green"
        >
          <template #icon>
            <PhSpeakerHigh weight="duotone" class="text-6xl" />
          </template>
        </GameCard>
      </RouterLink>

    </div>
  </div>
</template>
