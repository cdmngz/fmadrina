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
        <v-btn color="success" text @click="[showDialog = false, agregarDato()]">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <div v-if="verHijos === true">
  <v-card class="my-5" v-for="(hijo, index) of data" :key="index">
    <v-row>
      <v-col><v-avatar tile size="33"><img :src="hijo.sexo === 'M' ? require(`../assets/MBVitalyGorbachev.svg`) : require(`../assets/FBVitalyGorbachev.svg`)"></v-avatar></v-col>
      <v-col><span>{{hijo.apellido1}} {{hijo.apellido2}}, {{hijo.nombre}}</span></v-col>
      <v-col><span>{{new Date(hijo.fecha_nacimiento.seconds* 1000).toLocaleDateString()}}</span></v-col>
    </v-row>

    <v-row class="mx-4">
      
      <v-col>
        <p class="subtitle-2">Canasta</p>
        <Canasta :dochijo="hijo.dochijo" />
      </v-col>
      <v-col>
        <p class="subtitle-2">Solicitud</p>
        <v-card class="mx-3 mb-3">
          <v-simple-table>
            <thead>
              <tr class="yellow lighten-4">
                <th class="text-center">Fecha</th>
                <th class="text-center">Productos</th>
                <th class="text-center">Estado</th>
                <th class="text-right"><v-btn fab small depressed text @click="nose=true"><v-icon color="grey darken-1">mdi-plus</v-icon></v-btn></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>04/09/2019</td>
                <td>Coche para niño de 2 años.</td>
                <td><v-icon color="warning">mdi-dots-horizontal</v-icon></td>
                <td class="text-right"><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-pencil</v-icon></v-btn><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-delete</v-icon></v-btn></td>
              </tr>
              <tr>
                <td>12/08/2019</td>
                <td>Ropita de navidad.</td>
                <td><v-icon color="success">mdi-check</v-icon></td>
                <td class="text-right"><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-pencil</v-icon></v-btn><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-delete</v-icon></v-btn></td>
              </tr>
              <tr>
                <td>12/08/2019</td>
                <td>1000€.</td>
                <td><v-icon color="error">mdi-close</v-icon></td>
                <td class="text-right"><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-pencil</v-icon></v-btn><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-delete</v-icon></v-btn></td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
  </div>

  </div>
</template>

<script>
import Canasta from '../components/Canasta'
import { auth, db } from '../main'

export default {
    name: 'Hijos',
    components: {
      Canasta
    },
    props: ['docid', 'verHijos'],
    data: () => ({
      data: [],
      showDialog: false
    }),
    mounted() {
      this.cargarDatos()
    },
    methods: {
      async cargarDatos() {
        this.data = []
        await db.collection("hijos").where("id_padre", "==", this.docid).get()
          .then(querySnapshot => querySnapshot.forEach(doc => {
            this.data.push({
              dochijo: doc.id,
              apellido1: doc.data().apellido1,
              apellido2: doc.data().apellido2,
              fecha_creacion: doc.data().fecha_creacion,
              fecha_nacimiento: doc.data().fecha_nacimiento,
              id_creador: doc.data().id_creador,
              id_padre: doc.data().id_padre,
              nombre: doc.data().nombre,
              sexo: doc.data().sexo,
            })
          }))
          .catch(e => console.log(e))
      }
    }
  }
</script>