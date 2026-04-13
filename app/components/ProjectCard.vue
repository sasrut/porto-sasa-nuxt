<template>
  <div class="group relative rounded-2xl bg-white/40 dark:bg-white/20 backdrop-blur-xl border-[4px] border-secondary p-2 overflow-hidden hover:-translate-y-3 transition-transform duration-500 shadow-[0_8px_30px_rgba(255,255,255,0.4)] dark:shadow-[0_8px_30px_rgba(12,74,110,0.1)] flex flex-col h-full cursor-pointer">
    <div :class="['aspect-[4/3] w-full rounded-xl mb-6 flex items-center justify-center overflow-hidden transition-all duration-700 group-hover:shadow-inner bg-gradient-to-br', gradient]">
      <img 
        :src="imageUrl" 
        :alt="title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
      />
    </div>
    
    <div v-if="tags && tags.length" class="flex flex-wrap gap-2 mb-4">
      <span v-for="tag in tags" :key="tag" class="px-3 py-1 bg-white/60 dark:bg-white/85 rounded-full text-[10px] font-bold uppercase tracking-widest text-coal/80 shadow-sm">{{ tag }}</span>
    </div>
    
    <h3 class="text-2xl font-display font-bold mb-3 tracking-tight group-hover:text-primary transition-colors text-coal font-display">{{ title }}</h3>
    <p class="font-sans text-[#888] dark:text-coal/80 font-medium text-sm leading mb-6 flex-grow">{{ desc }}</p>
    
    <div class="mt-auto flex justify-between items-center border-t border-primary/20 dark:border-white/10 pt-4">
      <span class="text-xs font-bold text-coal/50 uppercase tracking-widest truncate block max-w-[180px]">
        {{ formattedButtonText }}
      </span>
      <NuxtLink 
        v-if="url"
        :to="url" 
        target="_blank"
        rel="noopener noreferrer"
        class="w-10 h-10 rounded-full bg-coal dark:bg-primary-deep text-white dark:text-coal flex items-center justify-center hover:bg-primary transition-all hover:scale-110 active:scale-95 group-hover:rotate-45 duration-300"
      >
        <Icon name="lucide:arrow-up-right" class="w-5 h-5" />
      </NuxtLink>
      <div v-else class="w-10 h-10 rounded-full bg-coal/20 dark:bg-primary-deep/20 text-white/50 dark:text-coal/50 flex items-center justify-center cursor-not-allowed">
        <Icon name="lucide:arrow-up-right" class="w-5 h-5" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Untitled Project'
  },
  desc: {
    type: String,
    default: 'an aesthetic project.'
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'
  },
  gradient: {
    type: String,
    default: 'from-pink-200 to-rose-100'
  },
  tags: {
    type: Array,
    default: () => []
  },
  url: {
    type: String,
    default: ''
  },
  buttonText: {
    type: String,
    default: ''
  }
})

const formattedButtonText = computed(() => {
  const text = props.buttonText || `lookup ${props.title}`
  // Truncate at 30 characters for best fit in the card UI
  return text.length > 100 ? text.substring(0, 97) + '...' : text
})
</script>
