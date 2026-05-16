<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { RouterLink } from "vue-router";
import {
  PhArrowLeft,
  PhSmiley,
  PhSmileySad,
  PhStar,
  PhChecks,
} from "@phosphor-icons/vue";

// Base Types
interface PairOption {
  id: number;
  emoji: string;
  word: string;
}

interface Level {
  id: number;
  pairs: PairOption[];
}

// Level Configuration
const levels: Level[] = [
  {
    id: 1,
    pairs: [
      { id: 1, emoji: "🐶", word: "Dog" },
      { id: 2, emoji: "🐱", word: "Cat" },
      { id: 3, emoji: "🍎", word: "Apple" },
    ],
  },
  {
    id: 2,
    pairs: [
      { id: 4, emoji: "🚌", word: "Bus" },
      { id: 5, emoji: "🚀", word: "Rocket" },
      { id: 6, emoji: "⚽", word: "Ball" },
      { id: 7, emoji: "🌞", word: "Sun" },
    ],
  },
  {
    id: 3,
    pairs: [
      { id: 8, emoji: "🍕", word: "Pizza" },
      { id: 9, emoji: "🌺", word: "Flower" },
      { id: 10, emoji: "🐘", word: "Elephant" },
      { id: 11, emoji: "🎸", word: "Guitar" },
      { id: 12, emoji: "👑", word: "Crown" },
    ],
  },
];

// Utility to shuffle an array
const shufflePattern = <T>(array: T[]): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// Game State
const currentLevelIndex = ref(0);
const currentLevel = computed(() => levels[currentLevelIndex.value]);

const leftSideElements = ref<PairOption[]>([]);
const rightSideElements = ref<PairOption[]>([]);

// Selection State Tracking
const selectedLeftId = ref<number | null>(null);
const selectedRightId = ref<number | null>(null);
const matchedPairIds = ref<number[]>([]);

// Visual Feedback State
const status = ref<"idle" | "evaluating" | "level_complete" | "game_won">("idle");
const isWrongFlash = ref(false);

// Initialize level arrays (shuffled independently)
const initLevel = () => {
  if (!currentLevel.value) return;
  leftSideElements.value = shufflePattern(currentLevel.value.pairs);
  rightSideElements.value = shufflePattern(currentLevel.value.pairs);
  
  // Safety rule: if identical layout occurs, reshuffle the right side (prevents mapping straight across 1-1-1-1)
  let attempt = 0;
  while (
    attempt < 5 &&
    leftSideElements.value.every((el, i) => el.id === rightSideElements.value[i].id)
  ) {
    rightSideElements.value = shufflePattern(currentLevel.value.pairs);
    attempt++;
  }

  selectedLeftId.value = null;
  selectedRightId.value = null;
  matchedPairIds.value = [];
  status.value = "idle";
};

// Start logic map on load
initLevel();

watch(currentLevelIndex, () => {
  initLevel();
});

// Interaction Methods
const selectLeft = (id: number) => {
  if (status.value !== "idle" || matchedPairIds.value.includes(id)) return;
  selectedLeftId.value = id;
  checkPairSequence();
};

const selectRight = (id: number) => {
  if (status.value !== "idle" || matchedPairIds.value.includes(id)) return;
  selectedRightId.value = id;
  checkPairSequence();
};

const checkPairSequence = () => {
  if (selectedLeftId.value !== null && selectedRightId.value !== null) {
    status.value = "evaluating";
    
    // They are a match!
    if (selectedLeftId.value === selectedRightId.value) {
      setTimeout(() => {
        matchedPairIds.value.push(selectedLeftId.value!);
        selectedLeftId.value = null;
        selectedRightId.value = null;
        
        checkWinCondition();
      }, 500); // Brief pause to show them glowing together
    } else {
      // They are wrong! Trigger shake
      isWrongFlash.value = true;
      setTimeout(() => {
        isWrongFlash.value = false;
        selectedLeftId.value = null;
        selectedRightId.value = null;
        status.value = "idle";
      }, 800);
    }
  }
};

const checkWinCondition = () => {
  if (matchedPairIds.value.length === currentLevel.value.pairs.length) {
    status.value = "level_complete";
    setTimeout(() => {
      // Advance to next level or win game
      if (currentLevelIndex.value < levels.length - 1) {
        currentLevelIndex.value++;
      } else {
        status.value = "game_won";
      }
    }, 2000);
  } else {
    status.value = "idle";
  }
};
</script>

<template>
  <div class="px-2 md:px-6 py-4 md:py-8 min-h-full flex flex-col font-sans relative">
    
    <!-- Top Navigation Bar -->
    <div class="flex items-center justify-between mb-8 z-10 relative">
      <RouterLink
        to="/games"
        class="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center text-slate-500 shadow-md border-4 border-slate-100 hover:border-blue-300 hover:text-blue-500 hover:scale-110 active:scale-95 transition-all text-2xl md:text-3xl"
      >
        <PhArrowLeft weight="bold" />
      </RouterLink>

      <!-- Level Tracker UI -->
      <div
        class="bg-white px-6 py-3 rounded-full shadow-md border-4 border-blue-200 flex items-center gap-3"
      >
        <div
          v-for="(lvl, index) in levels"
          :key="lvl.id"
          class="h-3 md:h-4 rounded-full transition-all duration-500"
          :class="[
            index === currentLevelIndex
              ? 'w-10 md:w-12 bg-blue-400 shadow-md'
              : index < currentLevelIndex
              ? 'w-3 md:w-4 bg-green-400'
              : 'w-3 md:w-4 bg-slate-200',
          ]"
        ></div>
      </div>
    </div>

    <!-- Gameplay Header -->
    <div class="text-center mb-8 relative z-10" v-motion-pop>
      <h1 class="text-4xl md:text-5xl font-black text-blue-500 tracking-tight mb-2 drop-shadow-sm">
        <template v-if="status === 'game_won'">You're a Star! 🌟</template>
        <template v-else>Match the Pairs!</template>
      </h1>
      <p class="text-blue-400 font-bold text-lg md:text-2xl" v-if="status !== 'game_won'">
        Tap an image and connect it to its exact word!
      </p>
    </div>

    <!-- Final Game Won Screen -->
    <div
      v-if="status === 'game_won'"
      class="flex-1 flex flex-col items-center justify-center relative z-10 max-w-2xl mx-auto w-full"
      v-motion-slide-bottom
    >
      <div class="bg-white p-12 rounded-[3xl] border-4 border-y-8 border-yellow-300 shadow-2xl text-center flex flex-col items-center w-full">
         <PhStar weight="fill" class="text-yellow-400 text-9xl mb-6 drop-shadow-lg animate-pulse" />
         <h2 class="text-4xl font-extrabold text-yellow-500 mb-8">All pairs matched perfectly!</h2>
         <RouterLink
            to="/games"
            class="bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-black text-2xl px-10 py-5 rounded-full border-4 border-white shadow-[0_8px_0_#4338ca] hover:-translate-y-1 active:translate-y-2 active:shadow-[0_0px_0_#4338ca] transition-all outline-none"
         >
            Play Again!
         </RouterLink>
      </div>
    </div>

    <!-- Game Board Layout -->
    <div
      v-else-if="currentLevel"
      class="max-w-6xl mx-auto w-full bg-slate-50/50 backdrop-blur-sm rounded-[2.5rem] p-6 md:p-12 shadow-xl border-4 border-blue-200 text-center flex relative"
      v-motion-slide-bottom
      :key="currentLevel.id"
    >
        
        <!-- Victory Pop Overlay Background Effects -->
        <div
          v-if="status === 'level_complete'"
          class="absolute inset-0 bg-white/40 backdrop-blur-md z-20 rounded-[2.25rem] transition-all duration-300"
        ></div>

        <!-- Failure Animation Sticker -->
        <div
          v-if="isWrongFlash"
          class="absolute inset-0 m-auto w-32 h-32 text-red-500 text-8xl md:text-9xl bg-white/90 backdrop-blur-sm rounded-full shadow-2xl flex items-center justify-center z-30 animate-shake pointer-events-none"
          v-motion-pop
        >
          <PhSmileySad weight="fill" />
        </div>

        <!-- Correct Sticker for completing the layout -->
        <div
          v-if="status === 'level_complete'"
          class="absolute inset-0 m-auto w-40 h-40 md:w-56 md:h-56 text-green-500 text-[10rem] md:text-[14rem] bg-white/90 backdrop-blur-sm rounded-full shadow-2xl border-8 border-green-400 flex items-center justify-center z-30"
          v-motion-pop
        >
          <PhSmiley weight="fill" />
        </div>

        <!-- Two Columns Container -->
        <div class="grid grid-cols-2 gap-12 md:gap-24 w-full relative z-10">
            
            <!-- LEFT COLUMN (IMAGES) -->
            <div class="flex flex-col gap-8">
                <button
                    v-for="item in leftSideElements"
                    :key="`left-${item.id}`"
                    @click="selectLeft(item.id)"
                    :disabled="matchedPairIds.includes(item.id) || status === 'evaluating'"
                    class="w-full h-24 md:h-36 rounded-3xl border-4 border-b-8 flex items-center justify-center text-4xl md:text-6xl font-black transition-all outline-none select-none drop-shadow-sm"
                    :class="[
                       matchedPairIds.includes(item.id)
                         ? 'bg-green-50 border-green-300 border-b-4 text-green-500 opacity-50 scale-95 pointer-events-none'
                         : selectedLeftId === item.id && status === 'evaluating' && selectedRightId !== null && selectedLeftId !== selectedRightId
                         ? 'bg-red-100 border-red-400 border-b-4 text-red-500 animate-shake'
                         : selectedLeftId === item.id
                         ? 'bg-blue-100 border-blue-400 border-b-4 text-blue-500 scale-95 shadow-inner'
                         : 'bg-white border-slate-200 hover:-translate-y-1 hover:border-slate-300 hover:bg-slate-50 cursor-pointer active:translate-y-1 active:border-b-4'
                    ]"
                >
                    <span v-if="matchedPairIds.includes(item.id)" class="absolute text-5xl opacity-40 z-0">
                       <PhChecks weight="bold"/>
                    </span>
                    <span class="relative z-10 filter drop-shadow-md">{{ item.emoji }}</span>
                </button>
            </div>

            <!-- RIGHT COLUMN (WORDS) -->
            <div class="flex flex-col gap-8">
                <button
                    v-for="item in rightSideElements"
                    :key="`right-${item.id}`"
                    @click="selectRight(item.id)"
                    :disabled="matchedPairIds.includes(item.id) || status === 'evaluating'"
                    class="w-full h-24 md:h-36 rounded-3xl border-4 border-b-8 flex items-center justify-center text-2xl md:text-4xl font-extrabold transition-all outline-none select-none drop-shadow-sm px-4"
                    :class="[
                       matchedPairIds.includes(item.id)
                         ? 'bg-green-50 border-green-300 border-b-4 text-green-500 opacity-50 scale-95 pointer-events-none'
                         : selectedRightId === item.id && status === 'evaluating' && selectedLeftId !== null && selectedLeftId !== selectedRightId
                         ? 'bg-red-100 border-red-400 border-b-4 text-red-500 animate-shake'
                         : selectedRightId === item.id
                         ? 'bg-blue-100 border-blue-400 border-b-4 text-blue-500 scale-95 shadow-inner'
                         : 'bg-white border-slate-200 hover:-translate-y-1 hover:border-slate-300 hover:bg-slate-50 cursor-pointer active:translate-y-1 active:border-b-4'
                    ]"
                >
                    <span v-if="matchedPairIds.includes(item.id)" class="absolute text-5xl opacity-20 z-0">
                       <PhChecks weight="bold"/>
                    </span>
                    <span class="relative z-10">{{ item.word }}</span>
                </button>
            </div>

        </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-8px) rotate(-3deg);
  }
  75% {
    transform: translateX(8px) rotate(3deg);
  }
}
.animate-shake {
  animation: shake 0.3s ease-in-out 2;
}
</style>
