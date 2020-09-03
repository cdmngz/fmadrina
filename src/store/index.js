import Vue from 'vue'
import Vuex from 'vuex'
import { auth, db } from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id_detalles: '',
    data: [],
    detallado: []
  },
  mutations: {
    async obtenerDatos(state) {
      state.data = []
      await db.collection("personas").orderBy("apellido1").get()
        .then(querySnapshot => querySnapshot.forEach(doc => {
          state.data.push({
            docid: doc.id,
            apellido1: doc.data().apellido1,
            apellido2: doc.data().apellido2,
            ciudad_nacimiento: doc.data().ciudad_nacimiento,
            direccion: doc.data().direccion,
            edad: doc.data().edad,
            fecha_alta: doc.data().fecha_alta,
            fecha_llegada: doc.data().fecha_llegada,
            fecha_nacimiento: doc.data().fecha_nacimiento,
            hijos: doc.data().hijos,
            id_nacimiento: doc.data().id_nacimiento,
            mail: doc.data().mail,
            nombre: doc.data().nombre,
            numero_documento: doc.data().numero_documento,
            pais_nacimiento: doc.data().pais_nacimiento,
            pasaporte_nacimiento: doc.data().pasaporte_nacimiento,
            sexo: doc.data().sexo,
            telefono: doc.data().telefono,
            tipo_documento: doc.data().tipo_documento
          })
      }))
      .catch(e => console.log(e.message))
    },
    setIdDetalles(state, value) {
      state.id_detalles = value
    },
    getValueById(state) {
      state.detallado = state.data.find(element => element.docid === state.id_detalles)
    }
  },
  actions: {
  },
  modules: {
  }
})
