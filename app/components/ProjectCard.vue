<template>
  <div class="group relative rounded-2xl bg-white/40 backdrop-blur-xl border-[4px] border-[#FEE7AF] p-2 overflow-hidden hover:-translate-y-3 transition-transform duration-500 shadow-[0_8px_30px_rgb(255,255,255,0.4)] flex flex-col h-full">
    <div :class="['aspect-[4/3] w-full rounded-xl mb-6 flex items-center justify-center overflow-hidden transition-all duration-700 group-hover:shadow-inner bg-gradient-to-br', gradient]">
      <div class="text-6xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 filter drop-shadow-md">{{ emoji }}</div>
    </div>
    
    <div v-if="tags && tags.length" class="flex flex-wrap gap-2 mb-4">
      <span v-for="tag in tags" :key="tag" class="px-3 py-1 bg-white/60 rounded-full text-[10px] font-bold uppercase tracking-widest text-coal/80 shadow-sm">{{ tag }}</span>
    </div>
    
    <h3 class="text-2xl font-display font-bold mb-3 tracking-tight group-hover:text-pink-500 transition-colors">{{ title }}</h3>
    <p class="text-coal/70 font-medium text-sm leading-relaxed mb-6 flex-grow">{{ desc }}</p>
    
    <div class="mt-auto flex justify-between items-center border-t border-white/40 pt-4">
      <span class="text-xs font-bold text-coal/50 uppercase tracking-widest">{{ buttonText || `lookup ${title}` }}</span>
      <button class="w-8 h-8 rounded-full bg-coal text-white flex items-center justify-center hover:bg-pink-500 transition-colors group-hover:rotate-45 duration-300">
        <Icon name="lucide:arrow-up-right" class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Untitled Project'
  },
  desc: {
    type: String,
    default: 'an aesthetic project.'
  },
  emoji: {
    type: String,
    default: '✨'
  },
  gradient: {
    type: String,
    default: 'from-pink-200 to-rose-100'
  },
  tags: {
    type: Array,
    default: () => []
  },
  buttonText: {
    type: String,
    default: ''
  }
})
</script>
