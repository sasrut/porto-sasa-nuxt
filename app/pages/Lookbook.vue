<template>
  <section class="text-left w-full max-w-5xl mx-auto py-8 md:p-0 p-4">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
      <div>
        <div class="inline-block px-3 py-1 bg-primary/30 text-primary font-bold text-xs uppercase tracking-widest rounded-full mb-3">the archive</div>
        <h2 class="font-display text-4xl md:text-6xl font-bold">curated works 📁</h2>
      </div>
      <div class="text-coal/80 dark:text-coal/80 text-lg leading-relaxed font-medium mb-6">
        just a heads up, i'm not UI/UX designer, i'm a responsive web developer. here's are some of my works, hope u enjoy the interactives and have fun 👓
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProjectCard 
        v-for="(project, i) in projects" 
        :key="i"
        :title="project.title"
        :desc="project.desc"
        :image-url="project.imageUrl"
        :gradient="project.gradient"
        :tags="project.tags"
        :url="project.url"
        class="text-coal"
      />
    </div>
  </section>
</template>

<script setup>
import { projects } from '~/data/projects'
</script>
