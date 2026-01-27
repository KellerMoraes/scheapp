<template>
  <v-app-bar
        color="teal-darken-4"
        image="https://picsum.photos/1920/1080?random"
      >
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>

        <v-app-bar-title>Scheduler</v-app-bar-title>

        <v-btn variant="outlined" rounded="lg" to="/reservas" class="mr-2">
          Reservas
        </v-btn>

        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </v-app-bar>
</template>

<script setup>
</script>

<style scoped lang="sass">
</style>
