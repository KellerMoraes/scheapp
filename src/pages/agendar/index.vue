<template>
  <v-container
    class="px-0 pt-0 d-flex flex-column"
    max-width="900"
    style="height: 100%;"
  >

    <!-- HEADER -->
    <v-card
      class="d-flex justify-space-between"
      flat
      tile
      height="50"
      color="white"
    >
    <v-card-subtitle class="pa-4" style="font-size: 16px; font-family: Inter;">
        Janeiro
      </v-card-subtitle>

      <v-card-subtitle class="pa-4" style="color: #5B8BD3;">
        Mais datas
      </v-card-subtitle>
    </v-card>

    <!-- DATAS (SCROLL HORIZONTAL) -->
    <v-card flat height="74" color="white" tile>
      <v-item-group
        mandatory
        v-model="dateSelected"
        class="px-2 py-3 d-flex scroll-x"
      >
        <v-item
          v-for="data in datas"
          :key="data.dia"
          v-slot="{ isSelected, toggle }"
        >
          <v-card
            @click="toggle"
            width="50"
            height="50"
            flat
            rounded="xl"
            class="mx-1 d-flex flex-column justify-center align-center flex-shrink-0"
            :color="isSelected ? 'primary' : 'white'"
            style="font-family: Inter;"
          >
            <span
              class="text-center"
              style="line-height: 100%;"
              :style="{ color: isSelected ? 'white' : '#464646' }"
            >
              <p>{{ data.dia }}</p>
              <p style="font-size: 14px;">{{ data.abrev }}</p>
            </span>
          </v-card>
        </v-item>
      </v-item-group>
    </v-card>

    <!-- FILTROS -->
    <v-card
      class="d-flex justify-center align-center px-6"
      flat tile
      height="80"
      color="#e6e6e6"
    >
      <v-select
        v-model="esporte"
        width="120"
        label="Esporte"
        disabled
        class="mr-4"
        hide-details
        variant="outlined"
        density="compact"
        :items="['Vôlei']"
      />

      <v-select
        v-model="quadra"
        width="180"
        label="Quadra"
        disabled
        hide-details
        variant="outlined"
        density="compact"
        :items="['Quadra 1']"
      />
    </v-card>

    <!-- HORÁRIOS (OCUPA O RESTO + SCROLL) -->
    <v-card
      class="flex-grow-1"
      flat tile
      rounded="0"
      height="600"
      color="#d0d0d0"
      style="overflow: auto;"
    >
      <v-item-group
        multiple
        v-model="horaSelected"
        class="px-2 py-2 mb-16 d-flex flex-column scroll-y"
      >
        <v-item
          v-for="hora in horarios"
          :key="hora.hora"
          v-slot="{ isSelected, toggle }"
        >
          <v-card
            @click="toggle"
            height="60"
            flat
            class="mx-1 my-2 d-flex justify-center align-center"
            :color="isSelected ? 'primary' : hora.disabled ? 'grey' : 'white'"
            style="font-family: Inter;"
          >
            {{ hora.hora }}
          </v-card>
        </v-item>
      </v-item-group>
    </v-card>

  </v-container>
</template>


<script setup>
    const quadra = ref('Quadra 1')
    const esporte = ref('Vôlei')
    const dateSelected = ref(0)
    const horaSelected = ref([])
    const datas = ref([
        {dia: 22, abrev: "Qui"},
        {dia: 23, abrev: "Sex"},
        {dia: 24, abrev: "Sab"},
        {dia: 25, abrev: "Dom"},
        {dia: 26, abrev: "Seg"},
        {dia: 27, abrev: "Ter"},
        {dia: 28, abrev: "Qua"},
        {dia: 29, abrev: "Qui"},
        {dia: 30, abrev: "Sex"},

    ])
    const horarios = computed(()=>{
        let h = new Date().getHours()
        return horas.value.filter((item)=>{ return item.filtro > h})
    }) 
    const horas = ref([
        {hora: "08h - 09h", filtro: "08"},
        {hora: "09h - 10h", filtro: "09"},
        {hora: "10h - 11h",filtro: "10"},
        {hora: "11h - 12h",filtro: "11"},
        {hora: "13h - 14h",filtro: "13"},
        {hora: "14h - 15h",filtro: "14", disabled: true},
        {hora: "15h - 16h",filtro: "15", disabled: true},
        {hora: "16h - 17h",filtro: "16"},
        {hora: "17h - 18h",filtro: "17", disabled: true},
        {hora: "18h - 19h",filtro: "18", disabled: true},
        {hora: "19h - 20h",filtro: "19", disabled: true},
        {hora: "20h - 21h",filtro: "20"},
        {hora: "21h - 22h",filtro: "21"},
        {hora: "22h - 23h",filtro: "22"},

    ])
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
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100..900;1,100..900&family=Staatliches&display=swap');
.scroll-x {
  overflow-x: auto;
  flex-wrap: nowrap;
}

.scroll-y {
  overflow-y: auto;
  flex-grow: 1;
  -webkit-overflow-scrolling: touch;
}

</style>