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

    <v-row class="mx-4">
      
      <v-col>
        <p class="subtitle-2">Canasta</p>
        <v-card class="mx-3 mb-3">
          <v-simple-table>
            <thead>
              <tr class="purple lighten-5">
                <th class="text-center">Fecha</th>
                <th class="text-center"><v-img width="30" height="30" :src="require(`@/assets/panal.svg`)"></v-img></th>
                <th class="text-center"><v-img width="30" height="30" :src="require(`@/assets/leche.svg`)"></v-img></th>
                <th class="text-center"><v-img width="30" height="30" :src="require(`@/assets/chupete.svg`)"></v-img></th>
                <th class="text-center"><v-img width="30" height="30" :src="require(`@/assets/bebe.svg`)"></v-img></th>
                <th class="text-right"><v-btn fab small depressed text @click="showDialog=true"><v-icon color="grey darken-1">mdi-plus</v-icon></v-btn></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>02/09/2020</td>
                <td>2</td>
                <td>3</td>
                <td>-</td>
                <td>1</td>
                <td class="text-right"><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-pencil</v-icon></v-btn><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-delete</v-icon></v-btn></td>
              </tr>
              <tr>
                <td>15/08/2020</td>
                <td>2</td>
                <td>3</td>
                <td>1</td>
                <td>1</td>
                <td class="text-right"><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-pencil</v-icon></v-btn><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-delete</v-icon></v-btn></td>
              </tr>
              <tr>
                <td>22/07/2020</td>
                <td>2</td>
                <td>3</td>
                <td>-</td>
                <td>1</td>
                <td class="text-right"><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-pencil</v-icon></v-btn><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-delete</v-icon></v-btn></td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
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
                <th class="text-right"><v-btn fab small depressed text @click="showDialog=true"><v-icon color="grey darken-1">mdi-plus</v-icon></v-btn></th>
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