<template>
  <ClientOnly>
    <Transition name="fade">
      <button 
        v-show="isVisible" 
        @click="scrollToTop" 
        class="fixed bottom-24 md:bottom-8 right-6 md:right-8 z-[100] w-12 h-12 rounded-full bg-primary text-white dark:text-coal flex items-center justify-center shadow-lg shadow-primary/40 hover:bg-primary-strong hover:scale-110 active:scale-95 transition-all outline-none border-[3px] border-white dark:border-white/10 group cursor-pointer"
        aria-label="Back to top"
      >
        <Icon name="lucide:arrow-up" class="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
    </Transition>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const checkScroll = () => {
  isVisible.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
  // Initial check
  checkScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}
</style>
