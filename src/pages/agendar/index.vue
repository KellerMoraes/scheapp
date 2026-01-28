<template>
  <v-container
    class="px-0 py-0 d-flex flex-column"
    max-width="900"
  >
  <v-dialog
      v-model="maisdatasModal"
      class="d-flex align-start"
    >
      <v-card class="d-flex align-center pa-5" width="100%"
      >
      <v-card-title>Selecione a data</v-card-title>
      <v-card-text>

        <v-date-picker theme="light"
        class="weekdays-primary"
        weekday-format="short"
        v-model="dataSelecionada"
        @update:model-value="maisdatasModal = false"
        :min="hoje"
  :max="diaMaximo"
  lang="pt-BR"
        hide-header
        >
        <template v-slot:controls="{ disabled, nextMonth, prevMonth, monthYearText }">
          <v-btn :disabled="disabled.includes('prev-month')" color="primary" icon="$prev" @click="prevMonth "></v-btn>
          <v-spacer></v-spacer>
          <div class="text-center">
            <div class="text-caption my-n1 text-primary">{{ monthYearText.split(' ')[1] }}</div>
            <div class="text-body-1">{{ monthYearText.split(' ')[0] }}</div>
          </div>
          <v-spacer></v-spacer>
          <v-btn :disabled="disabled.includes('next-month')" color="primary" icon="$next" @click="nextMonth"></v-btn>
        </template>
      </v-date-picker>
    </v-card-text>
      </v-card>
    </v-dialog>

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

        <v-card-subtitle @click="abrirDatasModal" class="pa-4" style="color: #5B8BD3;">
          Mais datas
        </v-card-subtitle>
      </v-card>

      <!-- DATAS (SCROLL HORIZONTAL) -->
      <v-card flat height="74" color="white" tile>
  <div
    ref="scrollContainer"
    class="px-2 py-3 d-flex scroll-x"
    @scroll="atualizarMesVisivel"
  >
    <v-card
      v-for="data in datas"
      :key="data.date.toISOString()"
      width="50"
      height="50"
      flat
      ref="cards"
      :data-month="data.mes"
      rounded="xl"
      class="mx-1 d-flex flex-column justify-center align-center flex-shrink-0"
      :color="isDiaSelecionado(data.date) ? 'primary' : 'white'"
      @click="selecionarDia(data.date)"
      style="font-family: Inter; cursor: pointer;"
    >
      <span
        class="text-center"
        :style="{ color: isDiaSelecionado(data.date) ? 'white' : '#464646' }"
      >
        <p>{{ data.dia }}</p>
        <p style="font-size: 14px;margin-top: -4px;">{{ data.diaSemana }}</p>
      </span>
    </v-card>
  </div>
</v-card>

    <!-- FILTROS -->
    <v-card
      class="d-flex justify-center align-center px-6"
      flat tile
      height="65"
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
  <v-card
  class="d-flex justify-center align-center px-6"
  tile
  height="35"
  variant="elevated"
  color="primary"
  >
  <v-card-text class="text-center">

    {{ dataSelecionada.getUTCDate() }} de
    {{ meses[dataSelecionada.getMonth()] }} de
    {{ dataSelecionada.getFullYear() }}, {{ diasSemanaCompleto[dataSelecionada.getDay()] }} 
  </v-card-text>
</v-card>
  
  <!-- HORÁRIOS (OCUPA O RESTO + SCROLL) -->
  <v-card
      flat tile
      rounded="0"
      style="height: calc(100dvh - 288px);overflow-y: auto;"
      color="#d0d0d0"
      >
      <v-item-group
        multiple
        v-model="horaSelected"
        style="overflow-y: auto; margin-bottom: 140px;"
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
    :color="horaSelected.includes(hora.valor) ? 'success' : 'white'"
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
    const dataSelecionada = ref(new Date())
    const appStore = useAppStore()
    const datas = computed(() => gerarListaDeDias(30))
    const mesAtual = ref('Janeiro')
    const maisdatasModal = ref(false)
    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    const diasSemanaCompleto = ['Domingo', 'Segunda - feira', 'Terça - feira', 'Quarta - feira', 'Quinta - feira', 'Sexta - feira', 'Sábado']
    const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril',
    'Maio', 'Junho', 'Julho', 'Agosto',
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]
    const cards = ref([])
    const scrollContainer = ref(null)

   const diaSelecionadoKey = computed(() =>
  formatDateLocal(dataSelecionada.value)
)
   const hoje = computed(() => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
})
function diaTemHorario(date) {
  const key = formatDateLocal(date)
  const horarios = appStore.horariosSelecionados[key]
  return Array.isArray(horarios) && horarios.length > 0
}
const diaMaximo = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() + 45)
  d.setHours(23, 59, 59, 999)
  return d
})
function selecionarDia(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  dataSelecionada.value = d
}

function isDiaSelecionado(date) {
  return (
    date.toDateString() === dataSelecionada.value.toDateString()
  )
}
  const horaSelected = computed(() => {
  return appStore.horariosSelecionados[diaSelecionadoKey.value] || []
})

    function gerarListaDeDias(qtdDias = 30) {
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
function abrirDatasModal() {
  maisdatasModal.value = true
}
function selecionarHorario(hora) {
  appStore.toggleHorario(dataSelecionada.value, hora.valor)
  
}
function formatDateLocal(date) {
  const d = new Date(date)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}
function atualizarMesVisivel() {
  const containerLeft = scrollContainer.value.scrollLeft
  console.log(containerLeft)
  console.log(cards.value[8])
  cards.value.forEach((card)=>{
    let el = {left: card.$el.offsetLeft - (card.$el.offsetWidth / 2), month: card.$el.dataset.month }
    if(el.left < containerLeft && meses[el.month] !== mesAtual.value){
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