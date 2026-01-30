<template>
  <v-container
    class="px-0 pt-0 d-flex flex-column"
    max-width="900"
    style="height: calc(100dvh - 132px); overflow-y: auto;"
  >
  <v-card-title class="mt-3"> <v-btn icon="mdi-chevron-left" @click="router.back()" variant="text" elevation="2" size="40" color="primary" class="mr-10"></v-btn>Horários selecionados</v-card-title>
    <v-card class="mt-4" flat>
        <v-card-text>
            <v-expansion-panels color="white">
            <v-expansion-panel v-for="item in useAppStore().horariosSelecionados" style="color: #616161;">
            <v-expansion-panel-title>
                <v-row>
                    <v-col cols="4">
                        <span>{{ Object.keys(useAppStore().horariosSelecionados[0]) }}</span>
                    </v-col>
                    <v-col cols="4">
                        <!-- <span>{{ item.horario.start }}h - {{ item.horario.end }}h</span> -->
                    </v-col>
                    <v-col cols="4" class="d-flex justify-end pr-5">
                    </v-col>
                </v-row>
            </v-expansion-panel-title>
            </v-expansion-panel>
        </v-expansion-panels>
        </v-card-text>
    </v-card>
    <!-- <v-card-title class="mt-3"> <v-btn icon="mdi-chevron-left" @click="router.back()" variant="text" elevation="2" size="40" color="primary" class="mr-10"></v-btn>Forma de pagamento</v-card-title>
    <v-card class="mt-4" flat>
        <v-card-text>
            <v-list lines="two" class="px-2">
                <v-list-item rounded="lg" elevation="3" class="pl-7 mb-4"
        title="Pix"
      >
        <template v-slot:append="{ isSelected, select }">
          <v-list-item-action start>
              <v-radio></v-radio>
          </v-list-item-action>
        </template>
        <template v-slot:prepend>
          <v-list-item-action start>
            <v-avatar><v-img cover src="https://img.icons8.com/color/512/pix.png"></v-img></v-avatar>
          </v-list-item-action>
        </template>
      </v-list-item>
                <v-list-item rounded="lg" elevation="3" class="pl-7"
        title="Google Pay"
      >
        <template v-slot:append="{ isSelected, select }">
          <v-list-item-action start>
            <v-radio></v-radio>
          </v-list-item-action>
        </template>
        <template v-slot:prepend>
          <v-list-item-action start>
            <v-avatar><v-img src="https://images.seeklogo.com/logo-png/33/2/google-pay-logo-png_seeklogo-334912.png"></v-img></v-avatar>
          </v-list-item-action>
        </template>
      </v-list-item>
            </v-list>
        </v-card-text>
    </v-card> -->
 

  </v-container>
</template>


<script setup>
import router from '@/router';
import { useAppStore } from '@/stores/app';

    const historicos = ref(
        [
            {op: 0,situacao: 'Pendente', lista: [
                {
                    data: "27/01/2026",
                    horario: {start: 18, end: 20},
                    quadra: "01",
                }
            ]},
            {op: 1,situacao: 'Pago', lista: [
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