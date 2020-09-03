<template>
  <div class="pa-12">

    <v-dialog v-model="dialogFormularioPersona" width="60vw">
      <v-card class="pa-8">
        <v-card-title class="headline teal lighten-5">Asistente de la Fundación</v-card-title>
        <v-text-field type="text" v-model="formulario_persona.nombre" label="Nombre" class="mx-10 my-2"></v-text-field>
        <v-text-field type="text" v-model="formulario_persona.apellido1" label="Primer Apellido" class="mx-10 my-2"></v-text-field>
        <v-text-field type="text" v-model="formulario_persona.apellido2" label="Segundo Apellido" class="mx-10 my-2"></v-text-field>
        <v-radio-group v-model="formulario_persona.sexo" class="mx-10 my-2">
          <v-radio label="Masculino" value="M"></v-radio>
          <v-radio label="Femenino" value="F"></v-radio>
        </v-radio-group>         
        <v-text-field type="number" v-model="formulario_persona.edad" label="Edad" class="mx-10 my-2"></v-text-field>
        <v-select :items="['','Líbano','Venezuela', 'República Dominicana']" v-model="formulario_persona.paisNac" label="País de Nacimiento" class="mx-10 my-2"></v-select>
        <v-select :items="['Maracaibo','Caracas', 'Santo Domingo']" v-model="formulario_persona.ciudadNac" label="Ciudad de Nacimiento" class="mx-10 my-2"></v-select>
        <v-text-field type="text" v-model="formulario_persona.idNac" label="Identificación País Origen" class="mx-10 my-2"></v-text-field>
        <v-text-field type="text" v-model="formulario_persona.pasaporteNac" label="Pasaporte País Origen" class="mx-10 my-2"></v-text-field>
        <v-text-field type="mail" v-model="formulario_persona.mail" label="Mail" class="mx-10 my-2"></v-text-field>
        <v-text-field type="date" v-model="formulario_persona.fechaNac" label="Fecha de Nacimiento" class="mx-10 my-2"></v-text-field>
        <v-text-field type="date" v-model="formulario_persona.llegadaEsp" label="Fecha llegada España" class="mx-10 my-2"></v-text-field>
        <v-text-field type="date" v-model="formulario_persona.altaFund" label="Fecha alta en fundación" class="mx-10 my-2"></v-text-field>
        <v-select :items="['DNI','Pasaporte','Tarjeta Residencia']" v-model="formulario_persona.tipoDoc" label="Tipo de Documento en España" class="mx-10 my-2"></v-select>
        <v-text-field type="text" v-model="formulario_persona.numDoc" label="Número de Doc en España" class="mx-10 my-2"></v-text-field>
        <v-text-field type="text" v-model="formulario_persona.direccion" label="Dirección" class="mx-10 my-2"></v-text-field>
        <v-text-field type="number" v-model="formulario_persona.telefono" label="Teléfono" class="mx-10 my-2"></v-text-field>
        <v-text-field type="number" v-model="formulario_persona.hijos" label="Hijos" class="mx-10 my-2"></v-text-field>
        <v-card-actions>
          <v-btn v-if="formulario_persona.accion!==1" color="primary" text @click="eliminar()">Dar de Baja</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="cancelar()">Cancelar</v-btn>
          <v-btn color="success" text @click="guardar()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Botón agregar -->
    <v-card class="mb-8 pa-6">
      <v-row>
        <v-spacer></v-spacer>
        <v-btn
          fab
          x-small
          depressed
          class="teal lighten-3"
          dark
          @click="dialogFormularioPersona = true"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-row>

      <!-- Filtros -->
      <v-row cols="12">
        <v-col xs="12" md="3"><v-text-field v-model="filtro.id" label="ID, Pasaporte o Telf" prepend-icon="mdi-card-account-details-outline"></v-text-field></v-col>
        <v-col xs="12" md="3"><v-text-field v-model="filtro.nombre" label="Nombre" prepend-icon="mdi-account-outline"></v-text-field></v-col>
        <v-col xs="12" md="3"><v-select v-model="filtro.pais" :items="paises" label="País de Nacimiento" prepend-icon="mdi-flag-outline"></v-select></v-col>
        <v-col xs="12" md="3"><v-text-field v-model="filtro.edad" label="Edad" prepend-icon="mdi-calendar-account-outline"></v-text-field></v-col>
        <v-col xs="12" md="3"><v-text-field v-model="filtro.hijos" label="Hijos" prepend-icon="mdi-account-multiple-outline"></v-text-field></v-col>
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
          <!-- <pre style="font-size: 14px; text-align: left; background-color: #333; color: #5F8">{{persona}}</pre> -->
          <v-row cols="12">
            <v-col xs="12" sm="4">
              <v-card class="pa-3 d-flex flex-column">
                <v-card-subtitle class="font-weight-bold text-decoration-underline">Origen</v-card-subtitle>
                <span class="subtitle-2 font-weight-regular my-1"><b>País de Origen: </b>{{persona.paisNac}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Ciudad de Origen: </b>{{persona.ciudadNac}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Pasaporte: </b>{{persona.pasaporteNac}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>ID Origen: </b>{{persona.idNac}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Mail: </b>{{persona.mail}}</span>
              </v-card>
            </v-col>
            <v-col xs="12" sm="4">
              <v-card class="pa-3 d-flex flex-column">
                <v-card-subtitle class="font-weight-bold text-decoration-underline">España</v-card-subtitle>
                <span class="subtitle-2 font-weight-regular my-1"><b>Núm de Documento: </b>{{persona.numDoc}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Dirección: </b>{{persona.direccion}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Cod. Postal: </b>28010</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Teléfono: </b>{{persona.telefono}}</span>
                <span class="subtitle-2 font-weight-regular my-1">
                  <b>Hijos: </b>{{persona.hijos}}
                  <v-btn depressed x-small color="teal lighten-5"><v-icon color="grey darken-2" small>mdi-plus</v-icon></v-btn> 
                  <v-btn v-show="persona.hijos > 0" @click="hijos = !hijos" depressed x-small color="teal lighten-5" class="ml-1"><v-icon color="grey darken-1" small>mdi-eye</v-icon></v-btn>
                </span>
              </v-card>
            </v-col>
            <v-col xs="12" sm="4">
              <v-card class="pa-3 d-flex flex-column">
                <v-card-subtitle class="font-weight-bold text-decoration-underline">Fechas</v-card-subtitle>
                <span class="subtitle-2 font-weight-regular my-1"><b>Fecha Nacimiento: </b>{{persona.fechaNac}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Fecha Llegada España: </b>{{persona.llegadaEsp}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Fecha Alta Fundación: </b>{{persona.altaFund}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Alguna Fecha Adicional: </b>{{persona.altaFund}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Segunda Fecha Adicional: </b>{{persona.altaFund}}</span>
              </v-card>
            </v-col>
          </v-row>

          <Hijos v-show="hijos" :docid="persona.docid" />

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
    dialogFormularioPersona: false,
    fecha: '2020-08-31',
    filtro: {
      id: null,
      edad: null,
      nombre: null,
      pais: null,
      hijos: null
    },
    formulario_persona: {
      accion: 1,
      nombre: '',
      apellido1: '',
      apellido2: '',
      sexo: '',
      edad: 0,
      paisNac: '',
      ciudadNac: '',
      idNac: '',
      pasaporteNac: '',
      mail: '',
      fechaNac: '',
      llegadaEsp: '',
      altaFund: '',
      tipoDoc: '',
      numDoc: '',
      direccion: '',
      telefono: 0,
      hijos: 0,
    },
    formulario_vacio: {
      accion: 1,
      nombre: '',
      apellido1: '',
      apellido2: '',
      sexo: '',
      edad: 0,
      paisNac: '',
      ciudadNac: '',
      idNac: '',
      pasaporteNac: '',
      mail: '',
      fechaNac: '',
      llegadaEsp: '',
      altaFund: '',
      tipoDoc: '',
      numDoc: '',
      direccion: '',
      telefono: 0,
      hijos: 0,
    },
    hijos: false,
    paises: ['', 'Colombia', 'España', 'Líbano', 'República Dominicana' ,'Venezuela']
  }),
  mounted() {
    this.obtenerDatos()
  },
  computed: {
    ...mapState(['data', 'id_detalles']),
    lista_personas() {
      let final = this.data;
      this.filtro.id ? final = final.filter(element => 
        element.pasaporteNac.toLowerCase().includes(this.filtro.id.toLowerCase()) ||
        element.numDoc.toLowerCase().includes(this.filtro.id.toLowerCase()) ||
        (element.idNac+'').indexOf(this.filtro.id) > -1 ||
        (element.telefono+'').indexOf(this.filtro.id) > -1
      ) : null;
      this.filtro.nombre ? final = final.filter(element => element.nombre.toLowerCase().includes(this.filtro.nombre.toLowerCase())) : null;
      this.filtro.pais ? final = final.filter(element => element.paisNac.includes(this.filtro.pais)) : null;
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
      let objeto = Object.assign({}, this.formulario_persona)
      db.collection("personas").add({
        fecha_creado: new Date(),
        nombre: this.formulario_persona.nombre,
        apellido1: this.formulario_persona.apellido1,
        apellido2: this.formulario_persona.apellido2,
        sexo: this.formulario_persona.sexo,
        edad: this.formulario_persona.edad,
        paisNac: this.formulario_persona.paisNac,
        ciudadNac: this.formulario_persona.ciudadNac,
        idNac: this.formulario_persona.idNac,
        pasaporteNac: this.formulario_persona.pasaporteNac,
        mail: this.formulario_persona.mail,
        fechaNac: this.formulario_persona.fechaNac,
        llegadaEsp: this.formulario_persona.llegadaEsp,
        altaFund: this.formulario_persona.altaFund,
        tipoDoc: this.formulario_persona.tipoDoc,
        numDoc: this.formulario_persona.numDoc,
        direccion: this.formulario_persona.direccion,
        telefono: this.formulario_persona.telefono,
        hijos: this.formulario_persona.hijos,
        usuario_creado: auth.currentUser.uid
      })
        .then(res => {
          this.data.push({
            docid: res.id,
            fecha_creacion: new Date(),
            nombre: this.formulario_persona.nombre,
            apellido1: this.formulario_persona.apellido1,
            apellido2: this.formulario_persona.apellido2,
            sexo: this.formulario_persona.sexo,
            edad: this.formulario_persona.edad,
            paisNac: this.formulario_persona.paisNac,
            ciudadNac: this.formulario_persona.ciudadNac,
            idNac: this.formulario_persona.idNac,
            pasaporteNac: this.formulario_persona.pasaporteNac,
            mail: this.formulario_persona.mail,
            fechaNac: this.formulario_persona.fechaNac,
            llegadaEsp: this.formulario_persona.llegadaEsp,
            altaFund: this.formulario_persona.altaFund,
            tipoDoc: this.formulario_persona.tipoDoc,
            numDoc: this.formulario_persona.numDoc,
            direccion: this.formulario_persona.direccion,
            telefono: this.formulario_persona.telefono,
            hijos: this.formulario_persona.hijos,
            id_creador: auth.currentUser.uid
          })
          this.formulario_persona = this.formulario_vacio
        })
        .catch(e => console.log("Error creando el dato: ", e.message))
    },
    editar(value) {
      this.dialogFormularioPersona = true
      this.formulario_persona = this.lista_personas[value]
    },
    guardar() {
      if (this.formulario_persona.accion !== 1) {
        console.log('Toca editar')
        this.formulario_persona = this.formulario_vacio
      } else {
        this.crearDato()
      }
      this.dialogFormularioPersona = false
    },
    cancelar() {
      this.dialogFormularioPersona = false
      this.formulario_persona = this.formulario_vacio
    },
    mostrarDialog(caso, id) {
      this.dialogTablas = true
        console.log(caso, id)
      switch (caso) {
        case 1:
          break;
        case 2:
          
          break;
        case 3:
          this.formTabla.docid = id
          this.formTabla.title = 'Call Center';
          this.formTabla.subtitle = 'Agregar nuevo registro';
          this.formTabla.fecha = '2020-08-31';
          this.formTabla.contenido = 'Prueba Call Center desde caso';
          break;
      
        default:
          break;
      }
    },
    guardarCallCenter() {
      db.collection("call_center").add({
        fecha_creacion: new Date(),
        id_creador: auth.currentUser.uid,
        id_usuario: this.formTabla.docid,
        fecha: this.formTabla.fecha,
        contenido: this.formTabla.contenido
      })
      .then(() => { console.log('todo nice carnal')})
      .catch((e) => console.log(e))
    },
    hey(value) {
      console.log(value)
    }
  }
}
</script>