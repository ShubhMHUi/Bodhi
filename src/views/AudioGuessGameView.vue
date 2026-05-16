<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import {
  PhArrowLeft,
  PhSmiley,
  PhSmileySad,
  PhSpeakerHigh,
  PhStar,
  PhMusicNotes,
} from "@phosphor-icons/vue";

// Base Types
interface AudioOption {
  id: number;
  emoji: string;
  name: string;
}

interface AudioLevel {
  id: number;
  soundText: string;
  audioSrc?: string;
  answerId: number;
  options: AudioOption[];
}

// Build our "Audio" Level Data
const levels: AudioLevel[] = [
  {
    id: 1,
    soundText: "Woof! Woof! Woof!",
    audioSrc: "https://upload.wikimedia.org/wikipedia/commons/7/71/Dog_bark_sound_effect.ogg",
    answerId: 1,
    options: [
      { id: 2, emoji: "🐱", name: "Cat" },
      { id: 3, emoji: "🐮", name: "Cow" },
      { id: 1, emoji: "🐶", name: "Dog" },
      { id: 4, emoji: "🦁", name: "Lion" },
    ],
  },
  {
    id: 2,
    soundText: "Moooooooo!",
    audioSrc: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Mooing-cow.ogg",
    answerId: 3,
    options: [
      { id: 5, emoji: "🐷", name: "Pig" },
      { id: 6, emoji: "🐔", name: "Chicken" },
      { id: 3, emoji: "🐮", name: "Cow" },
      { id: 7, emoji: "🐴", name: "Horse" },
    ],
  },
  {
    id: 3,
    soundText: "Meowww! Purrrr!",
    audioSrc: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_purring.ogg",
    answerId: 2,
    options: [
      { id: 2, emoji: "🐱", name: "Cat" },
      { id: 1, emoji: "🐶", name: "Dog" },
      { id: 8, emoji: "🐭", name: "Mouse" },
      { id: 9, emoji: "🐰", name: "Bunny" },
    ],
  },
  {
    id: 4,
    soundText: "Oink! Oink! Oink!",
    audioSrc: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Pig_snorting.ogg",
    answerId: 5,
    options: [
      { id: 3, emoji: "🐮", name: "Cow" },
      { id: 5, emoji: "🐷", name: "Pig" },
      { id: 7, emoji: "🐴", name: "Horse" },
      { id: 10, emoji: "🐟", name: "Fish" },
    ],
  },
];

const currentLevelIndex = ref(0);
const currentLevel = computed(() => levels[currentLevelIndex.value]);

// Interaction States
const isPlayingSound = ref(false);
const status = ref<"idle" | "wrong" | "correct" | "game_won">("idle");
const selectedAnswer = ref<number | null>(null);

// Audio Synthesis Engine
const playAudioSim = () => {
  if (isPlayingSound.value || !currentLevel.value) return;

  isPlayingSound.value = true;

  if (currentLevel.value.audioSrc) {
    const audio = new Audio(currentLevel.value.audioSrc);
    audio.onended = () => {
      isPlayingSound.value = false;
    };
    audio.onerror = () => {
      fallbackSpeechSynthesis();
    };
    audio.play().catch(() => {
      fallbackSpeechSynthesis();
    });
  } else {
    fallbackSpeechSynthesis();
  }
};

const fallbackSpeechSynthesis = () => {
  if (!currentLevel.value) return;

  // Use the browser's native text-to-speech to artificially generate our "Animal Sound"
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(currentLevel.value.soundText);
    utterance.pitch = 1.6; // Slightly high pitched for a silly/kid-friendly vibe
    utterance.rate = 0.9;  // Slightly enunciated
    
    // Attempt to pick a fun voice if available
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      // Find a default english voice, ideally female/soft for kids if it exists
      const preferred = voices.find(v => v.lang.startsWith("en") && v.name.includes("Female"));
      if (preferred) utterance.voice = preferred;
    }

    utterance.onend = () => {
      isPlayingSound.value = false;
    };

    window.speechSynthesis.speak(utterance);
  } else {
    // Fallback if browser absolutely blocks synthesis
    setTimeout(() => {
      isPlayingSound.value = false;
    }, 1500);
  }
};

// Selection Logic
const selectOption = (id: number) => {
  if (status.value === "correct" || status.value === "game_won" || !currentLevel.value) return;

  selectedAnswer.value = id;

  if (id === currentLevel.value.answerId) {
    status.value = "correct";
    setTimeout(() => {
      if (currentLevelIndex.value < levels.length - 1) {
        currentLevelIndex.value++;
        status.value = "idle";
        selectedAnswer.value = null;
      } else {
        status.value = "game_won";
      }
    }, 2000);
  } else {
    status.value = "wrong";
    setTimeout(() => {
      if (status.value !== "correct") { // safety check
        status.value = "idle";
        selectedAnswer.value = null;
      }
    }, 800);
  }
};
</script>

<template>
  <div class="px-2 md:px-6 py-4 md:py-8 min-h-[90vh] flex flex-col font-sans relative">
    
    <!-- Top Navigation Bar -->
    <div class="flex items-center justify-between mb-8 z-10 relative">
      <RouterLink
        to="/games"
        class="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center text-slate-500 shadow-md border-4 border-slate-100 hover:border-green-300 hover:text-green-500 hover:scale-110 active:scale-95 transition-all text-2xl md:text-3xl"
      >
        <PhArrowLeft weight="bold" />
      </RouterLink>

      <!-- Level Tracker UI -->
      <div
        class="bg-white px-6 py-3 rounded-full shadow-md border-4 border-green-200 flex items-center gap-3"
      >
        <div
          v-for="(lvl, index) in levels"
          :key="lvl.id"
          class="h-3 md:h-4 rounded-full transition-all duration-500"
          :class="[
            index === currentLevelIndex
              ? 'w-10 md:w-12 bg-green-400 shadow-md'
              : index < currentLevelIndex
              ? 'w-3 md:w-4 bg-yellow-400'
              : 'w-3 md:w-4 bg-slate-200',
          ]"
        ></div>
      </div>
    </div>

    <!-- Gameplay Header -->
    <div class="text-center mb-8 relative z-10" v-motion-pop>
      <h1 class="text-4xl md:text-5xl font-black text-green-500 tracking-tight mb-2 drop-shadow-sm">
        <template v-if="status === 'game_won'">Incredible Ears! 🌟</template>
        <template v-else>Listen & Guess!</template>
      </h1>
      <p class="text-green-400 font-bold text-lg md:text-2xl" v-if="status !== 'game_won'">
        Tap the speaker to hear a mystery animal!
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
         <h2 class="text-4xl font-extrabold text-yellow-500 mb-8">You guessed all the animals!</h2>
         <RouterLink
            to="/games"
            class="bg-gradient-to-r from-green-400 to-teal-500 text-white font-black text-2xl px-10 py-5 rounded-full border-4 border-white shadow-[0_8px_0_#0f766e] hover:-translate-y-1 active:translate-y-2 active:shadow-[0_0px_0_#0f766e] transition-all outline-none"
         >
            Back to Arcade
         </RouterLink>
      </div>
    </div>

    <!-- Game Board Layout -->
    <div
      v-else-if="currentLevel"
      class="max-w-4xl mx-auto w-full bg-emerald-50/50 backdrop-blur-sm rounded-[2.5rem] p-6 md:p-12 shadow-xl border-4 border-green-200 text-center flex flex-col relative min-h-[500px]"
      v-motion-slide-bottom
      :key="currentLevel.id"
    >
        
        <!-- Victory Pop Overlay Background Effects -->
        <div
          v-if="status === 'correct'"
          class="absolute inset-0 bg-white/40 backdrop-blur-md z-20 rounded-[2.25rem] transition-all duration-300"
        ></div>

        <!-- Failure Animation Sticker -->
        <div
          v-if="status === 'wrong'"
          class="absolute inset-0 m-auto w-32 h-32 text-red-500 text-8xl md:text-9xl bg-white/90 backdrop-blur-sm rounded-full shadow-2xl flex items-center justify-center z-30 animate-shake pointer-events-none"
          v-motion-pop
        >
          <PhSmileySad weight="fill" />
        </div>

        <!-- Correct Sticker -->
        <div
          v-if="status === 'correct'"
          class="absolute inset-0 m-auto w-40 h-40 md:w-56 md:h-56 text-green-500 text-[10rem] md:text-[14rem] bg-white/90 backdrop-blur-sm rounded-full shadow-2xl border-8 border-green-400 flex items-center justify-center z-30"
          v-motion-pop
        >
          <PhSmiley weight="fill" />
        </div>

        <!-- Central Audio Trigger Button -->
        <div class="flex-1 flex items-center justify-center mb-12 relative z-10 w-full">
             <button 
                @click="playAudioSim"
                :disabled="status === 'correct'"
                class="relative outline-none group"
             >
                <!-- Pulse effect when playing -->
                <div v-if="isPlayingSound" class="absolute inset-0 bg-green-300 rounded-[3rem] animate-ping opacity-50 w-full h-full"></div>
                
                <div 
                   class="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-green-300 to-teal-400 rounded-[3rem] border-4 border-b-8 border-teal-500 flex items-center justify-center text-white shadow-xl transition-all"
                   :class="isPlayingSound ? 'scale-95 translate-y-2 border-b-4' : 'hover:-translate-y-2 hover:shadow-2xl active:translate-y-2 active:border-b-4 cursor-pointer drop-shadow-md'"
                >
                   <PhSpeakerHigh weight="fill" class="text-7xl md:text-9xl ml-2" />
                   
                   <!-- Music Notes Floaters -->
                   <PhMusicNotes v-if="isPlayingSound" weight="fill" class="absolute -top-6 -right-6 text-5xl text-blue-400 animate-bounce drop-shadow" />
                </div>
             </button>
        </div>

        <!-- Multiple Choice Options -->
        <div class="grid grid-cols-2 gap-4 md:gap-8 w-full relative z-10">
            <button
               v-for="option in currentLevel.options"
               :key="`opt-${option.id}`"
               @click="selectOption(option.id)"
               :disabled="status === 'correct' || (status === 'wrong' && selectedAnswer === option.id)"
               class="flex items-center gap-4 p-4 md:p-6 rounded-[2rem] border-4 border-b-8 transition-all outline-none group select-none overflow-hidden"
               :class="[
                  status === 'wrong' && selectedAnswer === option.id
                    ? 'bg-red-100 border-red-300 text-red-500 opacity-50 pointer-events-none drop-shadow-none'
                    : 'bg-white border-green-200 text-teal-600 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg active:translate-y-1 active:border-b-4 shadow-sm cursor-pointer'
               ]"
            >
               <div class="text-5xl md:text-7xl shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform drop-shadow filter">
                  {{ option.emoji }}
               </div>
               <span class="text-2xl md:text-4xl font-extrabold text-left min-w-0 tracking-tight leading-tight hidden md:block">
                  {{ option.name }}
               </span>
            </button>
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
