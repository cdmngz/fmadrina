<template>
  <div class="pa-12">

    <v-dialog v-model="dialogPersona" width="60vw">
      <v-card class="pa-8">
        <v-card-title class="headline teal lighten-5">Asistente de la Fundación</v-card-title>
        <v-text-field type="text" v-model="formPersona.nombre" label="Nombre" class="mx-10 my-2"></v-text-field>
        <v-text-field type="text" v-model="formPersona.apellido1" label="Primer Apellido" class="mx-10 my-2"></v-text-field>
        <v-text-field type="text" v-model="formPersona.apellido2" label="Segundo Apellido" class="mx-10 my-2"></v-text-field>
        <v-radio-group v-model="formPersona.sexo" class="mx-10 my-2">
          <v-radio label="Masculino" value="M"></v-radio>
          <v-radio label="Femenino" value="F"></v-radio>
        </v-radio-group>         
        <v-text-field type="number" v-model="formPersona.edad" label="Edad" class="mx-10 my-2"></v-text-field>
        <v-select :items="['','Líbano','Venezuela', 'República Dominicana']" v-model="formPersona.pais_nacimiento" label="País de Nacimiento" class="mx-10 my-2"></v-select>
        <v-select :items="['Maracaibo','Caracas', 'Santo Domingo']" v-model="formPersona.ciudad_nacimiento" label="Ciudad de Nacimiento" class="mx-10 my-2"></v-select>
        <v-text-field type="text" v-model="formPersona.id_nacimiento" label="Identificación País Origen" class="mx-10 my-2"></v-text-field>
        <v-text-field type="text" v-model="formPersona.pasaporte_nacimiento" label="Pasaporte País Origen" class="mx-10 my-2"></v-text-field>
        <v-text-field type="mail" v-model="formPersona.mail" label="Mail" class="mx-10 my-2"></v-text-field>
        <v-text-field type="date" v-model="formPersona.fecha_nacimiento" label="Fecha de Nacimiento" class="mx-10 my-2"></v-text-field>
        <v-text-field type="date" v-model="formPersona.fecha_llegada" label="Fecha llegada España" class="mx-10 my-2"></v-text-field>
        <v-text-field type="date" v-model="formPersona.fecha_alta" label="Fecha alta en fundación" class="mx-10 my-2"></v-text-field>
        <v-select :items="['DNI','Pasaporte','Tarjeta Residencia']" v-model="formPersona.tipo_documento" label="Tipo de Documento en España" class="mx-10 my-2"></v-select>
        <v-text-field type="text" v-model="formPersona.numero_documento" label="Número de Doc en España" class="mx-10 my-2"></v-text-field>
        <v-text-field type="text" v-model="formPersona.direccion" label="Dirección" class="mx-10 my-2"></v-text-field>
        <v-text-field type="number" v-model="formPersona.telefono" label="Teléfono" class="mx-10 my-2"></v-text-field>
        <v-text-field type="number" v-model="formPersona.hijos" label="Hijos" class="mx-10 my-2"></v-text-field>
        <v-card-actions>
          <v-btn v-if="formPersona.accion!==1" color="primary" text @click="eliminar()">Dar de Baja</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="cancelar()">Cancelar</v-btn>
          <v-btn color="success" text @click="guardar()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogHijo" width="60vw">
      <v-card class="pa-6">
        <v-card-title class="teal lighten-5">Agregar Hijo</v-card-title>
        <v-text-field v-model="formHijo.nombre" type="text" label="Nombre" class="mx-2 mt-7"></v-text-field>
        <v-text-field v-model="formHijo.apellido1" type="text" label="Primer apellido" class="mx-2"></v-text-field>
        <v-text-field v-model="formHijo.apellido2" type="text" label="Segundo apellido" class="mx-2"></v-text-field>
        <v-select v-model="formHijo.sexo" :items="['F','M']" label="Sexo" class="mx-2"></v-select>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialogHijo=false">Cancelar</v-btn>
          <v-btn color="success" text @click="agregarHijo()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card class="mb-8 pa-6 d-print-none">
      <v-row>
        <v-spacer></v-spacer>
        <!-- Botón agregar -->
        <v-btn
          fab
          x-small
          depressed
          class="teal lighten-4"
          dark
          @click="agregar()"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-row>

      <!-- Filtros -->
      <v-row cols="12">
        <v-col><v-text-field v-model="filtro.id" label="ID, Pasaporte o Telf" prepend-icon="mdi-card-account-details-outline"></v-text-field></v-col>
        <v-col><v-text-field v-model="filtro.nombre" label="Nombre" prepend-icon="mdi-account-outline"></v-text-field></v-col>
        <v-col><v-select v-model="filtro.pais" :items="paises" label="País de Nacimiento" prepend-icon="mdi-flag-outline"></v-select></v-col>
        <v-col><v-text-field v-model="filtro.edad" label="Edad" prepend-icon="mdi-calendar-account-outline"></v-text-field></v-col>
        <v-col><v-text-field v-model="filtro.hijos" label="Hijos" prepend-icon="mdi-account-multiple-outline"></v-text-field></v-col>
      </v-row>
    </v-card>

    <!-- Panel Acordion -->
    <v-expansion-panels accordion multiple>
      <v-expansion-panel
        v-for="(persona, i) in lista_personas"
        :key="i"
        :class="i%2 === 0 ? 'white' : 'teal lighten-5'"
        >
        <v-expansion-panel-header>
          <v-row cols="12">
            <v-col xs="12" sm="1" class="ml-14"><span>{{i+1}}.</span></v-col>
            <v-col xs="12" sm="3" class="ma-n2"><v-avatar tile size="33"><img :src="persona.sexo === 'M' ? require(`../assets/MVitalyGorbachev.svg`) : require(`../assets/FVitalyGorbachev.svg`)"></v-avatar></v-col>
            <v-col xs="12" sm="4"><span>{{persona.apellido1}} {{persona.apellido2}}, {{persona.nombre}}</span></v-col>
            <v-col xs="12" sm="3"><span>{{persona.edad}} años</span></v-col>
          </v-row>
        </v-expansion-panel-header>
        <!-- Panel Cuerpo -->
        <v-expansion-panel-content class="text-center">
          <!-- <pre style="font-size: 14px; text-align: left; background-color: #333; color: #3F7">{{persona}}</pre> -->
          <v-row cols="12">
            <v-col xs="12" sm="4">
              <v-card class="pa-3 d-flex flex-column">
                <v-card-subtitle class="font-weight-bold text-decoration-underline">Origen</v-card-subtitle>
                <span class="subtitle-2 font-weight-regular my-1"><b>País de Origen: </b>{{persona.pais_nacimiento}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Ciudad de Origen: </b>{{persona.ciudad_nacimiento}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Pasaporte: </b>{{persona.pasaporte_nacimiento}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>ID Origen: </b>{{persona.id_nacimiento}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Mail: </b>{{persona.mail}}</span>
              </v-card>
            </v-col>
            <v-col xs="12" sm="4">
              <v-card class="pa-3 d-flex flex-column">
                <v-card-subtitle class="font-weight-bold text-decoration-underline">España</v-card-subtitle>
                <span class="subtitle-2 font-weight-regular my-1"><b>Núm de Documento: </b>{{persona.numero_documento}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Dirección: </b>{{persona.direccion}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Cod. Postal: </b>28010</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Teléfono: </b>{{persona.telefono}}</span>
                <span class="subtitle-2 font-weight-regular my-1">
                  <b>Hijos: </b>{{persona.hijos}}
                  <v-btn @click="[dialogHijo = true, formHijo.id_padre = persona.docid, formHijo.numHijos = persona.hijos]" depressed x-small color="teal lighten-5"><v-icon small>mdi-plus</v-icon></v-btn> 
                  <v-btn v-show="persona.hijos > 0" @click="verHijos = !verHijos" depressed x-small color="teal lighten-5" class="ml-1"><v-icon color="grey darken-1" small>mdi-eye</v-icon></v-btn>
                </span>
              </v-card>
            </v-col>
            <v-col xs="12" sm="4">
              <v-card class="pa-3 d-flex flex-column">
                <v-card-subtitle class="font-weight-bold text-decoration-underline">Fechas</v-card-subtitle>
                <span class="subtitle-2 font-weight-regular my-1"><b>Fecha Nacimiento: </b>{{new Date(persona.fecha_nacimiento.seconds).toLocaleString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Fecha Llegada España: </b>{{new Date(persona.fecha_llegada.seconds).toLocaleString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Fecha Alta Fundación: </b>{{new Date(persona.fecha_alta.seconds).toLocaleString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Alguna Fecha Adicional: </b>{{new Date(persona.fecha_alta.seconds).toLocaleString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Segunda Fecha Adicional: </b>{{new Date(persona.fecha_alta.seconds).toLocaleString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}}</span>
              </v-card>
            </v-col>
          </v-row>

          <!-- Hijos -->
          <Hijos :verHijos="verHijos" :docid="persona.docid" />

          <v-btn class="mt-4 mx-1 teal lighten-5" depressed small @click="masInfo(persona.docid)"><v-icon color="grey">mdi-account-details</v-icon></v-btn>
          <v-btn class="mt-4 mx-1 teal lighten-5" depressed small @click="editar(i)"><v-icon color="grey">mdi-pencil</v-icon></v-btn>
          
          <!-- Primera tabla -->
          <Tablita collection="novedades" :docid="persona.docid" color="teal lighten-4" titulo="Últimos Avances"/>
          <Tablita collection="asistencia" :docid="persona.docid" color="lime accent-1" titulo="Asistencia Banco del Bebé"/>
          <Tablita collection="call_center" :docid="persona.docid" color="deep-orange lighten-3" titulo="Call Center"/>
            
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { auth, db } from '../main'
import Hijos from '../components/Hijos'
import Tablita from '../components/Tablita'

export default {
  name: 'Dashboard',
  components: {
    Hijos,
    Tablita
  },
  data: () => ({
    dialogHijo: false,
    dialogPersona: false,
    fecha: '2020-08-31',
    filtro: {
      id: null,
      edad: null,
      nombre: null,
      pais: null,
      hijos: null
    },
    formHijo: {
      apellido1: '',
      apellido2: '',
      fecha_nacimiento: '',
      id_padre: '',
      nombre: '',
      numHijos: '',
      sexo: '',
    },
    formPersona: {
      accion: 1,
      apellido1: '',
      apellido2: '',
      ciudad_nacimiento: '',
      direccion: '',
      docid: '',
      edad: '',
      fecha_alta: '',
      fecha_llegada: '',
      fecha_nacimiento: '',
      hijos: '',
      id_nacimiento: '',
      mail: '',
      nombre: '',
      numero_documento: '',
      pais_nacimiento: '',
      pasaporte_nacimiento: '',
      sexo: '',
      telefono: '',
      tipo_documento: '',
    },
    verHijos: false,
    paises: ['', 'Colombia', 'España', 'Honduras', 'Líbano', 'República Dominicana' ,'Venezuela']
  }),
  mounted() {
    this.obtenerDatos()
  },
  computed: {
    ...mapState(['data', 'id_detalles']),
    lista_personas() {
      let final = JSON.parse(JSON.stringify(this.data))
      this.filtro.id ? final = final.filter(element => 
        element.pasaporte_nacimiento.toLowerCase().includes(this.filtro.id.toLowerCase()) ||
        element.numero_documento.toLowerCase().includes(this.filtro.id.toLowerCase()) ||
        (element.id_nacimiento+'').indexOf(this.filtro.id) > -1 ||
        (element.telefono+'').indexOf(this.filtro.id) > -1
      ) : null;
      this.filtro.nombre ? final = final.filter(element => element.nombre.toLowerCase().includes(this.filtro.nombre.toLowerCase())) : null;
      this.filtro.pais ? final = final.filter(element => element.pais_nacimiento.includes(this.filtro.pais)) : null;
      this.filtro.edad ? final = final.filter(element => element.edad == this.filtro.edad) : null;
      this.filtro.hijos ? final = final.filter(element => element.hijos == this.filtro.hijos) : null;
      return final
    }
  },
  methods: {
    ...mapMutations(['obtenerDatos', 'setIdDetalles']),
    masInfo(value) {
      this.setIdDetalles(value)
      this.$router.push({name: 'Detalles'})
    },
    crearDato() {
      let objeto = Object.assign({}, this.formPersona)
      db.collection("personas").add({
        apellido1: this.formPersona.apellido1,
        apellido2: this.formPersona.apellido2,
        ciudad_nacimiento: this.formPersona.ciudad_nacimiento,
        direccion: this.formPersona.direccion,
        edad: this.formPersona.edad,
        fecha_alta: new Date(),
        fecha_creacion: new Date(),
        fecha_llegada: new Date(),
        fecha_modificado: new Date(),
        fecha_nacimiento: new Date(),
        hijos: this.formPersona.hijos,
        id_creador: auth.currentUser.uid,
        id_modificador: auth.currentUser.uid,
        id_nacimiento: this.formPersona.id_nacimiento,
        mail: this.formPersona.mail,
        nombre: this.formPersona.nombre,
        numero_documento: this.formPersona.numero_documento,
        pais_nacimiento: this.formPersona.pais_nacimiento,
        pasaporte_nacimiento: this.formPersona.pasaporte_nacimiento,
        sexo: this.formPersona.sexo,
        telefono: this.formPersona.telefono,
        tipo_documento: this.formPersona.tipo_documento
      })
        .then(() => {
          this.obtenerDatos()
          this.vaciarFormPersona()
        })
        .catch(e => console.log(e))
    },
    async agregarHijo() {
      await db.collection("hijos").add({
        apellido1: this.formHijo.apellido1,
        apellido2: this.formHijo.apellido2,
        fecha_creacion: new Date(),
        fecha_nacimiento: new Date(),
        id_creador: auth.currentUser.uid,
        id_padre: this.formHijo.id_padre,
        nombre: this.formHijo.nombre,
        sexo: this.formHijo.sexo,
      })
        .then(this.obtenerDatos(), this.vaciarFormPersona())
        .catch(e => console.log(e))
    },
    async incrementarNumHijo() {
      this.formHijo.numHijos += 1
      await db.collection("personas").doc(this.formHijo.id_padre).update({
        hijos: this.formHijo.numHijos
      })
        .then(this.obtenerDatos())
        .catch(e => console.log(e))
    },
    async decrementarNumHijo() {
      this.formHijo.numHijos -= 1
      await db.collection("personas").doc(this.formHijo.id_padre).update({
        hijos: this.formHijo.numHijos
      })
        .then(this.obtenerDatos())
        .catch(e => console.log(e))
    },
    async editarPersona() {
      console.log(this.formPersona.docid);
      await db.collection("personas").doc(this.formPersona.docid).update({
        apellido1: this.formPersona.apellido1,
        apellido2: this.formPersona.apellido2,
        ciudad_nacimiento: this.formPersona.ciudad_nacimiento,
        direccion: this.formPersona.direccion,
        edad: this.formPersona.edad,
        fecha_alta: new Date(),
        fecha_llegada: new Date(),
        fecha_nacimiento: new Date(),
        hijos: this.formPersona.hijos,
        id_nacimiento: this.formPersona.id_nacimiento,
        mail: this.formPersona.mail,
        nombre: this.formPersona.nombre,
        numero_documento: this.formPersona.numero_documento,
        pais_nacimiento: this.formPersona.pais_nacimiento,
        pasaporte_nacimiento: this.formPersona.pasaporte_nacimiento,
        sexo: this.formPersona.sexo,
        telefono: this.formPersona.telefono,
        tipo_documento: this.formPersona.tipo_documento
      })
      .then(this.obtenerDatos(), this.vaciarFormPersona())
      .catch(e => console.log(e))
    },
    vaciarFormPersona() {
      console.log(this.formPersona.accion)
      for (const attr in this.formPersona) {
        this.formPersona[attr] = ''
      }
    },
    agregar() {
      this.dialogPersona = true
      this.formPersona.accion = 1
    },
    editar(value) {
      this.dialogPersona = true
      this.formPersona = JSON.parse(JSON.stringify(this.lista_personas[value]))
      this.formPersona.accion = 2
    },
    guardar() {
      if (this.formPersona.accion !== 1) {
        this.editarPersona()
      } else {
        this.crearDato()
      }
      this.dialogPersona = false
    },
    cancelar() {
      this.dialogPersona = false
      this.vaciarFormPersona()
    },
  }
}
</script>