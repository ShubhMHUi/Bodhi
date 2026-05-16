<script setup lang="ts">
import AppSidebar from "../components/AppSidebar.vue";
import AppFooter from "../components/AppFooter.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <!-- Use a playful background color for kids (blue-50/sky-100) -->
  <div
    class="flex h-screen w-full bg-sky-50 text-slate-800 overflow-hidden font-sans selection:bg-pink-400 selection:text-white relative"
  >
    <!-- Bubble Decorations -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        class="absolute -top-[10%] -right-[5%] w-[40vw] h-[40vw] bg-pink-300/30 rounded-full blur-[80px] animate-pulse-[4s]"
      ></div>
      <div
        class="absolute top-[40%] -left-[10%] w-[30vw] h-[30vw] bg-yellow-300/30 rounded-full blur-[80px]"
      ></div>
      <div
        class="absolute bottom-[10%] right-[20%] w-[20vw] h-[20vw] bg-blue-300/30 rounded-full blur-[80px]"
      ></div>
    </div>

    <!-- Collapsible Sidebar with Floating Layout -->
    <AppSidebar
      v-if="!route.meta.hideSidebar"
      class="z-20 my-4 ml-4 md:my-6 md:ml-6 h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)]"
    />

    <!-- Main Content Area -->
    <main class="flex-1 overflow-x-hidden overflow-y-auto h-full relative z-10 w-full p-4 md:p-8 scroll-smooth" :class="{ 'pl-4 md:pl-8': route.meta.hideSidebar }">
      <div class="max-w-7xl mx-auto w-full min-h-full relative flex flex-col justify-between">
        <div class="flex-1">
          <slot />
        </div>

        <!-- Footer explicitly placed inside the scroll area to avoid squishing content on shorter screens -->
        <AppFooter v-if="!route.meta.hideSidebar" class="shrink-0 z-20 mt-8" />
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Playful colorful scrollbar */
main::-webkit-scrollbar {
  width: 16px;
}
main::-webkit-scrollbar-track {
  background: white;
  border-radius: 12px;
  margin: 12px;
  border: 2px solid #e0f2fe;
}
main::-webkit-scrollbar-thumb {
  background: #f472b6;
  border-radius: 12px;
  border: 4px solid white;
}
main::-webkit-scrollbar-thumb:hover {
  background: #ec4899;
}
</style>
