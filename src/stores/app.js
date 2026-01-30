import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // { '2025-01-26': [8, 9] }
  const horariosSelecionados = ref({})

  function dateKey(date) {
    return date.toISOString().split('T')[0]
  }

  function toggleHorario(date, valor) {
    const key = dateKey(date)

    if (!horariosSelecionados.value[key]) {
      horariosSelecionados.value[key] = []
    }
    const lista = horariosSelecionados.value[key]
    const index = lista.indexOf(valor)

    if (index === -1) lista.push(valor)
    else { lista.splice(index, 1)
  if(lista.length == 0){
        delete horariosSelecionados.value[key]
      }
    }
  }

  function limparDia(date) {
    delete horariosSelecionados.value[dateKey(date)]
  }

  function limparTudo() {
    horariosSelecionados.value = {}
  }

  const totalSelecionados = computed(() =>
    Object.values(horariosSelecionados.value)
      .reduce((sum, arr) => sum + arr.length, 0)
  )

  return {
    horariosSelecionados,
    toggleHorario,
    limparDia,
    limparTudo,
    totalSelecionados
  }
})
