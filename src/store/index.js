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
      await db.collection("personas").get()
        .then(querySnapshot => querySnapshot.forEach(doc => {
          state.data.push({
            docid: doc.id,
            fecha_creado: doc.data().fecha_creado.toDate(),
            nombre: doc.data().nombre,
            apellido1: doc.data().apellido1,
            apellido2: doc.data().apellido2,
            sexo: doc.data().sexo,
            edad: doc.data().edad,
            paisNac: doc.data().paisNac,
            ciudadNac: doc.data().ciudadNac,
            idNac: doc.data().idNac,
            pasaporteNac: doc.data().pasaporteNac,
            mail: doc.data().mail,
            fechaNac: doc.data().fechaNac,
            llegadaEsp: doc.data().llegadaEsp,
            altaFund: doc.data().altaFund,
            tipoDoc: doc.data().tipoDoc,
            numDoc: doc.data().numDoc,
            direccion: doc.data().direccion,
            telefono: doc.data().telefono,
            hijos: doc.data().hijos,
            usuario_creado: auth.currentUser.uid
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
