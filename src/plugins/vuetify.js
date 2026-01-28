/**
 * plugins/vuetify.js
 */

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import { pt } from 'vuetify/locale'

import DateFnsAdapter from '@date-io/date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export default createVuetify({
  locale: {
    locale: 'pt',
    messages: {
      pt,
    },
  },

  date: {
    adapter: DateFnsAdapter,
    locale: {
      pt: ptBR,
    },
  },

  theme: {
    defaultTheme: 'light',
  },
})
