<template>
  <main class="relative z-10 pt-12 pb-6 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
    <div class="inline-block px-4 py-1.5 rounded-full bg-white/50 dark:bg-coal/80 backdrop-blur-md border border-white/60 dark:border-white/10 text-sm font-medium mb-8 text-primary shadow-sm animate-bounce">
      modern web aesthetics 💻
    </div>
    
    <h1 class="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6 leading-[0.9]">
      hey, i'm <span class="relative inline-block">
        sasa
        <svg class="absolute -bottom-2 md:-bottom-4 left-0 w-full h-3 md:h-6 text-daisy -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
          <path d="M0 15 Q 50 0 100 15 L 100 20 L 0 20 Z" fill="currentColor"/>
        </svg>
      </span> ✨
    </h1>
    
    <p class="text-xl md:text-3xl max-w-2xl text-coal/80 dark:text-coal/80 mb-12 font-medium leading-relaxed">
      delivering clean code & stunning visuals. it's giving <span class="italic text-primary">creative web developer</span>.
    </p>

    <div class="flex flex-col sm:flex-row gap-4 mb-20 md:mb-32">
      <NuxtLink to="/Contact" class="px-8 py-4 bg-coal text-white dark:text-coal dark:bg-primary rounded-2xl font-bold hover:scale-105 hover:bg-neutral-800 dark:hover:bg-primary-strong transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center gap-2">
        let's connect <Icon name="lucide:sparkles" class="w-5 h-5" />
      </NuxtLink>
      <NuxtLink to="/Lookbook" class="px-8 py-4 bg-white/60 backdrop-blur-md border-[2px] border-white text-coal rounded-2xl font-bold hover:scale-105 transition-all hover:bg-white flex items-center justify-center gap-2">
        view portfolio <Icon name="lucide:arrow-up-right" class="w-5 h-5" />
      </NuxtLink>
    </div>

    <!-- Marquee -->
    <div class="w-[105vw] lg:w-full relative left-1/2 -translate-x-[40%] lg:-translate-x-1/2 overflow-hidden bg-daisy py-4 mb-12 border-y-2 border-coal transform -rotate-2 flex">
      <div class="flex w-max animate-marquee whitespace-nowrap">
        <div class="flex-none flex items-center pr-4">
          <span class="text-2xl md:text-3xl font-display font-bold uppercase tracking-widest inline-flex items-center gap-4">
            modern experiences & clean code <Icon name="lucide:star" class="w-6 h-6 md:w-8 md:h-8" />
            frontend innovator <Icon name="lucide:star" class="w-6 h-6 md:w-8 md:h-8" />
            pixel perfect <Icon name="lucide:star" class="w-6 h-6 md:w-8 md:h-8" />
          </span>
        </div>
        <div class="flex-none flex items-center pr-4">
          <span class="text-2xl md:text-3xl font-display font-bold uppercase tracking-widest inline-flex items-center gap-4">
            modern experiences & clean code <Icon name="lucide:star" class="w-6 h-6 md:w-8 md:h-8" />
            frontend innovator <Icon name="lucide:star" class="w-6 h-6 md:w-8 md:h-8" />
            pixel perfect <Icon name="lucide:star" class="w-6 h-6 md:w-8 md:h-8" />
          </span>
        </div>
      </div>
    </div>
    <!-- Sneak Peek & About Section -->
    <section class="w-full max-w-7xl mx-auto text-left mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- About & Contact Teaser -->
      <div class="md:col-span-2 bg-white/40 dark:bg-white/20 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgba(255,255,255,0.4)] dark:shadow-[0_8px_30px_rgba(12,74,110,0.1)] flex flex-col md:flex-row gap-12 items-center">
        <div class="flex-1">
          <h2 class="font-display text-3xl md:text-5xl font-bold mb-6 flex items-center gap-3 text-coal">the developer 👩‍💻</h2>
          <div class="space-y-4">
            <p class="text-coal/80 text-lg md:text-xl leading-relaxed font-medium">
              a '98 liner (still gen z, right?) with a computer science degree from Multimedia Nusantara University. currently based in Tangerang. 
            </p>
            <p class="text-coal/80 text-lg md:text-xl leading-relaxed font-medium">
              With over 4 years as a Frontend Engineer, i might not be writing the most complex backend architectures, but i am absolutely obsessed with exploring intuitive UX and bringing it to life through highly interactive web experiences.
            </p>
            <p class="text-coal/80 text-lg md:text-xl leading-relaxed font-medium">
              i build fast, responsive, and highly aesthetic web applications. when i'm not optimizing edge cases, i'm probably designing scalable UI components and sipping an iced matcha.
            </p>
          </div>
        </div>
        <div class="w-full md:w-auto">
          <NuxtLink to="/Contact" class="bg-mint/80 hover:bg-mint text-teal-800 border-2 border-teal-200/50 rounded-2xl px-10 py-6 font-bold transition-all flex justify-between md:justify-center items-center gap-4 group shadow-sm hover:shadow-xl hover:-translate-y-1">
            <span class="text-xl">get in touch!</span>
            <Icon name="lucide:contact" class="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>
      </div>

      <p class="text-coal/80 text-lg md:text-xl leading-relaxed font-medium px-6">
        did i talk too much? well here's some of my work, hope u enjoy the interactives.
      </p>

      <!-- Lookbook Teaser -->
      <div class="md:col-span-2 bg-white/40 dark:bg-white/20 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgba(255,183,178,0.2)] dark:shadow-[0_8px_30px_rgba(255,179,138,0.1)] flex flex-col md:flex-row gap-12 items-center overflow-hidden relative group">
        <Icon name="lucide:sparkles" class="absolute -top-10 -right-10 w-48 h-48 text-primary opacity-20 group-hover:rotate-180 transition-all duration-1000" />
        
        <div class="flex-1 relative z-10 flex flex-col h-full justify-center">
          <h2 class="font-display text-3xl md:text-5xl font-bold mb-6 text-primary-deep dark:text-primary">featured work ✨</h2>
          <p class="text-primary-deep/80 dark:text-primary/80 text-lg md:text-xl leading-relaxed font-medium">
            explore the archive. highly functional web apps, modern e-commerce, and creative UI experiments packed into one curated collection.
          </p>
        </div>

        <div class="w-full md:w-[400px] relative z-10">
          <ProjectCard 
            v-if="featuredProject"
            :title="featuredProject.title"
            :desc="featuredProject.desc"
            :image-url="featuredProject.imageUrl"
            :gradient="featuredProject.gradient"
            :tags="featuredProject.tags"
            :url="featuredProject.url"
            class="scale-100 md:scale-110 shadow-2xl"
          />
        </div>

        <div>
          <NuxtLink to="/Lookbook" class="inline-flex relative z-10 bg-primary hover:scale-105 transition-all text-white dark:text-coal rounded-2xl px-10 py-6 font-bold shadow-lg items-center gap-4">
            <span class="text-xl">view lookbook</span>
            <Icon name="lucide:folder-heart" class="w-6 h-6 group-hover:rotate-12 transition-transform" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { projects } from '~/data/projects'

// Initialize with the first project as a safe SSR fallback
const featuredProject = ref(projects[0])

onMounted(() => {
  // Pick a truly random project on the client side
  const randomIndex = Math.floor(Math.random() * projects.length)
  featuredProject.value = projects[randomIndex]
})
</script>
