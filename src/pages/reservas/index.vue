<template>
  <v-container
    class="px-0 pt-0 d-flex flex-column"
    max-width="900"
  >
  <v-sheet style="height: calc(100dvh); overflow-y: auto;" color="white">

    <v-card
        class="d-flex align-center justify-space-between"
        flat
        tile
        color="white"
      >
      <v-card-title style="font-size: 18px; font-family: Inter;">
          Minhas reservas
        </v-card-title>

        <v-card-subtitle class="pa-4">
          <v-btn color="primary" to="/agendar">Agendar</v-btn>
        </v-card-subtitle>
      </v-card>
    <v-card
        flat
        tile
        color="white"
        v-for="(historico, i) in historicos"
      >
      <v-card-subtitle v-if="historico.lista.length">
        {{ historico.situacao }}
      </v-card-subtitle>
      <v-card-text class="d-flex pl-9" >
        <v-expansion-panels color="white">
            <v-expansion-panel v-for="item in historico.lista" style="color: #616161;">
            <v-expansion-panel-title>
                <v-row>
                    <v-col cols="4">
                        <span>{{ item.data }}</span>
                    </v-col>
                    <v-col cols="4">
                        <!-- <span>{{ item.horario.start }}h - {{ item.horario.end }}h</span> -->
                    </v-col>
                    <v-col cols="4" class="d-flex justify-end pr-5">
                        <span :class="historico.situacao">{{ historico.situacao }}</span>
                    </v-col>
                </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text style="background-color: white;" class="pa-0">
                <div>Data: {{ item.data }}</div>
                <div>Horário: {{ item.horario.start }}h - {{ item.horario.end }}h</div>
                <div>Quadra: {{ item.quadra }}</div>
                <div>Situação: <b :class="historico.situacao">{{ historico.situacao }}</b></div>
                <v-card-actions class="d-flex justify-end" v-if="historico.op < 2"> 
                    <v-btn variant="flat" color="warning">Reagendar</v-btn>
                    <v-btn variant="flat" color="error">Cancelar</v-btn>
                </v-card-actions>
            </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    
        </v-card-text>
      </v-card>
  </v-sheet>
      

  </v-container>
</template>


<script setup>
    const historicos = ref(
        [
            {op: 0,situacao: 'Pendente', lista: [
                {
                    data: "27/01",
                    horario: {start: 18, end: 20},
                    quadra: "01",
                }
            ]},
            {op: 1,situacao: 'Pago', lista: [
                {
                    data: "27/01/2026",
                    horario: {start: 18, end: 20},
                    quadra: "01",
                },
                {
                    data: "27/01/2026",
                    horario: {start: 18, end: 20},
                    quadra: "01",
                }
                
            ]},
            {op: 2,situacao: 'Cancelado', lista: [
                {
                    data: "25/01/2026",
                    horario: {start: 18, end: 20},
                    quadra: "01",
                }
            ]},
])
  
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
.Pago{
    color: green;
}
.Cancelado{
    color: red;
}
.Pendente{
    color: rgb(255, 176, 4);

}
</style>