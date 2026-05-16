<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import {
  PhBrain,
  PhPalette,
  PhTrophy,
  PhSignIn,
  PhSun,
  PhCloud,
  PhMoonStars,
  PhStar,
  PhBird,
  PhPlanet,
  PhHeart,
  PhLightbulb,
  PhRocketLaunch,
} from "@phosphor-icons/vue";

// Theme Toggling Logic
const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

onMounted(() => {
  const hasDarkClass = document.documentElement.classList.contains("dark");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (hasDarkClass || prefersDark) {
    isDark.value = true;
    document.documentElement.classList.add("dark");
  }
});
</script>

<template>
  <!-- Import Fonts -->
  <link
    href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&family=Fredoka:wght@400;700&display=swap"
    rel="stylesheet"
  />

  <!-- Main Wrapper -->
  <div
    class="min-h-screen w-full flex flex-col items-center relative overflow-x-hidden selection:bg-teal-500/10 selection:text-white transition-colors duration-1000 bg-gradient-to-b from-sky-400/40 to-sky-100 dark:bg-slate-950 dark:bg-none font-['Outfit']"
  >
    <!-- Theme Toggle Button -->
    <button
      @click="toggleTheme"
      class="fixed top-6 right-6 z-50 p-2 rounded-full bg-blue-500/10 dark:bg-black/30 backdrop-blur-md border border-white dark:border-white/10 shadow-sm hover:scale-110 active:scale-95 transition-all text-amber-500 dark:text-sky-300 cursor-pointer outline-none"
    >
      <PhSun v-if="!isDark" weight="fill" class="text-xl" />
      <PhMoonStars v-else weight="fill" class="text-xl" />
    </button>

    <!-- Hero Section -->
    <section class="w-full flex flex-col justify-center items-center px-4 relative py-12 md:py-20">
      <!-- Background Elements -->
      <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <!-- Light Mode Elements -->
        <div
          class="absolute inset-0 transition-opacity duration-1000"
          :class="isDark ? 'opacity-0' : 'opacity-100'"
        >
          <!-- Sun -->
          <div class="absolute top-10 left-10 md:top-20 md:left-20 scale-100 md:scale-125">
            <div class="relative">
              <PhSun weight="fill" class="text-8xl text-yellow-400 drop-shadow-lg" />
              <PhCloud
                weight="fill"
                class="absolute -bottom-1 -right-3 text-5xl text-white drop-shadow-md"
              />
            </div>
          </div>
          <!-- Birds -->
          <PhBird
            weight="fill"
            class="absolute top-[15%] text-4xl text-sky-600/40 animate-[fly_20s_linear_infinite]"
          />
          <PhBird
            weight="fill"
            class="absolute top-[25%] text-2xl text-sky-500/50 animate-[fly_15s_linear_infinite_5s]"
          />
          <PhBird
            weight="fill"
            class="absolute top-[10%] text-3xl text-sky-400/60 animate-[fly_25s_linear_infinite_2s]"
          />
          <PhBird
            weight="fill"
            class="absolute top-[35%] text-xl text-sky-600/30 animate-[fly_18s_linear_infinite_8s]"
          />
        </div>

        <!-- Dark Mode Elements -->
        <div
          class="absolute inset-0 transition-opacity duration-1000"
          :class="isDark ? 'opacity-100' : 'opacity-0'"
        >
          <!-- Moon -->
          <div class="absolute top-10 right-10 md:top-20 md:right-20 scale-100 md:scale-125">
            <div class="relative">
              <PhMoonStars
                weight="fill"
                class="text-8xl text-sky-200 drop-shadow-[0_0_20px_rgba(186,230,253,0.5)]"
              />
              <PhStar
                weight="fill"
                class="absolute -top-2 -right-4 text-4xl text-yellow-200 animate-twinkle"
              />
            </div>
          </div>
          <!-- Twinkling Stars -->
          <PhStar
            weight="fill"
            class="absolute top-[10%] left-[30%] text-2xl text-yellow-200 animate-[twinkle_3s_ease-in-out_infinite_alternate]"
          />
          <PhStar
            weight="fill"
            class="absolute top-[25%] left-[60%] text-xl text-yellow-100 animate-[twinkle_4s_ease-in-out_infinite_alternate_1s]"
          />
          <PhStar
            weight="fill"
            class="absolute top-[15%] left-[80%] text-3xl text-yellow-200 animate-[twinkle_5s_ease-in-out_infinite_alternate_2s]"
          />
          <PhStar
            weight="fill"
            class="absolute top-[40%] left-[85%] text-sm text-yellow-100 animate-[twinkle_2s_ease-in-out_infinite_alternate_0.5s]"
          />
          <PhStar
            weight="fill"
            class="absolute top-[5%] left-[50%] text-lg text-yellow-200 animate-[twinkle_3.5s_ease-in-out_infinite_alternate_1.5s]"
          />
          <PhStar
            weight="fill"
            class="absolute top-[35%] left-[20%] text-xl text-yellow-100 animate-[twinkle_4.5s_ease-in-out_infinite_alternate_2.5s]"
          />
          <PhStar
            weight="fill"
            class="absolute top-[50%] left-[10%] text-2xl text-yellow-200 animate-[twinkle_3s_ease-in-out_infinite_alternate_0.2s]"
          />
          <PhStar
            weight="fill"
            class="absolute top-[60%] left-[90%] text-lg text-yellow-100 animate-[twinkle_5s_ease-in-out_infinite_alternate_1.2s]"
          />

          <!-- Shooting Stars -->
          <div
            class="absolute top-[10%] left-[80%] w-1 h-1 bg-white rounded-full animate-[shooting-star_8s_linear_infinite]"
          ></div>
          <div
            class="absolute top-[30%] left-[90%] w-1 h-1 bg-white rounded-full animate-[shooting-star_12s_linear_infinite_4s]"
          ></div>
        </div>

        <!-- Subtle Clouds -->
        <PhCloud
          weight="fill"
          class="absolute bottom-20 left-[5%] text-7xl text-white transition-opacity duration-1000"
          :class="isDark ? 'opacity-10' : 'opacity-50'"
        />
        <PhCloud
          weight="fill"
          class="absolute top-40 right-[10%] text-6xl text-white transition-opacity duration-1000"
          :class="isDark ? 'opacity-5' : 'opacity-30'"
        />
      </div>

      <!-- Hero Card -->
      <div
        class="max-w-6xl w-full bg-white/10 dark:bg-slate-900/10 backdrop-blur-3xl border border-white dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[3.5rem] p-8 md:p-14 relative z-10 text-center transition-all duration-1000"
        v-motion-slide-bottom
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, type: 'spring' } }"
      >
        <!-- Logo -->
        <h1 class="text-5xl md:text-7xl font-['Fredoka'] font-bold mb-6 tracking-tight">
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-[#FF76E3] via-[#D896FF] to-[#38FFD1]"
            >Bodhi</span
          >
        </h1>

        <!-- Title -->
        <h2
          class="text-3xl md:text-5xl font-black text-[#2D3648] dark:text-white mb-6 leading-tight"
        >
          Ignite Your Child's Imagination
        </h2>

        <!-- Subtitle -->
        <p
          class="text-lg md:text-xl font-bold text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-10 leading-relaxed"
        >
          The ultimate educational arcade and discovery dashboard for kids. Learning has never been
          this <span class="text-[#FFB800] dark:text-amber-400 font-black">fun</span>!
        </p>

        <!-- Login Button -->
        <div class="flex flex-col items-center gap-5">
          <RouterLink
            to="/login"
            class="group inline-flex items-center gap-3 bg-[#2D3648] dark:bg-white text-white dark:text-[#2D3648] text-xl font-bold px-10 py-4 rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Parent Portal Login</span>
            <PhSignIn
              weight="bold"
              class="text-2xl group-hover:translate-x-1 transition-transform"
            />
          </RouterLink>

          <p class="text-slate-400 dark:text-slate-500 font-bold text-sm">
            Log in to view your child's progress or start playing!
          </p>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 px-4 max-w-6xl mx-auto w-full relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <!-- Smart Arcade -->
        <div
          class="bg-white/80 dark:bg-slate-900/60 rounded-[2.5rem] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-white/50 dark:border-white/10 hover:-translate-y-2 transition-all duration-300"
        >
          <div
            class="w-12 h-12 bg-[#FDE7F9] dark:bg-fuchsia-950 rounded-xl flex items-center justify-center mb-6 shadow-sm"
          >
            <PhBrain weight="fill" class="text-2xl text-[#FF76E3]" />
          </div>
          <h3 class="text-xl font-black text-[#2D3648] dark:text-white mb-3">Smart Arcade</h3>
          <p class="text-slate-500 dark:text-slate-400 font-bold text-sm leading-relaxed">
            Interactive math puzzles, audio guessing games, and memory challenges designed to boost
            cognitive skills.
          </p>
        </div>

        <!-- Creative Quests -->
        <div
          class="bg-white/80 dark:bg-slate-900/60 rounded-[2.5rem] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-white/50 dark:border-white/10 hover:-translate-y-2 transition-all duration-300"
        >
          <div
            class="w-12 h-12 bg-[#E7FDF5] dark:bg-emerald-950 rounded-xl flex items-center justify-center mb-6 shadow-sm"
          >
            <PhPalette weight="fill" class="text-2xl text-[#38FFD1]" />
          </div>
          <h3 class="text-xl font-black text-[#2D3648] dark:text-white mb-3">Creative Quests</h3>
          <p class="text-slate-500 dark:text-slate-400 font-bold text-sm leading-relaxed">
            Daily assignments that encourage creativity, art, and reading, making every day a new
            adventure.
          </p>
        </div>

        <!-- Reward System -->
        <div
          class="bg-white/80 dark:bg-slate-900/60 rounded-[2.5rem] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-white/50 dark:border-white/10 hover:-translate-y-2 transition-all duration-300"
        >
          <div
            class="w-12 h-12 bg-[#FFF8E7] dark:bg-amber-950 rounded-xl flex items-center justify-center mb-6 shadow-sm"
          >
            <PhTrophy weight="fill" class="text-2xl text-[#FFB800]" />
          </div>
          <h3 class="text-xl font-black text-[#2D3648] dark:text-white mb-3">Reward System</h3>
          <p class="text-slate-500 dark:text-slate-400 font-bold text-sm leading-relaxed">
            Earn stars, super badges, and track progress. Positive reinforcement keeps the learning
            journey exciting.
          </p>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-16 max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center">
      <!-- About Card -->
      <div
        class="max-w-6xl w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[3rem] p-8 md:p-14 relative overflow-hidden mb-12 text-center"
        v-motion-slide-bottom
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, type: 'spring' } }"
      >
        <PhPlanet
          weight="fill"
          class="absolute -top-10 -right-10 text-9xl text-indigo-200 opacity-50 animate-pulse"
        />
        <PhStar
          weight="fill"
          class="absolute bottom-10 -left-6 text-6xl text-amber-300 opacity-50 -rotate-12"
        />

        <h2
          class="text-4xl md:text-5xl font-['Fredoka'] font-bold mb-6 text-slate-800 dark:text-white relative z-10"
        >
          About
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-[#FF76E3] via-[#D896FF] to-[#38FFD1]"
            >Bodhi</span
          >
        </h2>

        <p
          class="text-xl md:text-2xl font-bold text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed relative z-10"
        >
          We believe that the best way to learn is through play. Our mission is to ignite your
          child's imagination and curiosity!
        </p>
      </div>

      <!-- About Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
        <!-- Mission 1 -->
        <div
          class="bg-white/80 dark:bg-slate-900/80 rounded-[2.5rem] p-8 shadow-sm border border-white/50 dark:border-white/10 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
          v-motion-slide-bottom
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 100 } }"
        >
          <div
            class="w-16 h-16 bg-rose-100 dark:bg-rose-900/50 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
          >
            <PhHeart weight="fill" class="text-3xl text-rose-500" />
          </div>
          <h3 class="text-2xl font-black text-slate-800 dark:text-white mb-4">Made with Love</h3>
          <p class="text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
            Designed specifically for kids, with an interface that's colorful, safe, and entirely
            ad-free.
          </p>
        </div>

        <!-- Mission 2 -->
        <div
          class="bg-white/80 dark:bg-slate-900/80 rounded-[2.5rem] p-8 shadow-sm border border-white/50 dark:border-white/10 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
          v-motion-slide-bottom
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
        >
          <div
            class="w-16 h-16 bg-amber-100 dark:bg-amber-900/50 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
          >
            <PhLightbulb weight="fill" class="text-3xl text-amber-500" />
          </div>
          <h3 class="text-2xl font-black text-slate-800 dark:text-white mb-4">Spark Creativity</h3>
          <p class="text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
            Through drawing, music, and interactive puzzles, we help children express themselves.
          </p>
        </div>

        <!-- Mission 3 -->
        <div
          class="bg-white/80 dark:bg-slate-900/80 rounded-[2.5rem] p-8 shadow-sm border border-white/50 dark:border-white/10 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
          v-motion-slide-bottom
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 300 } }"
        >
          <div
            class="w-16 h-16 bg-sky-100 dark:bg-sky-900/50 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
          >
            <PhRocketLaunch weight="fill" class="text-3xl text-sky-500" />
          </div>
          <h3 class="text-2xl font-black text-slate-800 dark:text-white mb-4">Future Ready</h3>
          <p class="text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
            Building foundational skills in math, reading, and problem-solving to prepare for the
            future.
          </p>
        </div>
      </div>
    </section>

    <!-- Discover Section -->
    <section class="pb-16 px-4 max-w-6xl mx-auto w-full relative z-10 text-center">
      <h3 class="text-4xl md:text-5xl font-black text-[#2D3648] dark:text-white mb-12">
        Discover the Magic
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div class="relative group">
          <div class="absolute inset-0 bg-black/5 blur-2xl rounded-[3rem]"></div>
          <div
            class="relative rounded-[3rem] overflow-hidden border-[10px] border-white dark:border-slate-800 shadow-xl hover:scale-[1.02] transition-transform duration-500"
          >
            <img
              src="/assets/images/gallery1.png"
              alt="Kid playing"
              class="w-full h-80 object-cover"
            />
          </div>
        </div>

        <div class="relative group">
          <div class="absolute inset-0 bg-black/5 blur-2xl rounded-[3rem]"></div>
          <div
            class="relative rounded-[3rem] overflow-hidden border-[10px] border-white dark:border-slate-800 shadow-xl hover:scale-[1.02] transition-transform duration-500"
          >
            <img
              src="/assets/images/gallery2.png"
              alt="Dashboard"
              class="w-full h-80 object-cover"
            />
          </div>
        </div>

        <div class="relative group">
          <div class="absolute inset-0 bg-black/5 blur-2xl rounded-[3rem]"></div>
          <div
            class="relative rounded-[3rem] overflow-hidden border-[10px] border-white dark:border-slate-800 shadow-xl hover:scale-[1.02] transition-transform duration-500"
          >
            <img src="/assets/images/gallery3.png" alt="Mascot" class="w-full h-80 object-cover" />
          </div>
        </div>
      </div>
    </section>

    <!-- Contact / CTA Section -->
    <section class="pb-24 px-4 max-w-4xl mx-auto w-full relative z-10">
      <div
        class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[3rem] p-10 md:p-14 text-center w-full text-white shadow-xl relative overflow-hidden"
        v-motion-slide-bottom
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
      >
        <div
          class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] opacity-30"
        ></div>

        <h2 class="text-3xl md:text-4xl font-black mb-4 relative z-10">Join the Adventure!</h2>
        <p class="text-lg md:text-xl font-medium text-white/90 mb-8 relative z-10 max-w-xl mx-auto">
          Bodhi is continuously growing with new games and features added every month. We would love
          to hear from parents!
        </p>
        <a
          href="mailto:hello@bodhi.app"
          class="inline-block bg-white text-indigo-600 font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform active:scale-95 relative z-10"
        >
          Contact Us
        </a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 w-full text-center text-slate-400 dark:text-slate-500 font-bold text-sm">
      <p>&copy; 2024 Bodhi Educational Arcade. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
/* Scoped styles */
</style>
