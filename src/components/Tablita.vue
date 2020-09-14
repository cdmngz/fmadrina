<template>
  <div>
  <v-dialog v-model="showDialog" width="60vw">
    <v-card class="pa-8">
      <v-card-title class="teal lighten-5">{{titulo}}</v-card-title>
      <v-text-field v-model="fecha" type="date" label="Fecha" class="mx-2 mt-8"></v-text-field>
      <v-text-field v-model="contenido" type="text" label="Detalles" class="mx-2"></v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="showDialog=false">Cancelar</v-btn>
        <v-btn color="success" text @click="[showDialog=false, agregarDato()]">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-card class="my-5">
    <v-simple-table>
      <thead>
        <tr :class="color">
          <th class="text-center">Fecha</th>
          <th class="text-center">{{titulo}}</th>
          <th class="text-right"><v-btn fab small depressed text @click="showDialog=true"><v-icon color="grey darken-1">mdi-plus</v-icon></v-btn></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{item.fecha}}</td>
          <td>{{item.contenido}}</td>
          <td class="text-right"><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-pencil</v-icon></v-btn><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-delete</v-icon></v-btn></td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
  </div>
</template>

<script>
import { auth, db } from '../main'

export default {
    name: 'Tablita',
    props: ['color', 'titulo', 'docid','collection'],
    data: () => ({
      showDialog: false,
      data: [],
      fecha: '',
      contenido: ''
    }),
    mounted() {
      this.cargarDatos()
    },
    methods: {
      async cargarDatos() {
        await db.collection(this.collection).where("id_usuario", "==", this.docid).get()
          .then(res => {
            this.data = []
            res.forEach(element => {
              this.data.push({
                id_usuario: element.data().id_usuario,
                fecha: this.fromTimeStampToLocalDate(element.data().fecha),
                contenido: element.data().contenido
              })
            })
          })
          .catch(e => console.log(e))
      },
      async agregarDato() {
        await db.collection(this.collection).add({
          id_creador: auth.currentUser.uid,
          fecha_creacion: new Date(),
          contenido: this.contenido,
          fecha: this.fromDateToTimeStamp(this.fecha),
          id_usuario: this.docid
        })
          .then(() => {
            console.log('Dato agregado')
            this.cargarDatos()
            this.showDialog = false
          })
          .catch(e => console.log(e))
      },
      fromDateToTimeStamp(value) {
        let fecha = value.split("-")
        return new Date(fecha[0], fecha[1] - 1, fecha[2])
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
      },
    }
  }
</script>
