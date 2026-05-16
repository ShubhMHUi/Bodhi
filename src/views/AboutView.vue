<script setup lang="ts">
import { PhPlanet, PhStar, PhHeart, PhLightbulb, PhRocketLaunch } from '@phosphor-icons/vue'
</script>

<template>
  <div class="w-full flex flex-col items-center justify-center py-4 md:py-10 px-2 md:px-4 pb-24 font-['Outfit']">
    
    <!-- Hero Section -->
    <div 
      class="max-w-4xl w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[3rem] p-8 md:p-14 relative overflow-hidden mb-12 text-center"
      v-motion-slide-bottom
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 800, type: 'spring' } }"
    >
      <PhPlanet weight="fill" class="absolute -top-10 -right-10 text-9xl text-indigo-200 opacity-50 animate-pulse" />
      <PhStar weight="fill" class="absolute bottom-10 -left-6 text-6xl text-amber-300 opacity-50 -rotate-12" />

      <h1 class="text-5xl md:text-6xl font-['Fredoka'] font-bold mb-6 text-slate-800 dark:text-white relative z-10">
        About <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#FF76E3] via-[#D896FF] to-[#38FFD1]">Bodhi</span>
      </h1>
      
      <p class="text-xl md:text-2xl font-bold text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed relative z-10">
        We believe that the best way to learn is through play. Our mission is to ignite your child's imagination and curiosity!
      </p>
    </div>

    <!-- Features Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
      
      <!-- Mission 1 -->
      <div 
        class="bg-white/80 dark:bg-slate-900/80 rounded-[2.5rem] p-8 shadow-sm border border-white/50 dark:border-white/10 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
        v-motion-slide-bottom
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 100 } }"
      >
        <div class="w-16 h-16 bg-rose-100 dark:bg-rose-900/50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
          <PhHeart weight="fill" class="text-3xl text-rose-500" />
        </div>
        <h3 class="text-2xl font-black text-slate-800 dark:text-white mb-4">Made with Love</h3>
        <p class="text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
          Designed specifically for kids, with an interface that's colorful, safe, and entirely ad-free.
        </p>
      </div>

      <!-- Mission 2 -->
      <div 
        class="bg-white/80 dark:bg-slate-900/80 rounded-[2.5rem] p-8 shadow-sm border border-white/50 dark:border-white/10 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
        v-motion-slide-bottom
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
      >
        <div class="w-16 h-16 bg-amber-100 dark:bg-amber-900/50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
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
        <div class="w-16 h-16 bg-sky-100 dark:bg-sky-900/50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
          <PhRocketLaunch weight="fill" class="text-3xl text-sky-500" />
        </div>
        <h3 class="text-2xl font-black text-slate-800 dark:text-white mb-4">Future Ready</h3>
        <p class="text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
          Building foundational skills in math, reading, and problem-solving to prepare for the future.
        </p>
      </div>

    </div>

    <!-- Contact / CTA -->
    <div 
      class="mt-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[3rem] p-10 md:p-14 text-center max-w-4xl w-full text-white shadow-xl relative overflow-hidden"
      v-motion-slide-bottom
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }"
    >
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] opacity-30"></div>
      
      <h2 class="text-3xl md:text-4xl font-black mb-4 relative z-10">Join the Adventure!</h2>
      <p class="text-lg md:text-xl font-medium text-white/90 mb-8 relative z-10 max-w-xl mx-auto">
        Bodhi is continuously growing with new games and features added every month. We would love to hear from parents!
      </p>
      <a href="mailto:hello@bodhi.app" class="inline-block bg-white text-indigo-600 font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform active:scale-95 relative z-10">
        Contact Us
      </a>
    </div>

  </div>
</template>
