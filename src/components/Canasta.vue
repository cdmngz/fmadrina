<template>
  <div>
    <v-dialog v-model="showDialog" width="60vw">
      <v-card class="pa-8">
        <v-card-title class="teal lighten-5">Canasta</v-card-title>
        <v-text-field v-model="formCanasta.fecha" type="date" label="Fecha" class="mx-2 mt-8"></v-text-field>
        <v-row>
          <v-col><v-img width="30" height="30" :src="require(`@/assets/panal.svg`)"></v-img></v-col>
          <v-col><v-img width="30" height="30" :src="require(`@/assets/leche.svg`)"></v-img></v-col>
          <v-col><v-img width="30" height="30" :src="require(`@/assets/chupete.svg`)"></v-img></v-col>
          <v-col><v-img width="30" height="30" :src="require(`@/assets/bebe.svg`)"></v-img></v-col>
        </v-row>
        <v-row>
          <v-col><v-text-field v-model="formCanasta.panal" type="number" label="Cantidad" min="0"></v-text-field></v-col>
          <v-col><v-text-field v-model="formCanasta.leche" type="number" label="Cantidad" min="0"></v-text-field></v-col>
          <v-col><v-text-field v-model="formCanasta.chupete" type="number" label="Cantidad" min="0"></v-text-field></v-col>
          <v-col><v-text-field v-model="formCanasta.ropa" type="number" label="Cantidad" min="0"></v-text-field></v-col>
        </v-row>
        
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
          <tr class="purple lighten-5">
            <th class="text-center">Fecha</th>
            <th class="text-center"><v-img width="30" height="30" :src="require(`@/assets/panal.svg`)"></v-img></th>
            <th class="text-center"><v-img width="30" height="30" :src="require(`@/assets/leche.svg`)"></v-img></th>
            <th class="text-center"><v-img width="30" height="30" :src="require(`@/assets/chupete.svg`)"></v-img></th>
            <th class="text-center"><v-img width="30" height="30" :src="require(`@/assets/bebe.svg`)"></v-img></th>
            <th class="text-right"><v-btn fab small depressed text @click="[formCanasta.accion = true, showDialog = true]"><v-icon color="grey darken-1">mdi-plus</v-icon></v-btn></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td>{{new Date(item.fecha.seconds* 1000).toLocaleDateString()}}</td>
            <td>{{item.panal}}</td>
            <td>{{item.leche}}</td>
            <td>{{item.chupete}}</td>
            <td>{{item.ropa}}</td>
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
    name: 'Canasta',
    props: ['dochijo'],
    data: () => ({
      showDialog: false,
      data: [],
      formCanasta: {
        accion: true,
        fecha: '',
        panal: 0,
        leche: 0,
        chupete: 0,
        ropa: 0
      }
    }),
    mounted() {
      this.cargarDatos()
    },
    methods: {
      async cargarDatos() {
        this.data = []
        await db.collection("canasta").where("id_hijo", "==", this.dochijo).orderBy("fecha", "desc").get()
          .then(querySnapshot => querySnapshot.forEach(doc => {
            this.data.push({
              docid: doc.id,
              id_creador: doc.data().id_creador,
              fecha_creacion: doc.data().fecha_creacion,
              panal: doc.data().panal,
              leche: doc.data().leche,
              chupete: doc.data().chupete,
              ropa: doc.data().ropa,
              fecha: doc.data().fecha,
              id_hijo: doc.data().id_hijo,
            })
          }))
          .catch(e => console.log(e))
      },
      async agregarDato() {
        await db.collection("canasta").add({
          id_creador: auth.currentUser.uid,
          fecha_creacion: new Date(),
          panal: this.formCanasta.panal,
          leche: this.formCanasta.leche,
          chupete: this.formCanasta.chupete,
          ropa: this.formCanasta.ropa,
          fecha: this.fromDateToTimeStamp(this.formCanasta.fecha),
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
        await db.collection("canasta").doc(this.formCanasta.docid).update({
          panal: this.formCanasta.panal,
          leche: this.formCanasta.leche,
          chupete: this.formCanasta.chupete,
          ropa: this.formCanasta.ropa,
          fecha: this.fromDateToTimeStamp(this.formCanasta.fecha)
        })
          .then(() => {
            console.log('Dato editado')
            this.cargarDatos()
            this.formCanasta.accion = true
            this.showDialog = false
          })
          .catch(e => console.log(e))
      },
      async eliminarDato(index) {
        await db.collection("canasta").doc(this.data[index].docid).delete()
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
      fromTimeStampToDate(value) {
        let fecha = new Date(value.seconds * 1000)
        fecha = `${fecha.getFullYear()}-${("0" + (fecha.getMonth() + 1)).slice(-2)}-${('0'+fecha.getDate()).slice(-2)}`
        return fecha
      },
      editar(index) {
        this.showDialog = true
        this.formCanasta = JSON.parse(JSON.stringify(this.data[index]))
        this.formCanasta.fecha = this.fromTimeStampToDate(this.formCanasta.fecha)
        this.formCanasta.accion = false
      },
      guardar() {
        this.formCanasta.accion === true ? this.agregarDato() : this.editarDato()
      },
      eliminar(index) {
        confirm('¿Seguro que deseas eliminarlo?') ? this.eliminarDato(index) : null
      },
    }
  }
</script>
