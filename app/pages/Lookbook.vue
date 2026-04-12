<template>
  <section class="text-left w-full max-w-5xl mx-auto py-8 md:p-0 p-4">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
      <div>
        <div class="inline-block px-3 py-1 bg-blush/30 text-pink-500 font-bold text-xs uppercase tracking-widest rounded-full mb-3">the archive</div>
        <h2 class="font-display text-4xl md:text-6xl font-bold">curated works 📁</h2>
      </div>
      <div class="text-coal/80 text-lg leading-relaxed font-medium mb-6">peep the archive. i've got pop-up shops, tracking apps, and y2k nostalgia all packed into one aesthetic collection.</div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProjectCard 
        v-for="(project, i) in projects" 
        :key="i"
        :title="project.title"
        :desc="project.desc"
        :emoji="project.emoji"
        :gradient="project.gradient"
        :tags="project.tags"
      />
    </div>
  </section>
</template>

<script setup>
const projects = [
  {
    title: 'Pop-up Shop',
    desc: 'e-commerce designed to convert. seamless checkouts and buttery-smooth animations that elevate the user experience.',
    emoji: '🛍️',
    gradient: 'from-blush to-pink-200',
    tags: ['Nuxt 3', 'Tailwind', 'Stripe']
  },
  {
    title: 'Vibe Check App',
    desc: 'a dynamic music player syncing UI to album art. immersive design with flawless performance.',
    emoji: '🎧',
    gradient: 'from-mint to-teal-100',
    tags: ['Vue 3', 'GSAP', 'Spotify API']
  },
  {
    title: 'Matcha AI',
    desc: 'an AI wellness assistant providing highly mindful daily affirmations and actionable advice.',
    emoji: '🍵',
    gradient: 'from-daisy to-yellow-100',
    tags: ['OpenAI', 'Vue 3', 'Vite']
  },
  {
    title: 'Fit Check Tracker',
    desc: 'a social platform for outfit tracking. sleek interactions and scalable architecture delivering a premium user flow.',
    emoji: '📸',
    gradient: 'from-purple-200 to-indigo-100',
    tags: ['React', 'Supabase', 'Framer']
  },
  {
    title: 'Y2K Portfolio',
    desc: 'a creative retrospective portfolio. nostalgic UI patterns blending complex animations with early 2000s cyber aesthetics.',
    emoji: '✨',
    gradient: 'from-pink-300 to-rose-200',
    tags: ['HTML', 'CSS', 'Vibes']
  },
  {
    title: 'Spill The Tea',
    desc: 'a secure, anonymous social platform for college campuses. real-time updates and robust data moderation.',
    emoji: '☕',
    gradient: 'from-orange-100 to-amber-100',
    tags: ['Nuxt 3', 'Firebase']
  }
]
</script>
