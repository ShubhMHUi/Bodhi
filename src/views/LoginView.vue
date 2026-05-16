<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { 
  PhEnvelopeSimple, 
  PhLockKey, 
  PhSignIn,
  PhArrowLeft,
  PhStar,
  PhPlanet
} from "@phosphor-icons/vue";

const router = useRouter();
const email = ref('');
const password = ref('');
const isLoading = ref(false);

const handleLogin = (e: Event) => {
  e.preventDefault();
  isLoading.value = true;
  
  // Simulate network request
  setTimeout(() => {
    isLoading.value = false;
    router.push('/dashboard');
  }, 800);
};
</script>

<template>
  <div class="min-h-[85vh] flex items-center justify-center py-12 px-4 relative overflow-hidden selection:bg-indigo-400 selection:text-white">
    
    <!-- Background Decor -->
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div class="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-indigo-400/20 rounded-full blur-[100px] animate-pulse-[6s]"></div>
      <div class="absolute bottom-[10%] right-[20%] w-[35vw] h-[35vw] bg-rose-400/20 rounded-full blur-[90px] animate-pulse-[4s]"></div>
      <div class="absolute top-[50%] left-[60%] w-[25vw] h-[25vw] bg-sky-300/20 rounded-full blur-[80px]"></div>
    </div>

    <!-- Main Glass Form Container -->
    <div 
      class="w-full max-w-md bg-white/50 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-[2.5rem] p-8 md:p-10 relative z-10"
      v-motion-slide-bottom
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600, type: 'spring', stiffness: 200 } }"
    >
      
      <!-- Back Button -->
      <RouterLink 
        to="/" 
        class="absolute top-6 left-6 w-10 h-10 bg-white/60 hover:bg-white rounded-full flex items-center justify-center text-slate-500 hover:text-indigo-500 shadow-sm transition-all"
      >
        <PhArrowLeft weight="bold" />
      </RouterLink>

      <!-- Decorative Icons -->
      <PhPlanet weight="fill" class="absolute -top-8 -right-8 text-7xl text-indigo-300 opacity-60 drop-shadow-md animate-bounce" />
      <PhStar weight="fill" class="absolute bottom-10 -left-6 text-5xl text-rose-300 opacity-50 drop-shadow-sm -rotate-12" />

      <!-- Header -->
      <div class="text-center mt-6 mb-8 relative z-10">
        <h2 class="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-2">
          Welcome Back!
        </h2>
        <p class="text-slate-500 font-medium">Log in to view the kid dashboard</p>
      </div>

      <!-- Login Form -->
      <form @submit="handleLogin" class="space-y-6 relative z-10">
        
        <!-- Email Input -->
        <div class="space-y-2">
          <label class="block text-sm font-bold text-slate-600 ml-1">Email Address</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <PhEnvelopeSimple weight="bold" class="text-xl text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input 
              v-model="email"
              type="email" 
              required
              placeholder="parent@bodhi.app"
              class="w-full pl-12 pr-4 py-4 bg-white/70 border-2 border-white/80 focus:border-indigo-300 focus:bg-white rounded-2xl outline-none text-slate-700 font-medium placeholder-slate-400 shadow-sm transition-all"
            />
          </div>
        </div>

        <!-- Password Input -->
        <div class="space-y-2">
          <div class="flex justify-between items-center ml-1">
             <label class="block text-sm font-bold text-slate-600">Password</label>
             <a href="#" class="text-sm font-bold text-indigo-500 hover:text-indigo-600 transition-colors">Forgot?</a>
          </div>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <PhLockKey weight="bold" class="text-xl text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input 
              v-model="password"
              type="password" 
              required
              placeholder="••••••••"
              class="w-full pl-12 pr-4 py-4 bg-white/70 border-2 border-white/80 focus:border-indigo-300 focus:bg-white rounded-2xl outline-none text-slate-700 font-medium placeholder-slate-400 shadow-sm transition-all"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="pt-4">
          <button 
            type="submit"
            :disabled="isLoading"
            class="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-black text-lg py-4 rounded-2xl shadow-[0_6px_0_#4338ca] hover:shadow-[0_4px_0_#4338ca] hover:translate-y-[2px] active:shadow-[0_0px_0_#4338ca] active:translate-y-[6px] transition-all disabled:opacity-70 disabled:cursor-not-allowed outline-none"
          >
            <span v-if="isLoading" class="animate-pulse">Logging in...</span>
            <template v-else>
               <span>Log In</span>
               <PhSignIn weight="bold" class="text-xl" />
            </template>
          </button>
        </div>
      </form>

      <!-- Footer Note -->
      <div class="mt-8 text-center text-sm font-medium text-slate-500 relative z-10">
        Don't have an account? 
        <a href="#" class="text-indigo-600 font-bold hover:underline underline-offset-2">Create one</a>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Any specific login styles here */
</style>
