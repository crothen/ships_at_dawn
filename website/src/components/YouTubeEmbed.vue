<script setup lang="ts">
defineProps<{
  videoId: string
  isShort?: boolean
}>()
</script>

<template>
  <div class="youtube-embed" :class="{ 'is-short': isShort }">
    <iframe
      :src="`https://www.youtube.com/embed/${videoId}`"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped>
.youtube-embed {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 */
  background: #000;
  border-radius: 12px;
  overflow: hidden;
}

.youtube-embed.is-short {
  max-width: 360px;
  padding-bottom: 0;
  aspect-ratio: 9 / 16;
}

.youtube-embed iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
