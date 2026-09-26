<template>
  <ClientOnly>
    <Teleport to="body">
      <div
        v-show="isActive"
        class="immersive-trail-layer fixed inset-0 z-[85] select-none"
        aria-hidden="true"
      >
        <span
          v-for="particle in particles"
          :key="particle.id"
          class="immersive-trail-particle absolute pointer-events-none will-change-transform"
          :style="particleStyle(particle)"
        >
          {{ particle.emoji }}
        </span>
      </div>

      <button
        type="button"
        class="immersive-trail-toggle fixed top-5 right-5 md:top-auto md:right-auto md:bottom-8 md:left-8 z-[100] px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg border-2 transition-all active:scale-95 cursor-pointer"
        :class="buttonClasses"
        :aria-pressed="isActive"
        :aria-label="isActive ? 'Stop emoji trail and restore normal pointer' : 'Try interactive emoji trail'"
        @click="toggle"
      >
        {{ isActive ? 'Amazing!' : 'Amaze Me!' }}
      </button>
    </Teleport>
  </ClientOnly>
</template>

<script setup>
import { ref, computed, onUnmounted, watch } from 'vue'

const isActive = ref(false)

const FOOD = ['🍕', '🍔', '🍣', '🍩', '🍓', '🥑', '🌮', '🍜', '🧋', '🍰', '🍉', '🥐']
const RAINBOW = ['🌈', '✨', '💫', '⭐', '🌟', '🦄', '💜', '💙', '💚', '💛', '🧡', '❤️']
const EXPRESSIONS = ['😍', '🤩', '🥳', '😋', '🎉', '💖', '🔥', '😮', '🥰', '😆', '🤤', '👀']

const EMOJI_POOL = [...FOOD, ...RAINBOW, ...EXPRESSIONS]

const MAX_PARTICLES = 100
const SPAWN_INTERVAL_MS = 28
const BURST_MIN = 2
const BURST_MAX = 5

let particleId = 0
let lastSpawnAt = 0
let rafId = 0
let lastFrameAt = 0

const particles = ref([])

const buttonClasses = computed(() =>
  isActive.value
    ? 'immersive-trail-toggle--active text-coal border-blush/80 hover:scale-105'
    : 'bg-white/80 dark:bg-coal/80 text-coal backdrop-blur-md border-white/60 dark:border-white/10 hover:scale-105 hover:bg-white shadow-primary/25'
)

function pickEmoji() {
  return EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)]
}

function spawnBurst(x, y) {
  const now = performance.now()
  if (now - lastSpawnAt < SPAWN_INTERVAL_MS) return
  lastSpawnAt = now

  const count = BURST_MIN + Math.floor(Math.random() * (BURST_MAX - BURST_MIN + 1))
  const next = [...particles.value]

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = 1.8 + Math.random() * 4.2
    next.push({
      id: ++particleId,
      emoji: pickEmoji(),
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.2,
      life: 1,
      decay: 0.012 + Math.random() * 0.014,
      rotation: Math.random() * 360,
      spin: (Math.random() - 0.5) * 14,
      size: 0.85 + Math.random() * 0.65,
    })
  }

  particles.value = next.length > MAX_PARTICLES ? next.slice(-MAX_PARTICLES) : next
}

function particleStyle(p) {
  const scale = p.size * (0.35 + p.life * 0.85)
  return {
    left: `${p.x}px`,
    top: `${p.y}px`,
    transform: `translate(-50%, -50%) rotate(${p.rotation}deg) scale(${scale})`,
    opacity: Math.min(1, p.life * 1.15),
    fontSize: `${18 + p.size * 10}px`,
  }
}

function tick(now) {
  if (!isActive.value) return

  const dt = lastFrameAt ? Math.min(32, now - lastFrameAt) / 16.67 : 1
  lastFrameAt = now

  const gravity = 0.08 * dt
  const drag = Math.pow(0.96, dt)

  particles.value = particles.value
    .map((p) => ({
      ...p,
      x: p.x + p.vx * dt,
      y: p.y + p.vy * dt,
      vx: p.vx * drag,
      vy: (p.vy + gravity) * drag,
      rotation: p.rotation + p.spin * dt,
      life: p.life - p.decay * dt,
    }))
    .filter((p) => p.life > 0)

  rafId = requestAnimationFrame(tick)
}

function onPointerMove(e) {
  if (!isActive.value) return
  spawnBurst(e.clientX, e.clientY)
}

function onTouchMove(e) {
  if (!isActive.value || !e.touches.length) return
  const touch = e.touches[0]
  spawnBurst(touch.clientX, touch.clientY)
}

function setBodyTrailState(active) {
  if (typeof document === 'undefined') return
  document.body.classList.toggle('immersive-trail-active', active)
}

function startLoop() {
  lastFrameAt = 0
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(tick)
}

function stopLoop() {
  cancelAnimationFrame(rafId)
  rafId = 0
  lastFrameAt = 0
}

function attachListeners() {
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('touchmove', onTouchMove, { passive: true })
}

function detachListeners() {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('touchmove', onTouchMove)
}

function activate() {
  isActive.value = true
  particles.value = []
  lastSpawnAt = 0
  setBodyTrailState(true)
  attachListeners()
  startLoop()
}

function deactivate() {
  isActive.value = false
  setBodyTrailState(false)
  detachListeners()
  stopLoop()
  particles.value = []
}

function toggle() {
  if (isActive.value) deactivate()
  else activate()
}

watch(isActive, (active) => {
  if (!active) setBodyTrailState(false)
})

onUnmounted(() => {
  deactivate()
  setBodyTrailState(false)
})
</script>

<style>
body.immersive-trail-active {
  cursor: none !important;
}

body.immersive-trail-active a,
body.immersive-trail-active button:not(.immersive-trail-toggle) {
  cursor: none !important;
}

body.immersive-trail-active .immersive-trail-toggle {
  cursor: pointer !important;
}
</style>

<style scoped>
.immersive-trail-layer {
  pointer-events: none;
}

.immersive-trail-particle {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.12));
  line-height: 1;
}

.immersive-trail-toggle--active {
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
  animation: immersive-trail-cute-pop 2.2s ease-in-out infinite;
}

@keyframes immersive-trail-cute-pop {
  0%,
  100% {
    transform: scale(1);
    box-shadow:
      0 4px 18px rgba(236, 72, 153, 0.28),
      0 2px 8px rgba(251, 235, 159, 0.55),
      inset 0 1px 0 rgba(255, 255, 255, 0.65);
  }
  50% {
    transform: scale(1.04);
    box-shadow:
      0 6px 22px rgba(236, 72, 153, 0.38),
      0 4px 12px rgba(254, 249, 225, 0.7),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }
}
</style>
