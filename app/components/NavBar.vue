<template>
  <nav class="relative z-[99] w-full px-6 py-6 md:px-12 flex justify-between items-center">
    <div class="flex items-center gap-4">
      <NuxtLink to="/" class="font-display font-bold text-2xl tracking-tighter hover:scale-105 transition-transform cursor-pointer">
        Hanasya Shabrina
      </NuxtLink>
      <button 
        @click="$colorMode.preference = $colorMode.value === 'dark' ? 'light' : 'dark'"
        class="p-2 flex items-center rounded-xl bg-white/50 dark:bg-coal/50 border border-white dark:border-white/10 shadow-sm hover:scale-110 transition-all"
        aria-label="Toggle Theme"
      >
        <Icon 
          :name="$colorMode.value === 'dark' ? 'lucide:sunset' : 'lucide:sun'" 
          class="w-5 h-5 text-coal transition-colors" 
        />
      </button>
    </div>
    <!-- Navigation List (Desktop & Mobile Bottom Bar) -->
    <ul class="fixed bottom-16 left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:flex bg-white/70 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border md:border-none border-white/50 px-8 py-3 md:p-0 rounded-full md:rounded-none shadow-xl md:shadow-none flex gap-8 md:gap-8 font-medium z-50 transition-all">
      <li>
        <NuxtLink to="/" class="cursor-pointer hover:text-primary transition-colors flex flex-col items-center gap-1 opacity-60 hover:opacity-100 [&.router-link-active]:opacity-100 [&.router-link-active]:text-primary">
          <Icon name="lucide:home" class="w-6 h-6 md:hidden" />
          <span class="hidden md:block">home</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/Lookbook" class="cursor-pointer hover:text-primary transition-colors flex flex-col items-center gap-1 opacity-60 hover:opacity-100 [&.router-link-active]:opacity-100 [&.router-link-active]:text-primary">
          <Icon name="lucide:briefcase" class="w-6 h-6 md:hidden" />
          <span class="hidden md:block">projects</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/Contact" class="cursor-pointer hover:text-primary transition-colors flex flex-col items-center gap-1 opacity-60 hover:opacity-100 [&.router-link-active]:opacity-100 [&.router-link-active]:text-primary">
          <Icon name="lucide:sparkles" class="w-6 h-6 md:hidden" />
          <span class="hidden md:block">vibes</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
