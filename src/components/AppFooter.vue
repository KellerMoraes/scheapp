<template>
  <transition name="slide-up">
  <v-card v-if="appStore.totalSelecionados && route.path == '/agendar'" class="footer" style="color: #616161;">
    <div class="d-flex justify-space-between"><span>Horários selecionados</span> <span>{{ appStore.totalSelecionados }}</span></div>
    <v-divider class="my-2"></v-divider>
    <div class="d-flex justify-space-between mb-1" ><h3>Total</h3> <span>R$ {{ appStore.totalSelecionados * 100 }}</span></div>
    <v-card-actions class="d-flex justify-space-around">
      <v-btn variant="outlined" @click="appStore.limparTudo()">Limpar horários</v-btn> 
      <v-btn variant="flat" color="primary" to="/pagamento">Pagamento</v-btn> 
    </v-card-actions>
  </v-card>
</transition>

</template>

<script setup>
import { useAppStore } from '@/stores/app';
const route = useRoute()
const appStore = useAppStore()
</script>

<style scoped lang="scss">
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 150px;
  background: rgb(243, 243, 243);
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.199);
  padding: 16px;
  z-index: 1000;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform .25s ease, opacity .25s;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

</style>
