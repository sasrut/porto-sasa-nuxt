<template>
  <main class="relative z-10 py-8 px-6 md:px-12 max-w-6xl mx-auto flex flex-col items-center">
    <!-- Header -->
    <div class="text-center mb-16">
      <div class="inline-block px-4 py-1.5 rounded-full bg-mint/50 backdrop-blur-md border border-white/60 text-sm font-medium mb-6 text-teal-600 shadow-sm animate-pulse">
        let's connect 💌
      </div>
      <h1 class="font-display text-5xl md:text-7xl font-bold tracking-tight">
        let's build something <span class="text-pink-500 italic block mt-2">iconic.</span>
      </h1>
    </div>

    <!-- Main Content Container -->
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
      
      <!-- Left: About & Socials -->
      <div class="flex flex-col text-left space-y-8">
        <!-- Gen Z Description -->
        <div class="bg-white/40 backdrop-blur-xl border-4 border-blush/60 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(255,183,178,0.2)]">
          <h2 class="font-display text-3xl font-bold mb-4 flex items-center gap-2">
            the background <Icon name="lucide:book-open" class="text-pink-500 w-6 h-6" />
          </h2>
          <p class="text-coal/80 text-lg leading-relaxed font-medium">
            a creative developer who believes enterprise code doesn't have to be boring. turning matcha lattes (and some coffee) into scalable frontends. obsessed with intuitive UX, micro-animations, and pushing the boundaries of modern web standards. <span class="bg-daisy px-1">standard divs are strictly prohibited.</span>
          </p>
        </div>

        <!-- Social Media Links -->
        <div>
          <h3 class="font-display text-xl font-bold mb-4 px-2 uppercase tracking-widest text-coal/50 text-sm">find my socials</h3>
          <div class="flex flex-row flex-wrap gap-4">
            <a href="https://github.com/sasrut" aria-label="github" class="group flex items-center justify-center bg-white/60 hover:bg-coal hover:text-white transition-all w-14 h-14 rounded-full border-2 border-white/80 shadow-sm hover:shadow-md">
              <Icon name="lucide:github" class="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </a>
            <a href="https://id.linkedin.com/in/hanasya-shabrina-4b9836185" aria-label="linkedin" class="group flex items-center justify-center bg-white/60 hover:bg-blue-600 hover:text-white transition-all w-14 h-14 rounded-full border-2 border-white/80 shadow-sm hover:shadow-md">
              <Icon name="lucide:linkedin" class="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </a>
            <a href="https://www.instagram.com/hanasyasabrina" aria-label="instagram" class="group flex items-center justify-center bg-white/60 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:text-white transition-all w-14 h-14 rounded-full border-2 border-white/80 shadow-sm hover:shadow-md">
              <Icon name="lucide:instagram" class="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </a>
            <a href="https://wa.me/6281285030035" aria-label="whatsapp" class="group flex items-center justify-center bg-white/60 hover:bg-coal hover:text-white transition-all w-14 h-14 rounded-full border-2 border-white/80 shadow-sm hover:shadow-md">
              <Icon name="lucide:message-circle-check" class="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      <!-- Right: Form -->
      <div class="w-full bg-white/40 backdrop-blur-xl border-4 border-white/60 rounded-[2rem] p-8 lg:p-10 shadow-[0_8px_30px_rgb(255,255,255,0.4)] relative">
        <Icon name="lucide:sparkles" class="absolute -top-6 -right-6 w-12 h-12 text-daisy animate-spin-slow rotate-45" />
        
        <h2 class="font-display text-3xl font-bold mb-6">drop a line 👋</h2>
        
        <form @submit.prevent="submitForm" class="flex flex-col gap-6 w-full">
          <!-- Name Input -->
          <div class="flex flex-col gap-2">
            <label class="font-bold text-sm text-coal/70 ml-2">what's your name?</label>
            <input v-model="form.name" type="text" placeholder="enter your full name" class="w-full bg-white/60 border-2 border-white/80 rounded-2xl px-5 py-4 focus:outline-none focus:border-pink-400 focus:bg-white transition-all font-medium placeholder:text-coal/40" required />
          </div>

          <!-- Email Input -->
          <div class="flex flex-col gap-2">
            <label class="font-bold text-sm text-coal/70 ml-2">where can i reach you?</label>
            <input v-model="form.email" type="email" placeholder="you@aesthetic.biz" class="w-full bg-white/60 border-2 border-white/80 rounded-2xl px-5 py-4 focus:outline-none focus:border-pink-400 focus:bg-white transition-all font-medium placeholder:text-coal/40" required />
          </div>

          <!-- Message Input -->
          <div class="flex flex-col gap-2">
            <label class="font-bold text-sm text-coal/70 ml-2">tell me about your project...</label>
            <textarea v-model="form.message" rows="4" placeholder="how can i help you..." class="w-full bg-white/60 border-2 border-white/80 rounded-2xl px-5 py-4 focus:outline-none focus:border-pink-400 focus:bg-white transition-all font-medium placeholder:text-coal/40 resize-none" required></textarea>
          </div>

          <!-- Submit -->
          <button type="submit" class="mt-2 w-full bg-coal text-white rounded-2xl px-6 py-5 font-bold text-lg flex items-center justify-center gap-3 hover:bg-pink-500 transition-colors shadow-lg group">
            send message <Icon name="lucide:send" class="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </form>
      </div>

    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitForm = () => {
  const subject = encodeURIComponent(`Portfolio Contact: ${form.value.name}`)
  const body = encodeURIComponent(`Name: ${form.value.name}\nEmail: ${form.value.email}\n\nProject Details:\n${form.value.message}`)
  window.location.href = `mailto:hanasyasabrina@gmail.com?subject=${subject}&body=${body}`
}
</script>
