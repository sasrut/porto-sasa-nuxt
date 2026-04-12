<template>
  <div class="min-h-screen bg-butter text-coal font-sans selection:bg-blush selection:text-coal overflow-x-hidden relative">
    <Head>
      <Title>sasa ✨ | creative web dev</Title>
      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
      <Link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,500;1,500&display=swap" rel="stylesheet" />
    </Head>

    <!-- Animated Background Blobs -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div class="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-blush/60 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div class="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-daisy/60 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" style="animation-delay: 2s;"></div>
      <div class="absolute bottom-[-20%] left-[20%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] bg-mint/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" style="animation-delay: 4s;"></div>
    </div>

    <!-- Navigation -->
    <NavBar />

    <NuxtPage />
    <BackToTop />

    <!-- Footer -->
    <footer class="relative z-10 w-full py-10 px-6 text-center border-t border-white/30 bg-white/20 backdrop-blur-md">
      <p class="font-medium text-coal/80 mb-2">
        crafted with <span class="text-pink-500">logics</span> and iced espresso cravings.
      </p>
      <p class="text-sm text-coal/60">
        © 2026 sasa. fun yet professional.
      </p>
    </footer>
  </div>
</template>