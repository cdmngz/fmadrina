<template>
  <div>
    <v-dialog v-model="showDialog" width="60vw">
      <v-card class="pa-8">
        <v-card-title class="yellow lighten-4">Solicitud</v-card-title>
        <v-text-field v-model="formSolicitud.fecha" type="date" label="Fecha" class="mx-2 mt-8"></v-text-field>
        <v-text-field v-model="formSolicitud.producto" type="text" label="Producto"></v-text-field>
        <v-select v-model="formSolicitud.estado" :items="['Pendiente', 'Aprobado', 'Negado']" label="Estado"></v-select>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="showDialog=false">Cancelar</v-btn>
          <v-btn color="success" text @click="guardar()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card class="mx-3 mb-3">
      <v-simple-table>
        <thead>
          <tr class="yellow lighten-4">
            <th class="text-center">Fecha</th>
            <th class="text-center">Productos</th>
            <th class="text-center">Estado</th>
            <th class="text-right"><v-btn fab small depressed text @click="[formSolicitud.accion = true, showDialog = true]"><v-icon color="grey darken-1">mdi-plus</v-icon></v-btn></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td>{{item.fecha}}</td>
            <td>{{item.producto}}</td>
            <td>
              <v-icon v-show="item.estado === 'Aprobado'" color="success">mdi-check</v-icon>
              <v-icon v-show="item.estado === 'Pendiente'" color="warning">mdi-dots-horizontal</v-icon>
              <v-icon v-show="item.estado === 'Negado'" color="error">mdi-close</v-icon>
            </td>
            <td class="text-right">
              <v-btn @click="editar(index)" fab x-small depressed text><v-icon color="teal lighten-4">mdi-pencil</v-icon></v-btn>
              <v-btn @click="eliminar(index)" fab x-small depressed text><v-icon color="teal lighten-4">mdi-delete</v-icon></v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
import { auth, db } from '../main'

export default {
    name: 'Solicitud',
    props: ['dochijo'],
    data: () => ({
      showDialog: false,
      data: [],
      formSolicitud: {
        accion: true,
        fecha: '',
        producto: '',
        estado: ''
      }
    }),
    mounted() {
      this.cargarDatos()
    },
    methods: {
      async cargarDatos() {
        this.data = []
        await db.collection("solicitud").where("id_hijo", "==", this.dochijo).orderBy("fecha", "desc").get()
          .then(querySnapshot => querySnapshot.forEach(doc => {
            this.data.push({
              docid: doc.id,
              fecha: this.fromTimeStampToLocalDate(doc.data().fecha),
              producto: doc.data().producto,
              estado: doc.data().estado
            })
          }))
          .catch(e => console.log(e))
      },
      async agregarDato() {
        await db.collection("solicitud").add({
          id_creador: auth.currentUser.uid,
          fecha_creacion: new Date(),
          fecha: this.fromDateToTimeStamp(this.formSolicitud.fecha),
          producto: this.formSolicitud.producto,
          estado: this.formSolicitud.estado,
          id_hijo: this.dochijo
        })
          .then(() => {
            console.log('Dato agregado')
            this.cargarDatos()
            this.showDialog = false
          })
          .catch(e => console.log(e))
      },
      async editarDato() {
        await db.collection("solicitud").doc(this.formSolicitud.docid).update({
          fecha: this.fromDateToTimeStamp(this.formSolicitud.fecha),
          producto: this.formSolicitud.producto,
          estado: this.formSolicitud.estado
        })
          .then(() => {
            console.log('Dato editado')
            this.cargarDatos()
            this.formSolicitud.accion = true
            this.showDialog = false
          })
          .catch(e => console.log(e))
      },
      async eliminarDato(index) {
        await db.collection("solicitud").doc(this.data[index].docid).delete()
          .then(() => {
            console.log('Dato borrado')
            this.cargarDatos()
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
      fromLocalDateToDate(value) {
        let fecha = value.split("/")
        return `${fecha[2]}-${fecha[1]}-${fecha[0]}`
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
      editar(index) {
        this.showDialog = true
        this.formSolicitud = JSON.parse(JSON.stringify(this.data[index]))
        this.formSolicitud.fecha = this.fromLocalDateToDate(this.data[index].fecha)
        this.formSolicitud.accion = false
      },
      guardar() {
        this.formSolicitud.accion === true ? this.agregarDato() : this.editarDato()
      },
      eliminar(index) {
        confirm('¿Seguro que deseas eliminarlo?') ? this.eliminarDato(index) : null
      },
    }
  }
</script>
