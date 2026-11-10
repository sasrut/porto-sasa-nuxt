<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition name="immersive-find-mode-fade">
        <div
          v-show="isActive"
          ref="layerEl"
          class="immersive-find-mode-layer fixed inset-0 z-[90] pointer-events-none"
          :class="{ 'immersive-find-mode-layer--wide': isWideLight }"
          aria-hidden="true"
        />
      </Transition>

      <div
        v-if="isActive"
        class="immersive-find-mode-critters fixed inset-0 z-[89] pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <Motion
          v-for="critter in critters"
          :key="critter.id"
          class="absolute left-0"
          :style="{ top: `${critter.y}vh` }"
          :initial="{ x: critter.startX }"
          :animate="{ x: critter.endX }"
          :transition="{ duration: critter.duration, ease: 'linear' }"
          :on-animation-complete="() => removeCritter(critter.id)"
        >
          <Motion :animate="critter.bob.animate" :transition="critter.bob.transition">
            <Icon
              :name="critter.icon"
              class="w-10 h-10 drop-shadow-lg"
              :class="[critter.color, critter.flip ? 'scale-x-[-1]' : '']"
            />
          </Motion>
        </Motion>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup>
import { ref, onUnmounted, watch } from 'vue'
import { Motion } from 'motion-v'

const immersiveMode = useImmersiveMode()
const isActive = ref(false)
const layerEl = ref(null)
const isWideLight = ref(false)
const critters = ref([])

const CRITTERS = [
  {
    icon: 'lucide:bird',
    color: 'text-daisy',
    flippable: true,
    y: [8, 28],
    duration: [9, 12],
    bob: { animate: { y: [0, -18, 0] }, transition: { duration: 0.9, repeat: Infinity, ease: 'easeInOut' } },
  },
  {
    icon: 'lucide:fish',
    color: 'text-primary',
    flippable: true,
    y: [40, 60],
    duration: [8, 11],
    bob: { animate: { rotate: [-8, 8, -8] }, transition: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' } },
  },
  {
    icon: 'lucide:turtle',
    color: 'text-mint',
    flippable: true,
    y: [74, 80],
    duration: [26, 32],
    bob: { animate: { rotate: [-4, 4, -4] }, transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } },
  },
  {
    icon: 'lucide:rabbit',
    color: 'text-blush',
    flippable: true,
    y: [72, 78],
    duration: [6, 8],
    bob: { animate: { y: [0, -26, 0] }, transition: { duration: 0.5, repeat: Infinity, ease: 'easeOut' } },
  },
  {
    icon: 'lucide:dog',
    color: 'text-primary',
    flippable: false,
    y: [72, 78],
    duration: [8, 10],
    bob: { animate: { y: [0, -6, 0] }, transition: { duration: 0.35, repeat: Infinity, ease: 'easeInOut' } },
  },
  {
    icon: 'lucide:cat',
    color: 'text-daisy',
    flippable: false,
    y: [72, 78],
    duration: [9, 12],
    bob: { animate: { y: [0, -4, 0] }, transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' } },
  },
]
const MAX_CRITTERS = 4

let critterId = 0
let spawnTimerId = 0
let pointerX = 0
let pointerY = 0
let rafId = 0

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function spawnCritter() {
  const kind = CRITTERS[Math.floor(Math.random() * CRITTERS.length)]
  const width = window.innerWidth
  const fromLeft = Math.random() < 0.5

  critters.value.push({
    id: ++critterId,
    icon: kind.icon,
    color: kind.color,
    bob: kind.bob,
    y: randomBetween(kind.y[0], kind.y[1]),
    duration: randomBetween(kind.duration[0], kind.duration[1]),
    startX: fromLeft ? -120 : width + 120,
    endX: fromLeft ? width + 120 : -120,
    flip: kind.flippable && !fromLeft,
  })
}

function removeCritter(id) {
  critters.value = critters.value.filter((critter) => critter.id !== id)
}

function scheduleSpawn() {
  spawnTimerId = window.setTimeout(() => {
    if (critters.value.length < MAX_CRITTERS) spawnCritter()
    scheduleSpawn()
  }, randomBetween(1800, 4000))
}

function setLight(x, y) {
  const layer = layerEl.value
  if (!layer) return
  layer.style.setProperty('--x', x)
  layer.style.setProperty('--y', y)
}

function renderLight() {
  rafId = 0
  setLight(`${pointerX}px`, `${pointerY}px`)
}

function scheduleLight() {
  if (!rafId) rafId = requestAnimationFrame(renderLight)
}

function onPointerMove(e) {
  if (e.pointerType === 'touch') return
  pointerX = e.clientX
  pointerY = e.clientY
  scheduleLight()
}

function onPointerOut(e) {
  if (e.relatedTarget) return
  pointerX = -1000
  pointerY = -1000
  scheduleLight()
}

function activate() {
  isActive.value = true
  isWideLight.value = false
  document.body.classList.add('immersive-find-mode-active')

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    spawnCritter()
    spawnCritter()
    scheduleSpawn()
  }

  if (!window.matchMedia('(pointer: fine)').matches) {
    setLight('50%', '50%')
    isWideLight.value = true
    return
  }

  pointerX = window.innerWidth / 2
  pointerY = window.innerHeight / 2
  renderLight()

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  document.addEventListener('pointerout', onPointerOut)
}

function deactivate() {
  isActive.value = false
  document.body.classList.remove('immersive-find-mode-active')
  window.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('pointerout', onPointerOut)
  cancelAnimationFrame(rafId)
  rafId = 0
  window.clearTimeout(spawnTimerId)
  critters.value = []
}

watch(immersiveMode, (mode) => {
  if (mode === 'find' && !isActive.value) activate()
  else if (mode !== 'find' && isActive.value) deactivate()
})

onUnmounted(() => {
  deactivate()
})
</script>

<style>
body.immersive-find-mode-active,
body.immersive-find-mode-active * {
  cursor: url('/cursors/flashlight.svg') 6 6, auto !important;
}

body.immersive-find-mode-active input,
body.immersive-find-mode-active textarea {
  cursor: text !important;
}

body.immersive-find-mode-active .fun-mode-switch {
  cursor: pointer !important;
}
</style>

<style scoped>
.immersive-find-mode-layer {
  --x: 50%;
  --y: 50%;
  background: rgba(45, 42, 38, 0.96);
  -webkit-mask-image: radial-gradient(circle 150px at var(--x) var(--y), transparent 110px, #000 150px);
  mask-image: radial-gradient(circle 150px at var(--x) var(--y), transparent 110px, #000 150px);
}

.immersive-find-mode-layer--wide {
  -webkit-mask-image: radial-gradient(ellipse 60vw 35vh at 50% 50%, transparent 75%, #000 100%);
  mask-image: radial-gradient(ellipse 60vw 35vh at 50% 50%, transparent 75%, #000 100%);
}

.immersive-find-mode-fade-enter-active,
.immersive-find-mode-fade-leave-active {
  transition: opacity 0.35s ease;
}

.immersive-find-mode-fade-enter-from,
.immersive-find-mode-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .immersive-find-mode-fade-enter-active,
  .immersive-find-mode-fade-leave-active {
    transition: none;
  }
}
</style>
