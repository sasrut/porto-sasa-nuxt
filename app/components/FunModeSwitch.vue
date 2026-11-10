<template>
  <ClientOnly>
    <Teleport to="body">
      <button
        type="button"
        class="fun-mode-switch animate-bounce fixed max-md:bottom-32 max-md:left-1/2 max-md:-translate-x-1/2 md:bottom-8 md:left-8 z-[100] box-border inline-flex items-center gap-2 px-3 py-2 text-xs md:text-sm leading-normal rounded-2xl md:rounded-full font-bold shadow-lg border-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        :class="buttonClasses"
        :aria-label="`Fun Mode: ${stateLabel}. Tap to change.`"
        @click="cycle"
      >
        <Icon
          :name="isOn ? 'lucide:toggle-right' : 'lucide:toggle-left'"
          class="w-5 h-5 shrink-0"
          :class="{ 'fun-mode-switch__icon--on': isOn }"
        />
        <span class="whitespace-nowrap">
          <span class="hidden md:inline">Fun Mode: </span>{{ stateLabel }}
        </span>
      </button>
    </Teleport>
  </ClientOnly>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'

const immersiveMode = useImmersiveMode()

const STATE_LABELS = { amaze: 'Amaze Me', find: 'Find Me' }

const isOn = computed(() => immersiveMode.value !== null)
const stateLabel = computed(() => STATE_LABELS[immersiveMode.value] ?? 'Off')

const buttonClasses = computed(() =>
  isOn.value
    ? 'fun-mode-switch--on text-coal border-blush/80'
    : 'bg-white/80 dark:bg-coal/80 text-coal backdrop-blur-md border-white/60 dark:border-white/10 hover:bg-white shadow-primary/25'
)

function cycle() {
  cycleImmersiveMode()
}

function onKeydown(e) {
  if (e.key === 'Escape' && isOn.value) immersiveMode.value = null
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.fun-mode-switch--on {
  background: linear-gradient(
    120deg,
    var(--color-primary) 0%,
    var(--color-secondary) 45%,
    var(--bg-page) 100%
  );
  box-shadow:
    0 4px 18px rgba(236, 72, 153, 0.28),
    0 2px 8px rgba(251, 235, 159, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.65);
}

.fun-mode-switch__icon--on {
  filter: drop-shadow(0 0 4px rgba(251, 235, 159, 0.9));
}
</style>
