<template>
  <div class="pa-12">
    <v-card class="mb-8 d-print-none">
      <v-row>
        <v-col><v-text-field class="mx-8" v-model="fecha" type="date" label="Día de cita"></v-text-field></v-col>
        <v-col><v-switch v-model="indice" class="mx-8" label="Índice"></v-switch></v-col>
        <v-col><v-switch v-model="nombre" class="mx-8" label="Nombre"></v-switch></v-col>
        <v-col><v-switch v-model="apellido1" class="mx-8" label="Primer apellido"></v-switch></v-col>
        <v-col><v-switch v-model="apellido2" class="mx-8" label="Segundo apellido"></v-switch></v-col>
        <v-col><v-switch v-model="telefono" class="mx-8" label="Telefono"></v-switch></v-col>
      </v-row>
    </v-card>  
  
    <section>
      <span class="d-none d-print-table-row">Cita para la fecha: {{fechaLocal}}</span>
      <v-simple-table dense>
        <thead>
          <tr>
            <th v-show="indice">Índice</th>
            <th v-show="nombre">Nombre</th>
            <th v-show="apellido1">Primer Apellido</th>
            <th v-show="apellido2">Segundo Apellido</th>
            <th v-show="telefono">Teléfono</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in array" :key="index">
            <td v-show="indice">{{ index+1 }}</td>
            <td v-show="nombre">{{ item.nombre }}</td>
            <td v-show="apellido1">{{ item.apellido1 }}</td>
            <td v-show="apellido2">{{ item.apellido2 }}</td>
            <td v-show="telefono">{{ item.telefono }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { auth, db } from '../main'

export default {
  name: 'Imprimir',
  data: () => ({
    fecha: '2020-09-14',
    indice: true,
    nombre: true,
    apellido1: true,
    apellido2: true,
    telefono: true,
    array: []
  }),
  mounted() {
    this.cargarDatos()
  },
  computed: {
    ...mapState(['data']),
    fechaLocal() {
      return this.fromDateToLocalDate(this.fecha)
    }
  },
  methods: {
    async cargarDatos() {
      let fecha = this.fromDateToTimeStamp(this.fecha)
      await db.collection("asistencia").where("fecha","==",fecha).get()
        .then(res => {
          this.array = []
          res.forEach(element => {
            let persona = this.data.filter(element2 => element2.docid == element.data().id_usuario)
            this.array.push({
              id_usuario: element.data().id_usuario,
              fecha: this.fromTimeStampToLocalDate(element.data().fecha),
              contenido: element.data().contenido,
              nombre: persona[0].nombre,
              apellido1: persona[0].apellido1,
              apellido2: persona[0].apellido2,
              telefono: persona[0].telefono
            })
          })
        })
        .catch(e => console.log(e))
    },
    fromDateToTimeStamp(value) {
      let fecha = value.split("-")
      return new Date(fecha[0], fecha[1] - 1, fecha[2])
    },  
    fromDateToLocalDate(value) {
      let fecha = value.split("-")
      return `${fecha[2]}/${fecha[1]}/${fecha[0]}`
    },  
    fromTimeStampToDate(value) {
      let fecha = new Date(value.seconds * 1000)
      fecha = `${fecha.getFullYear()}-${("0" + (fecha.getMonth() + 1)).slice(-2)}-${('0'+fecha.getDate()).slice(-2)}`
      return fecha
    },
    fromTimeStampToLocalDate(value) {
      let fecha = new Date(value.seconds * 1000)
      fecha = `${('0'+fecha.getDate()).slice(-2)}/${("0" + (fecha.getMonth() + 1)).slice(-2)}/${fecha.getFullYear()}`
      return fecha
    }
  },
  watch: {
    fecha() {
      this.cargarDatos()
    }
  }
}
</script>