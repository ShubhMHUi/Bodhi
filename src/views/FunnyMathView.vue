<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { PhArrowLeft, PhStar, PhSmiley, PhSmileySad, PhTrophy } from "@phosphor-icons/vue";

const router = useRouter();

type QuestionType = "counting" | "equation";

interface MathLevel {
  id: number;
  type: QuestionType;
  emoji?: string;
  count?: number;
  equation?: string;
  answer: number;
  options: number[];
}

const levels: MathLevel[] = [
  {
    id: 1,
    type: "counting",
    emoji: "🐶",
    count: 5,
    answer: 5,
    options: [3, 4, 5, 6],
  },

  {
    id: 2,
    type: "equation",
    equation: "3 + 4",
    answer: 7,
    options: [5, 6, 7, 8],
  },
  {
    id: 3,
    type: "counting",
    emoji: "🍎",
    count: 3,
    answer: 3,
    options: [1, 2, 3, 4],
  },
  {
    id: 4,
    type: "equation",
    equation: "10 - 2",
    answer: 8,
    options: [6, 7, 8, 9],
  },
  {
    id: 5,
    type: "counting",
    emoji: "🏆",
    count: 8,
    answer: 8,
    options: [3, 4, 8, 6],
  },
];

const currentLevelIndex = ref(0);
const currentLevel = computed(() => levels[currentLevelIndex.value] as MathLevel);
const showResults = ref(false);

const selectedAnswer = ref<number | null>(null);
const status = ref<"idle" | "correct" | "wrong">("idle");

function selectOption(option: number) {
  if (status.value === "correct") return;

  selectedAnswer.value = option;

  if (option === currentLevel.value.answer) {
    status.value = "correct";
  } else {
    status.value = "wrong";
    setTimeout(() => {
      // Only reset if they haven't rapidly clicked a correct one in the meantime
      if (status.value === "wrong") {
        selectedAnswer.value = null;
        status.value = "idle";
      }
    }, 800);
  }
}

function nextChallenge() {
  if (currentLevelIndex.value < levels.length - 1) {
    currentLevelIndex.value++;
    selectedAnswer.value = null;
    status.value = "idle";
  } else {
    showResults.value = true;
  }
}

function restartGame() {
  currentLevelIndex.value = 0;
  selectedAnswer.value = null;
  status.value = "idle";
  showResults.value = false;
}
</script>

<template>
  <div class="px-2 md:px-6 py-6 pb-16 space-y-8 flex flex-col min-h-full overflow-y-auto">
    <!-- Header / Back Button -->
    <div class="flex items-center gap-4">
      <button
        @click="router.back()"
        class="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all outline-none border-4 border-yellow-200 text-yellow-600 shrink-0"
      >
        <PhArrowLeft weight="bold" class="text-2xl" />
      </button>
      <h1 class="text-3xl font-extrabold text-slate-700">Funny Math!</h1>
    </div>

    <!-- Final Results Page -->
    <div
      v-if="showResults"
      class="max-w-6xl mx-auto bg-white rounded-[2.5rem] p-6 md:p-16 shadow-xl border-4 border-yellow-200 text-center relative overflow-hidden flex flex-col items-center gap-6"
      v-motion-pop
    >
      <div
        class="text-yellow-400 text-8xl md:text-9xl drop-shadow-md flex items-center -space-x-4 md:-space-x-8 mb-4"
        v-motion-slide-bottom
      >
        <PhStar weight="fill" />
        <PhStar weight="fill" class="text-yellow-500 scale-125 z-10 -translate-y-6" />
        <PhStar weight="fill" />
      </div>
      <h2 class="text-4xl md:text-5xl font-extrabold text-slate-700 tracking-tight">
        Math Master!
      </h2>
      <p class="text-slate-500 font-bold text-xl md:text-2xl">
        You successfully popped all the correct balloons!
      </p>

      <div class="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
        <button
          @click="restartGame"
          class="w-full sm:w-auto px-8 py-4 bg-yellow-400 text-white border-4 border-yellow-500 rounded-full font-extrabold text-xl shadow-sm hover:brightness-105 active:translate-y-1 transition-all"
        >
          Play Again!
        </button>
        <button
          @click="router.push('/games')"
          class="w-full sm:w-auto px-8 py-4 bg-white text-slate-600 border-4 border-slate-200 rounded-full font-extrabold text-xl shadow-sm hover:bg-slate-50 active:translate-y-1 transition-all"
        >
          Arcade
        </button>
      </div>
    </div>

    <!-- Game Board -->
    <div
      v-else-if="currentLevel"
      class="max-w-6xl mx-auto w-full bg-white rounded-[2.5rem] p-6 md:p-12 shadow-xl border-4 border-yellow-200 text-center flex flex-col relative"
      v-motion-slide-bottom
      :key="currentLevel.id"
    >
      <!-- Paginator Progression -->
      <div class="flex items-center justify-center gap-3 mb-8">
        <div
          v-for="(_, index) in levels"
          :key="`math-page-${index}`"
          class="h-3 md:h-4 transition-all duration-300 rounded-full"
          :class="[
            index === currentLevelIndex
              ? 'w-10 md:w-12 bg-yellow-400 shadow-md'
              : index < currentLevelIndex
                ? 'w-3 md:w-4 bg-green-400'
                : 'w-3 md:w-4 bg-yellow-100',
          ]"
        ></div>
      </div>

      <!-- Question Title -->
      <h2 class="text-2xl md:text-4xl font-extrabold text-slate-700 tracking-tight mb-2">
        <template v-if="currentLevel.type === 'counting'">
          How many {{ currentLevel.emoji }} can you count?
        </template>
        <template v-else-if="currentLevel.type === 'equation'">
          Can you solve this puzzle?
        </template>
      </h2>
      <p class="text-yellow-500 font-bold text-lg md:text-xl">Tap the correct balloon to answer!</p>

      <!-- The Puzzle Display Area -->
      <div
        class="flex flex-wrap items-center justify-center gap-4 md:gap-8 min-h-[120px] mb-8 relative"
      >
        <!-- Counting Type View -->
        <template v-if="currentLevel.type === 'counting'">
          <div
            v-for="i in currentLevel.count"
            :key="i"
            class="text-5xl md:text-8xl hover:scale-110 hover:-rotate-12 cursor-default select-none filter drop-shadow-md animate-pop-in"
            :style="{ animationDelay: `${i * 100}ms` }"
          >
            {{ currentLevel.emoji }}
          </div>
        </template>

        <!-- Equation Type View -->
        <template v-else-if="currentLevel.type === 'equation'">
          <div class="flex items-center justify-center gap-6" v-motion-pop>
            <div
              class="text-5xl md:text-9xl font-black text-blue-500 drop-shadow-sm tracking-widest whitespace-nowrap"
            >
              {{ currentLevel.equation }} <span class="text-pink-400">=</span>
              <span v-if="status === 'correct'" class="text-green-500" v-motion-pop>{{
                currentLevel.answer
              }}</span>
              <span v-else class="text-yellow-400">?</span>
            </div>
          </div>
        </template>

        <!-- Full background blur for Correct status -->
        <div
          v-if="status === 'correct'"
          class="absolute -inset-4 md:-inset-8 bg-white/40 backdrop-blur-md z-0 rounded-3xl transition-all"
        ></div>

        <div
          v-if="status === 'wrong'"
          class="absolute inset-0 m-auto w-32 h-32 text-red-500 text-8xl md:text-9xl bg-white/90 backdrop-blur-sm rounded-full shadow-2xl flex items-center justify-center z-10 animate-shake"
          v-motion-pop
        >
          <PhSmileySad weight="fill" />
        </div>

        <div
          v-if="status === 'correct'"
          class="absolute inset-0 m-auto w-40 h-40 md:w-56 md:h-56 text-green-500 text-[10rem] md:text-[14rem] bg-white/90 backdrop-blur-sm rounded-full shadow-2xl border-8 border-green-400 flex items-center justify-center z-10"
          v-motion-pop
        >
          <PhSmiley weight="fill" />
        </div>
      </div>

      <!-- Multiple Choice Options -->
      <div
        class="relative bg-slate-50 p-6 md:p-10 rounded-[1.5rem] border-4 border-slate-200 mt-auto"
      >
        <h3
          class="text-xl font-bold text-slate-400 mb-6 uppercase tracking-widest text-center"
          v-if="status !== 'correct'"
        >
          Pop a Balloon!
        </h3>

        <!-- Win State Actions -->
        <div
          v-if="status === 'correct'"
          class="flex flex-col items-center gap-4 text-center min-h-[150px] justify-center"
          v-motion-pop
        >
          <h2 class="text-3xl font-extrabold text-green-600">You got it! 🎉</h2>
          <button
            @click="nextChallenge"
            class="mt-4 px-10 py-5 flex items-center gap-3 bg-green-500 text-white border-4 border-green-600 rounded-full font-extrabold text-2xl shadow-md hover:bg-green-600 active:translate-y-1 transition-all"
          >
            {{ currentLevelIndex === levels.length - 1 ? "Finish!" : "Next Challenge!" }}
            <PhTrophy
              weight="fill"
              class="text-3xl"
              v-if="currentLevelIndex === levels.length - 1"
            />
          </button>
        </div>

        <!-- The 4 Buttons Row -->
        <div v-else class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 min-h-[150px]">
          <button
            v-for="option in currentLevel.options"
            :key="option"
            @click="selectOption(option)"
            :disabled="status === 'wrong' && selectedAnswer === option"
            :class="[
              'w-full h-24 md:h-32 rounded-[2rem] border-4 border-b-8 flex items-center justify-center text-4xl md:text-5xl font-black transition-all outline-none select-none tracking-tighter',
              status === 'wrong' && selectedAnswer === option
                ? 'bg-red-100 border-red-300 text-red-500 opacity-50 pointer-events-none'
                : 'bg-white border-blue-400 text-blue-500 hover:-translate-y-2 hover:shadow-lg active:translate-y-1 active:border-b-4 hover:border-blue-500 hover:text-blue-600 shadow-sm',
            ]"
          >
            {{ option }}
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
  animation: shake 0.3s ease-in-out 3;
}

@keyframes popIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  60% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-pop-in {
  opacity: 0;
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
</style>
