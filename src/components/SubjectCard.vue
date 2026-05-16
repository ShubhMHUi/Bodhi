<script setup lang="ts">
import { computed } from 'vue'
import { PhBookOpen } from '@phosphor-icons/vue'

const props = defineProps<{
  title: string
  progress: number
  color: 'indigo' | 'rose' | 'green' | 'blue' | 'yellow' | 'purple'
}>()

const colorClasses = computed(() => {
  const map = {
    indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', barBg: 'border-indigo-200', barFill: 'bg-indigo-400', iconWrapper: 'border-indigo-100' },
    rose: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', barBg: 'border-rose-200', barFill: 'bg-rose-400', iconWrapper: 'border-rose-100' },
    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', barBg: 'border-green-200', barFill: 'bg-green-400', iconWrapper: 'border-green-100' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', barBg: 'border-blue-200', barFill: 'bg-blue-400', iconWrapper: 'border-blue-100' },
    yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', barBg: 'border-yellow-200', barFill: 'bg-yellow-400', iconWrapper: 'border-yellow-100' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', barBg: 'border-purple-200', barFill: 'bg-purple-400', iconWrapper: 'border-purple-100' },
  } as const
  return map[props.color] || map.indigo
})
</script>

<template>
  <div :class="[colorClasses.bg, 'border-4 p-6 rounded-2xl flex items-center gap-6 hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-1', colorClasses.border]">
    <div :class="['w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-sm border-4 group-hover:scale-110 transition-transform -rotate-6 shrink-0', colorClasses.iconWrapper]">
        <slot name="icon">
          <PhBookOpen :size="48" weight="duotone" class="text-slate-400" />
        </slot>
    </div>
    <div class="flex-1">
        <h3 :class="['text-2xl font-extrabold mb-3', colorClasses.text]">{{ title }}</h3>
        <div :class="['w-full bg-white h-5 rounded-full border-2 overflow-hidden relative', colorClasses.barBg]">
            <div :class="['h-full rounded-full absolute left-0 top-0', colorClasses.barFill]" :style="{ width: `${progress}%` }"></div>
        </div>
        <p :class="[colorClasses.text, 'font-extrabold text-sm mt-3 opacity-90']">{{ progress }}% Complete!</p>
    </div>
  </div>
</template>
