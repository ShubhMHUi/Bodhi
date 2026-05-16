<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { PhArrowLeft, PhStar, PhSmiley, PhSmileySad, PhTrophy } from "@phosphor-icons/vue";

const router = useRouter();

// Define our game sequence engine!
interface Level {
  id: number;
  prefix: string[];
  suffix: string[];
  answer: string;
  options: string[];
}

const levels: Level[] = [
  {
    id: 1,
    prefix: ["A"],
    suffix: ["C", "D"],
    answer: "B",
    options: ["E", "B", "Z", "F"],
  },
  {
    id: 2,
    prefix: ["1", "2"],
    suffix: ["4"],
    answer: "3",
    options: ["7", "3", "9", "5"],
  },
  {
    id: 3,
    prefix: ["🐶", "🐱"],
    suffix: ["🐭"],
    answer: "🐻",
    options: ["🐸", "🐻", "🐶", "🚗"],
  },
];

const currentLevelIndex = ref(0);
const currentLevel = computed(() => levels[currentLevelIndex.value] as Level);
const showResults = ref(false);

const placedLetter = ref<string | null>(null);

// status can be 'idle', 'correct', 'wrong'
const status = ref<"idle" | "correct" | "wrong">("idle");

// Color mapping for sequential blocks dynamically
const indexToColor = (index: number) => {
  const colors = [
    "bg-blue-100 border-blue-400 text-blue-600",
    "bg-orange-100 border-orange-400 text-orange-600",
    "bg-purple-100 border-purple-400 text-purple-600",
    "bg-cyan-100 border-cyan-400 text-cyan-600",
  ];
  return colors[index % colors.length];
};

// HTML5 Drag handling
function onDragStart(event: DragEvent, option: string) {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", option);
  }
}

function onDrop(event: DragEvent) {
  const droppedLetter = event.dataTransfer?.getData("text/plain");
  if (!droppedLetter) return;

  placedLetter.value = droppedLetter;

  if (droppedLetter === currentLevel.value.answer) {
    status.value = "correct";
  } else {
    status.value = "wrong";
    setTimeout(() => {
      placedLetter.value = null;
      status.value = "idle";
    }, 1000);
  }
}

function nextChallenge() {
  if (currentLevelIndex.value < levels.length - 1) {
    currentLevelIndex.value++;
    placedLetter.value = null;
    status.value = "idle";
  } else {
    showResults.value = true;
  }
}

function restartGame() {
  currentLevelIndex.value = 0;
  placedLetter.value = null;
  status.value = "idle";
  showResults.value = false;
}
</script>

<template>
  <div class="px-2 md:px-6 py-6 pb-16 space-y-8 flex flex-col min-h-full">
    <!-- Header / Back Button -->
    <div class="flex items-center gap-4">
      <button
        @click="router.back()"
        class="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all outline-none border-4 border-purple-200 text-purple-600 shrink-0"
      >
        <PhArrowLeft weight="bold" class="text-2xl" />
      </button>
      <h1 class="text-3xl font-extrabold text-slate-700">Sequence Master!</h1>
    </div>

    <!-- Final Results Page -->
    <div
      v-if="showResults"
      class="max-w-6xl mx-auto bg-white rounded-4xl p-6 md:p-16 shadow-xl border-4 border-yellow-200 text-center relative overflow-hidden flex flex-col items-center gap-6"
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
        You are a Genius!
      </h2>
      <p class="text-slate-500 font-bold text-xl md:text-2xl">
        You successfully completed all sequence puzzles!
      </p>

      <div class="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
        <button
          @click="restartGame"
          class="w-full sm:w-auto px-8 py-4 bg-purple-500 text-white border-4 border-purple-600 rounded-full font-extrabold text-xl shadow-sm hover:bg-purple-600 active:translate-y-1 transition-all"
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
      v-else
      class="max-w-6xl bg-white rounded-[2.5rem] p-6 md:p-12 shadow-xl border-4 border-pink-200 text-center relative overflow-hidden"
      v-motion-slide-bottom
      :key="currentLevel.id"
    >
      <!-- Paginator Progression -->
      <div class="flex items-center justify-center gap-3 mb-8">
        <div
          v-for="(_, index) in levels"
          :key="`page-${index}`"
          class="h-3 md:h-4 transition-all duration-300 rounded-full"
          :class="[
            index === currentLevelIndex
              ? 'w-10 md:w-12 bg-pink-500 shadow-md'
              : index < currentLevelIndex
                ? 'w-3 md:w-4 bg-green-400'
                : 'w-3 md:w-4 bg-pink-100',
          ]"
        ></div>
      </div>
      <h2 class="text-2xl md:text-4xl font-extrabold text-slate-700 tracking-tight mb-2">
        What comes next?
      </h2>
      <p class="text-pink-500 font-bold text-lg md:text-xl mb-12">
        Drag the correct element into the missing box!
      </p>

      <!-- The Puzzle Row -->
      <div class="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-16">
        <!-- Prefix Blocks -->
        <div
          v-for="(item, index) in currentLevel.prefix"
          :key="`prefix-${index}`"
          :class="[
            'w-16 h-20 md:w-32 md:h-36 border-4 rounded-2xl flex items-center justify-center text-4xl md:text-5xl font-extrabold shadow-sm transition-transform shrink-0 cursor-default select-none',
            indexToColor(index),
          ]"
        >
          {{ item }}
        </div>

        <!-- The Drop Zone -->
        <div
          @dragover.prevent
          @dragenter.prevent
          @drop="onDrop"
          :class="[
            'w-16 h-20 md:w-32 md:h-36 rounded-2xl border-4 border-dashed flex items-center justify-center text-4xl md:text-5xl font-extrabold transition-all relative shrink-0',
            status === 'idle' && !placedLetter ? 'border-slate-300 bg-slate-50 text-slate-400' : '',
            status === 'idle' && placedLetter
              ? 'border-slate-400 bg-slate-100 text-slate-600 border-solid'
              : '',
            status === 'correct'
              ? 'border-green-500 bg-green-100 text-green-600 border-solid scale-110 shadow-[0_0_30px_rgba(34,197,94,0.3)] z-10'
              : '',
            status === 'wrong'
              ? 'border-red-500 bg-red-100 text-red-600 border-solid animate-shake shadow-[0_0_30px_rgba(239,68,68,0.3)] z-10'
              : '',
          ]"
        >
          {{ placedLetter || "?" }}

          <!-- Wrong feedback overlay -->
          <div
            v-if="status === 'wrong'"
            class="absolute -top-4 -right-4 md:-top-6 md:-right-6 text-red-500 text-4xl md:text-5xl bg-white rounded-full shadow-lg"
            v-motion-pop
          >
            <PhSmileySad weight="fill" />
          </div>

          <!-- Correct feedback overlay -->
          <div
            v-if="status === 'correct'"
            class="absolute -top-4 -right-4 md:-top-6 md:-right-6 text-yellow-400 text-5xl md:text-5xl drop-shadow-lg"
            v-motion-pop
          >
            <PhStar weight="fill" />
          </div>
        </div>

        <!-- Suffix Blocks -->
        <div
          v-for="(item, index) in currentLevel.suffix"
          :key="`suffix-${index}`"
          :class="[
            'w-16 h-20 md:w-32 md:h-36 border-4  rounded-2xl flex items-center justify-center text-4xl md:text-5xl font-extrabold shadow-sm transition-transform shrink-0 cursor-default select-none',
            indexToColor(currentLevel.prefix.length + 1 + index),
          ]"
        >
          {{ item }}
        </div>
      </div>

      <!-- Draggable Options -->
      <div class="relative mt-8 bg-slate-50 p-6 md:p-10 rounded-[1.5rem] border-4 border-slate-200">
        <h3
          class="text-xl font-bold text-slate-400 mb-6 uppercase tracking-widest text-center"
          v-if="status !== 'correct'"
        >
          Your Options
        </h3>

        <!-- Win State Details -->
        <div
          v-if="status === 'correct'"
          class="flex flex-col items-center gap-4 text-center min-h-[150px] justify-center"
          v-motion-pop
        >
          <div class="text-green-500 text-5xl drop-shadow-md">
            <PhSmiley weight="fill" />
          </div>
          <h2 class="text-3xl font-extrabold text-green-600">Great Job!</h2>
          <button
            @click="nextChallenge"
            class="mt-4 px-8 py-4 flex items-center gap-2 bg-green-500 text-white border-4 border-green-600 rounded-full font-extrabold text-xl shadow-sm hover:bg-green-600 active:translate-y-1 transition-all"
          >
            {{ currentLevelIndex === levels.length - 1 ? "Finish!" : "Next Challenge!" }}
            <PhTrophy
              weight="fill"
              class="text-2xl"
              v-if="currentLevelIndex === levels.length - 1"
            />
          </button>
        </div>

        <!-- Draggable blocks row -->
        <div v-else class="flex flex-wrap items-center justify-center gap-4 md:gap-6 min-h-[150px]">
          <div
            v-for="option in currentLevel.options"
            :key="option"
            :draggable="option !== placedLetter"
            @dragstart="onDragStart($event, option)"
            :class="[
              'w-16 h-20 md:w-24 md:h-28 rounded-xl border-4 flex items-center justify-center text-3xl md:text-5xl font-extrabold transition-all outline-none select-none',
              option === placedLetter
                ? 'opacity-30 border-slate-200 bg-slate-50 text-slate-300 pointer-events-none'
                : 'bg-white border-pink-300 text-pink-600  shadow-sm hover:-translate-y-2 hover:shadow-md hover:rotate-3 cursor-grab active:cursor-grabbing border-solid',
            ]"
          >
            {{ option }}
          </div>
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
</style>
