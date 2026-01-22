<template>
  <v-container class="px-0 pt-0" max-width="900">
    <v-carousel height="200" transition-duration="700" show-arrows="hover"
    cycle crossfade>
      <v-carousel-item v-for="(src, i) in items" :key="i" :src="src" cover></v-carousel-item>
    </v-carousel>
    <v-row>
      <v-col> <v-card class="d-flex justify-center align-center" rounded="0" height="160" color="#2F3340" width="100%">
        <v-btn color="primary" to="/agendar">Agendar</v-btn>
      </v-card> </v-col>
    </v-row>
    <v-row>
      <v-col> <v-card class="d-flex justify-center align-center" rounded="0" height="260" color="#2F3340" width="100%">
        <h3>Fique ligado nos torneios que acontecem...</h3>
      </v-card> </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  const items = [
    'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
    'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
    'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
    'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
  ]
  const links = [
    {
      href: 'https://vuetifyjs.com/',
      icon: 'mdi-text-box-outline',
      subtitle: 'Learn about all things Vuetify in our documentation.',
      title: 'Documentation',
    },
    {
      href: 'https://vuetifyjs.com/introduction/why-vuetify/#feature-guides',
      icon: 'mdi-star-circle-outline',
      subtitle: 'Explore available framework Features.',
      title: 'Features',
    },
    {
      href: 'https://vuetifyjs.com/components/all',
      icon: 'mdi-widgets-outline',
      subtitle: 'Discover components in the API Explorer.',
      title: 'Components',
    },
    {
      href: 'https://discord.vuetifyjs.com',
      icon: 'mdi-account-group-outline',
      subtitle: 'Connect with Vuetify developers.',
      title: 'Community',
    },
  ]
</script>
