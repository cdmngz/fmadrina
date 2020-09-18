<template>
  <div class="pa-12">
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

    <v-data-table
      :headers="headers"
      :items="data"
      sort-by.sync="estado"
      :sort-desc.sync="sortDesc"
    >
      <template v-slot:item.estado="{ item }">
        <v-chip :color="item.estado === 'Aprobado' ? 'success' : item.estado === 'Negado' ? 'error' : 'warning'">{{ item.estado }}</v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editar(item)">mdi-pencil</v-icon>
        <v-icon small @click="eliminar(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="teal lighten-4">Obtener Datos</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { auth, db } from '../main'

export default {
    name: 'Solicitud',
    data: () => ({
      sortDesc: true,
      headers: [
        { text: 'Fecha', align: 'center', value: 'fecha' },
        { text: 'Producto', value: 'producto', align: 'center' },
        { text: 'Estado', value: 'estado', align: 'center' },
        { text: 'Hijo', value: 'hijo', align: 'center' },
        { text: '', value: 'actions', sortable: false }
      ],
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
        await db.collection("solicitud").orderBy("fecha", "desc").get()
          .then(querySnapshot => querySnapshot.forEach(doc => {
            this.data.push({
              docid: doc.id,
              fecha: this.fromTimeStampToLocalDate(doc.data().fecha),
              producto: doc.data().producto,
              estado: doc.data().estado,
              hijo: this.cargarHijo(doc.data().id_hijo)
            })
          }))
          .catch(e => console.log(e))
      },
      async cargarHijo(item) {
        let veamos = 'Jose'
        await db.collection("hijos").doc(item).get()
          .then(doc => {
            veamos = doc.data().nombre
          })
          .catch(e => console.log(e))
        return veamos
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
