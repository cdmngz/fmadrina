<template>
  <div>
  <v-dialog v-model="showDialog" width="60vw">
    <v-card class="pa-8">
      <v-card-title class="teal lighten-5">Hijos</v-card-title>
      <v-text-field type="date" label="Fecha" class="mx-2 mt-8"></v-text-field>
      <v-text-field type="text" label="Motivo de la llamada" class="mx-2"></v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="showDialog=false">Cancelar</v-btn>
        <v-btn color="success" text @click="[showDialog=false, agregarDato()]">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-card class="my-5" v-for="(hijo, index) of data" :key="index">
    <v-row>
      <v-col><v-avatar tile size="33"><img :src="hijo.sexo === 'M' ? require(`../assets/MBVitalyGorbachev.svg`) : require(`../assets/FBVitalyGorbachev.svg`)"></v-avatar></v-col>
      <v-col><span>{{hijo.nombre}}</span></v-col>
      <v-col><span>{{hijo.edad}}</span></v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="rounded-lg mx-3 pa-4 text-center">
          <p class="subtitle-2"><u>Canasta</u></p>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="rounded-lg mx-3 pa-4 text-center">
          <p class="subtitle-2"><u>Solicitud</u></p>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
  </div>
</template>

<script>
import { auth, db } from '../main'

export default {
    name: 'Hijos',
    props: ['docid'],
    data: () => ({
      showDialog: false,
      data: []
    }),
    mounted() {
      this.cargarDatos()
    },
    methods: {
      async cargarDatos() {
        await db.collection("hijos").where("id_padre", "==", this.docid).get()
          .then(res => {
            this.data = []
            res.forEach(element => {
              this.data.push(element.data())
            })
          })
          .catch(e => console.log(e))
      },
      async agregarDato() {
        await db.collection("hijos").add({
          id_creador: auth.currentUser.uid,
          fecha_creacion: new Date(),
          edad: "4 meses",
          nombre: "Juanito",
          sexo: "M",
          id_padre: this.docid
        })
          .then(console.log('Hijo creado'))
          .catch(e => console.log(e))
      }
    }
  }
</script>