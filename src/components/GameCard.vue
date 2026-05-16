<script setup lang="ts">
import { computed } from 'vue'
import { PhPlay } from '@phosphor-icons/vue'

const props = defineProps<{
  title: string
  description: string
  color: 'pink' | 'blue' | 'yellow' | 'green'
}>()

const colorClasses = computed(() => {
  const map = {
    pink: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700', iconBg: 'bg-pink-100', iconText: 'text-pink-500', btn: 'from-pink-400 to-rose-400 shadow-[0_4px_0_#be185d]', btnText: 'text-white' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', iconBg: 'bg-blue-100', iconText: 'text-blue-500', btn: 'from-blue-400 to-cyan-400 shadow-[0_4px_0_#1d4ed8]', btnText: 'text-white' },
    yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', iconBg: 'bg-yellow-100', iconText: 'text-yellow-500', btn: 'from-yellow-400 to-orange-400 shadow-[0_4px_0_#a16207]', btnText: 'text-white' },
    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', iconBg: 'bg-green-100', iconText: 'text-green-500', btn: 'from-emerald-400 to-green-500 shadow-[0_4px_0_#047857]', btnText: 'text-white' },
  } as const
  return map[props.color] || map.blue
})
</script>

<template>
  <div :class="[colorClasses.bg, 'border-4 border-b-8 p-6 md:p-8 rounded-[2.5rem] flex flex-col gap-6 hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-2', colorClasses.border]">
    <div class="flex items-center gap-6">
        <div :class="['w-24 h-24 rounded-[1.5rem] flex items-center justify-center border-4 border-white shadow-sm shrink-0 group-hover:scale-110 transition-transform group-hover:rotate-6', colorClasses.iconBg, colorClasses.iconText]">
            <slot name="icon"></slot>
        </div>
        <div class="flex-1">
            <h3 :class="['text-2xl md:text-3xl font-extrabold tracking-tight mb-2', colorClasses.text]">{{ title }}</h3>
            <p class="text-slate-500 font-bold leading-relaxed">{{ description }}</p>
        </div>
    </div>
    
    <div class="mt-auto pt-2">
      <button :class="['w-full py-4 rounded-full font-extrabold text-xl flex items-center justify-center gap-2 border-4 border-white transition-all bg-gradient-to-r active:translate-y-1 group-hover:brightness-110 active:shadow-[0_0px_0_transparent]', colorClasses.btn, colorClasses.btnText]">
        Play Now
        <PhPlay weight="fill" />
      </button>
    </div>
  </div>
</template>
