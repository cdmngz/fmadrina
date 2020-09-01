<template>
  <div>
  <v-dialog v-model="showDialog" width="60vw">
    <v-card class="pa-8">
      <v-card-title class="teal lighten-5">{{titulo}}</v-card-title>
      <v-text-field type="date" label="Fecha" class="mx-2 mt-8"></v-text-field>
      <v-text-field type="text" label="Motivo de la llamada" class="mx-2"></v-text-field>
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
      data: []
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
              this.data.push(element.data())
            })
          })
          .catch(e => console.log(e))
      },
      async agregarDato() {
        await db.collection(this.collection).add({
          id_creador: auth.currentUser.uid,
          fecha_creacion: new Date(),
          contenido: "Que grande los componentes23",
          fecha: '2020-08-10',
          id_usuario: this.docid
        })
          .then(console.log('nice'))
          .catch(e => console.log(e))
      }
    }
  }
</script>
