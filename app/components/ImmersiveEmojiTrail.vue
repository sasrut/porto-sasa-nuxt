<template>
  <ClientOnly>
    <Teleport to="body">
      <div
        v-show="isActive"
        ref="layerEl"
        class="immersive-trail-layer fixed inset-0 z-[85] select-none"
        :class="{ 'overflow-hidden': useLiteTrail }"
        aria-hidden="true"
      >
        <template v-if="!useLiteTrail">
          <span
            v-for="particle in particles"
            :key="particle.id"
            class="immersive-trail-particle immersive-trail-particle--desktop absolute pointer-events-none will-change-transform"
            :style="particleStyle(particle)"
          >
            {{ particle.emoji }}
          </span>
        </template>
      </div>

      <button
        type="button"
        class="immersive-trail-toggle fixed top-[18px] right-4 z-[100] box-border max-md:inline-flex max-md:items-center max-md:justify-center max-md:w-[4.25rem] max-md:min-h-[2.75rem] max-md:px-3 max-md:py-2.5 max-md:text-xs max-md:leading-snug max-md:rounded-2xl md:top-auto md:right-auto md:bottom-8 md:left-8 md:inline md:w-auto md:min-h-0 md:px-3.5 md:py-2 md:text-sm md:leading-normal md:rounded-full font-bold shadow-lg border-2 transition-all active:scale-95 cursor-pointer"
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
const useLiteTrail = ref(false)
const layerEl = ref(null)
const particles = ref([])

const FOOD = ['🍕', '🍔', '🍣', '🍩', '🍓', '🥑', '🌮', '🍜', '🧋', '🍰', '🍉', '🥐']
const RAINBOW = ['🌈', '✨', '💫', '⭐', '🌟', '🦄', '💜', '💙', '💚', '💛', '🧡', '❤️']
const EXPRESSIONS = ['😍', '🤩', '🥳', '😋', '🎉', '💖', '🔥', '😮', '🥰', '😆', '🤤', '👀']
const EMOJI_POOL = [...FOOD, ...RAINBOW, ...EXPRESSIONS]

const FOOD_LITE = ['🍕', '🍔', '🍣', '🍩', '🍓', '🌮', '🧋', '🍰']
const RAINBOW_LITE = ['🌈', '✨', '⭐', '🌟', '💛', '💖']
const EXPRESSIONS_LITE = ['😍', '🤩', '🥳', '😋', '🎉', '🥰']
const EMOJI_POOL_LITE = [...FOOD_LITE, ...RAINBOW_LITE, ...EXPRESSIONS_LITE]

const DESKTOP_MAX_PARTICLES = 100
const DESKTOP_SPAWN_INTERVAL_MS = 28
const DESKTOP_BURST_MIN = 2
const DESKTOP_BURST_MAX = 5

/** @type {{ interval: number, burst: number, maxLive: number } | null} */
let liteLimits = null
let lastSpawnAt = 0
let liveCount = 0
let prefersReducedMotion = false

let particleId = 0
let rafId = 0
let lastFrameAt = 0

const buttonClasses = computed(() =>
  isActive.value
    ? 'immersive-trail-toggle--active text-coal border-blush/80 hover:scale-105'
    : 'bg-white/80 dark:bg-coal/80 text-coal backdrop-blur-md border-white/60 dark:border-white/10 hover:scale-105 hover:bg-white shadow-primary/25'
)

/** Match Tailwind `md` — lite trail only on small viewports, not touch-capable desktops */
function isMobileViewport() {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

function isLowMemoryDevice() {
  return (
    typeof navigator !== 'undefined' &&
    navigator.deviceMemory > 0 &&
    navigator.deviceMemory <= 4
  )
}

function readLiteLimits() {
  if (isLowMemoryDevice()) {
    return { interval: 64, burst: 12, maxLive: 32 }
  }
  return { interval: 64, burst: 18, maxLive: 50 }
}

function pickEmoji(lite) {
  const pool = lite ? EMOJI_POOL_LITE : EMOJI_POOL
  return pool[(Math.random() * pool.length) | 0]
}

function clearLiteLayer() {
  const layer = layerEl.value
  if (!layer) return
  layer.querySelectorAll('.immersive-trail-particle--lite').forEach((el) => el.remove())
  liveCount = 0
}

function spawnBurstLite(x, y) {
  if (!isActive.value || !useLiteTrail.value || prefersReducedMotion) return
  if (typeof document !== 'undefined' && document.hidden) return

  const layer = layerEl.value
  if (!layer || !liteLimits) return

  const now = performance.now()
  if (now - lastSpawnAt < liteLimits.interval) return
  lastSpawnAt = now

  if (liveCount >= liteLimits.maxLive) return

  const count = Math.min(liteLimits.burst, liteLimits.maxLive - liveCount)

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const dist = 36 + Math.random() * 52
    const dx = Math.cos(angle) * dist
    const dy = Math.sin(angle) * dist + 18 + Math.random() * 22
    const rot = (Math.random() * 240 - 120).toFixed(0)
    const duration = (0.62 + Math.random() * 0.28).toFixed(2)

    const el = document.createElement('span')
    el.className = 'immersive-trail-particle immersive-trail-particle--lite'
    el.textContent = pickEmoji(true)
    el.style.left = `${x}px`
    el.style.top = `${y}px`
    el.style.setProperty('--dx', `${dx.toFixed(1)}px`)
    el.style.setProperty('--dy', `${dy.toFixed(1)}px`)
    el.style.setProperty('--rot', `${rot}deg`)
    el.style.animationDuration = `${duration}s`

    const onDone = () => {
      el.remove()
      liveCount = Math.max(0, liveCount - 1)
    }
    el.addEventListener('animationend', onDone, { once: true })
    el.addEventListener('animationcancel', onDone, { once: true })

    layer.appendChild(el)
    liveCount++
  }
}

function spawnBurstDesktop(x, y) {
  if (!isActive.value || useLiteTrail.value || prefersReducedMotion) return
  if (typeof document !== 'undefined' && document.hidden) return

  const now = performance.now()
  if (now - lastSpawnAt < DESKTOP_SPAWN_INTERVAL_MS) return
  lastSpawnAt = now

  const count =
    DESKTOP_BURST_MIN + Math.floor(Math.random() * (DESKTOP_BURST_MAX - DESKTOP_BURST_MIN + 1))
  const next = [...particles.value]

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = 1.8 + Math.random() * 4.2
    next.push({
      id: ++particleId,
      emoji: pickEmoji(false),
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

  particles.value =
    next.length > DESKTOP_MAX_PARTICLES ? next.slice(-DESKTOP_MAX_PARTICLES) : next
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
  if (!isActive.value || useLiteTrail.value) return

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

  if (useLiteTrail.value) {
    if (e.pointerType === 'mouse') return
    spawnBurstLite(e.clientX, e.clientY)
  } else {
    spawnBurstDesktop(e.clientX, e.clientY)
  }
}

function onTouchMove(e) {
  if (!isActive.value || useLiteTrail.value) return
  if (!e.touches.length) return
  const touch = e.touches[0]
  spawnBurstDesktop(touch.clientX, touch.clientY)
}

function setBodyTrailState(active) {
  if (typeof document === 'undefined' || typeof window === 'undefined') return
  if (!active) {
    document.body.classList.remove('immersive-trail-active')
    return
  }
  if (useLiteTrail.value) {
    document.body.classList.toggle(
      'immersive-trail-active',
      window.matchMedia('(pointer: fine)').matches
    )
  } else {
    document.body.classList.add('immersive-trail-active')
  }
}

function onVisibilityChange() {
  if (!document.hidden || !isActive.value) return
  if (useLiteTrail.value) clearLiteLayer()
  else particles.value = []
}

function startDesktopLoop() {
  lastFrameAt = 0
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(tick)
}

function stopDesktopLoop() {
  cancelAnimationFrame(rafId)
  rafId = 0
  lastFrameAt = 0
}

function attachListeners() {
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  if (!useLiteTrail.value) {
    window.addEventListener('touchmove', onTouchMove, { passive: true })
  }
  document.addEventListener('visibilitychange', onVisibilityChange)
}

function detachListeners() {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('touchmove', onTouchMove)
  document.removeEventListener('visibilitychange', onVisibilityChange)
}

function activate() {
  if (typeof window !== 'undefined') {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    useLiteTrail.value = isMobileViewport()
    liteLimits = useLiteTrail.value ? readLiteLimits() : null
  } else {
    useLiteTrail.value = true
    liteLimits = readLiteLimits()
  }

  isActive.value = true
  lastSpawnAt = 0
  particles.value = []
  clearLiteLayer()

  setBodyTrailState(true)
  attachListeners()

  if (!useLiteTrail.value) startDesktopLoop()
}

function deactivate() {
  isActive.value = false
  setBodyTrailState(false)
  detachListeners()
  stopDesktopLoop()
  particles.value = []
  clearLiteLayer()
  liteLimits = null
  lastSpawnAt = 0
  useLiteTrail.value = false
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

.immersive-trail-particle--desktop {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.12));
  line-height: 1;
}

.immersive-trail-particle--lite {
  position: absolute;
  pointer-events: none;
  line-height: 1;
  font-size: 1.25rem;
  will-change: transform, opacity;
  transform: translate3d(-50%, -50%, 0);
  animation: immersive-trail-scatter ease-out forwards;
}

@keyframes immersive-trail-scatter {
  0% {
    transform: translate3d(-50%, -50%, 0) scale(0.45) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translate3d(calc(-50% + var(--dx)), calc(-50% + var(--dy)), 0) scale(1)
      rotate(var(--rot));
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .immersive-trail-particle--lite {
    animation: none;
    opacity: 0;
  }
}
</style>

<style scoped>
.immersive-trail-layer {
  pointer-events: none;
}

@media (max-width: 767px) {
  .immersive-trail-toggle-label {
    text-wrap: balance;
  }
}

.immersive-trail-layer.overflow-hidden {
  contain: strict;
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
