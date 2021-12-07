<template>
  <div class="video-container">
    <iframe :src="videoSrc" frameborder="0" style="overflow-x:hidden; overflow:auto; width:100%; min-height:360px;"></iframe>
  </div>
</template>

<script>
// const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY;

export default {
  name: 'Trailer',
  props: {
    videoId: String,
  },
  computed: {
    videoSrc() {
      return `https://www.youtube.com/embed/${this.videoId}`
    },
  }
}
</script>

<style>

</style>