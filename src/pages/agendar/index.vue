<template>
  <v-container
    class="px-0 py-0 d-flex flex-column"
    max-width="900"
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
          {{ mesAtual }}
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
           ref="scrollContainer"
  class="px-2 py-3 d-flex scroll-x"
  @scroll="atualizarMesVisivel"
        >
          <v-item
            v-for="data in datas"
            :key="data.dia"
            v-slot="{ isSelected, toggle }"
          >
            <v-card
              @click="()=>{toggle(), mudarDia(data)}"
              width="50"
              height="50"
              flat
              :data-month="data.mes"
              rounded="xl"
              ref="cards"
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
                <p style="font-size: 14px;">{{ data.diaSemana }}</p>
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
      flat tile
      rounded="0"
      style="height: calc(100dvh - 268px);overflow-y: auto;"
      color="#d0d0d0"
      >
      <v-item-group
        multiple
        v-model="horaSelected"
        style="overflow-y: auto; margin-bottom: 120px;"
        heigh
        class="px-2 py-2 d-flex flex-column scroll-y"
      >
        <v-item
  v-for="hora in horarios"
  :key="hora.hora"
>
  <v-card
    @click="selecionarHorario(hora)"
    height="60"
    flat
    class="mx-1 my-2 d-flex justify-center align-center"
    :color="horaSelected.includes(hora.valor) ? 'primary' : 'white'"
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
import { useAppStore } from '@/stores/app'

    const quadra = ref('Quadra 1')
    const esporte = ref('Vôlei')
    const dateSelected = ref(0)
    const dataSelecionada = ref(new Date())
    const appStore = useAppStore()
    const datas = ref(gerarListaDeDias(30))
    const mesAtual = ref('Janeiro')
    const active = ref(false)
    const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril',
    'Maio', 'Junho', 'Julho', 'Agosto',
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]
    const cards = ref([])
    const scrollContainer = ref(null)
    const diaAtualKey = computed(() =>
  dataSelecionada.value.toISOString().split('T')[0]
)
  const horaSelected = computed(() => {
  return appStore.horariosSelecionados[diaAtualKey.value] || []
})

    function gerarListaDeDias(qtdDias = 30) {
      const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  const hoje = new Date()
  const lista = []

  for (let i = 0; i < qtdDias; i++) {
    const data = new Date(hoje)
    data.setDate(hoje.getDate() + i)

    lista.push({
  date: data,
  diaSemana: diasSemana[data.getDay()],
  dia: data.getDate(),
  mes: data.getMonth(),
  ano: data.getFullYear(),
})
  }
  return lista
}
function mudarDia(data) {
  dataSelecionada.value = data.date
}
function selecionarHorario(hora) {
  appStore.toggleHorario(dataSelecionada.value, hora.valor)
  
}
function atualizarMesVisivel() {
  const containerLeft = scrollContainer.value.$el.scrollLeft
  console.log(containerLeft)
  cards.value.forEach((card)=>{
    let el = {left: card.$el.offsetLeft - (card.$el.offsetWidth / 2), month: card.$el.dataset.month }
    if(el.left < containerLeft && meses[el.month] !== mesAtual.value){
      console.log(el)
      mesAtual.value = meses[el.month]
    }})
}

const horarios = computed(() => {
  const agora = new Date()
  const horaAtual = agora.getHours()
  const ehHoje = dataSelecionada.value.toDateString() === agora.toDateString()
  console.log(ehHoje)
  return horas.value.filter(
    item => !ehHoje || item.valor > horaAtual
  )
})
    const horas = ref([
  { hora: "08h - 09h", valor: 8 },
  { hora: "09h - 10h", valor: 9 },
  { hora: "10h - 11h", valor: 10 },
  { hora: "11h - 12h", valor: 11 },
  { hora: "13h - 14h", valor: 13 },
  { hora: "14h - 15h", valor: 14 },
  { hora: "15h - 16h", valor: 15 },
  { hora: "16h - 17h", valor: 16 },
  { hora: "17h - 18h", valor: 17 },
  { hora: "18h - 19h", valor: 18 },
  { hora: "19h - 20h", valor: 19 },
  { hora: "20h - 21h", valor: 20 },
  { hora: "21h - 22h", valor: 21 },
  { hora: "22h - 23h", valor: 22 },
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
.bgBottom{
  background-color: rgb(240, 240, 240) !important;
}

</style>