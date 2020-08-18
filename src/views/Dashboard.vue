<template>
  <div class="pa-12">

    <v-card class="mb-8 pa-7">
      <v-row>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" width="60vw">
          <template v-slot:activator="{ on }">
            <v-btn fab small depressed class="teal lighten-4" dark v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
          </template>

          <v-card class="pa-8">
            <v-card-title class="headline teal lighten-5">Agregar Persona</v-card-title>
            <v-text-field type="text" v-model="formulario_persona.nombre" label="Nombre" class="mx-10 my-2"></v-text-field>
            <v-text-field type="text" v-model="formulario_persona.apellido1" label="Primer Apellido" class="mx-10 my-2"></v-text-field>
            <v-text-field type="text" v-model="formulario_persona.apellido2" label="Segundo Apellido" class="mx-10 my-2"></v-text-field>
            <v-radio-group v-model="formulario_persona.sexo" class="mx-10 my-2">
              <v-radio label="Masculino" value="M"></v-radio>
              <v-radio label="Femenino" value="F"></v-radio>
            </v-radio-group>         
            <v-text-field type="number" v-model="formulario_persona.edad" label="Edad" class="mx-10 my-2"></v-text-field>
            <v-select :items="['Líbano','Venezuela', 'República Dominicana']" v-model="formulario_persona.paisNac" label="País de Nacimiento" class="mx-10 my-2"></v-select>
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
              <v-spacer></v-spacer>
              <v-btn color="error" text @click="dialog = false">Cancelar</v-btn>
              <v-btn color="success" text @click="[dialog=false, guardar()]">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row cols="12">
        <v-col xs="12" md="2"><v-text-field label="Indetificación" prepend-icon="mdi-card-account-details-outline"></v-text-field></v-col>
        <v-col xs="12" md="2"><v-text-field v-model="filtro.nombre" label="Nombre" prepend-icon="mdi-account-outline"></v-text-field></v-col>
        <v-col xs="12" md="2"><v-select v-model="filtro.pais" :items="['Líbano','Venezuela', 'Rep. Dom.']" label="País de Nacimiento" prepend-icon="mdi-flag-outline"></v-select></v-col>
        <v-col xs="12" md="2"><v-text-field v-model="filtro.edad" label="Edad" prepend-icon="mdi-calendar-account-outline"></v-text-field></v-col>
        <v-col xs="12" md="2"><v-text-field v-model="filtro.hijos" label="Hijos" prepend-icon="mdi-account-multiple-outline"></v-text-field></v-col>
      </v-row>
    </v-card>

    <v-expansion-panels accordion multiple>
      <v-expansion-panel
        v-for="(persona, i) in lista_personas"
        :key="i"
        :class="i%2===0 ? 'white' : 'teal lighten-5'"
      >
        <v-expansion-panel-header>
          <v-avatar size="50">
            <img :src="persona.sexo === 'M' ? require(`../assets/MVitalyGorbachev.svg`) : require(`../assets/FVitalyGorbachev.svg`)">
          </v-avatar>
          <span>{{persona.apellido1}} {{persona.apellido2}}, {{persona.nombre}}</span>
          <span>{{persona.edad}} años</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="text-center">
          <v-row cols="12">
            <v-col xs="12" sm="4">
              <v-card class="pa-3 d-flex flex-column">
                <v-card-subtitle class="font-weight-bold text-decoration-underline">Origen</v-card-subtitle>
                <span class="subtitle-2 font-weight-regular my-1"><b>País de Nacimiento: </b>{{persona.paisNac}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Ciudad de Nacimiento: </b>{{persona.ciudadNac}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Identificación: </b>{{persona.idNac}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Pasaporte: </b>{{persona.pasaporteNac}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Mail: </b>{{persona.mail}}</span>
              </v-card>
            </v-col>
            <v-col xs="12" sm="4">
              <v-card class="pa-3 d-flex flex-column">
                <v-card-subtitle class="font-weight-bold text-decoration-underline">España</v-card-subtitle>
                <span class="subtitle-2 font-weight-regular my-1"><b>Número de Documento: </b>{{persona.numDoc}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Tipo de Documento: </b>{{persona.tipoDoc}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Dirección: </b>{{persona.direccion}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Teléfono: </b>{{persona.telefono}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Hijos: </b>{{persona.hijos}}</span>
              </v-card>
            </v-col>
            <v-col xs="12" sm="4">
              <v-card class="pa-3 d-flex flex-column">
                <v-card-subtitle class="font-weight-bold text-decoration-underline">Fechas</v-card-subtitle>
                <span class="subtitle-2 font-weight-regular my-1"><b>Fecha Nacimiento: </b>{{persona.fechaNac}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Fecha Llegada España: </b>{{persona.llegadaEsp}}</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Fecha Alta Fundación: </b>{{persona.altaFund}}</span>
              </v-card>
            </v-col>
          </v-row>

          <v-btn class="mt-7" small @click="masInfo(persona.docid)">Más Info</v-btn>
          
          <v-card class="mt-7">
            <v-simple-table>
                <thead>
                  <tr class="teal lighten-5">
                    <th class="text-center">Fecha</th>
                    <th class="text-center">Últimos Avances</th>
                    <th class="text-right">
                      <v-btn fab small depressed text v-on="on"><v-icon color="teal lighten-3">mdi-plus</v-icon></v-btn>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>02/08/2020</td>
                    <td>Se aprobó la tarjeta de residencia.</td>
                    <td class="text-right"><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-pencil</v-icon></v-btn><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-delete</v-icon></v-btn></td>
                  </tr>
                  <tr>
                    <td>18/07/2020</td>
                    <td>Se gestiona con abogado tarjeta de residencia.</td>
                    <td class="text-right"><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-pencil</v-icon></v-btn><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-delete</v-icon></v-btn></td>
                  </tr>
                  <tr>
                    <td>11/05/2020</td>
                    <td>Esperando que pase la cuarentena para aplicar tarjeta de residencia.</td>
                    <td class="text-right"><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-pencil</v-icon></v-btn><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-delete</v-icon></v-btn></td>
                  </tr>
                </tbody>
            </v-simple-table>
          </v-card>
          <v-card class="mt-7">
            <v-simple-table>
                <thead>
                  <tr class="teal lighten-4">
                    <th class="text-center">Fecha</th>
                    <th class="text-center">Asistencia entrega de alimentos</th>
                    <th class="text-right"><v-btn fab small depressed text dark v-on="on"><v-icon>mdi-plus</v-icon></v-btn></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>12/08/2020</td>
                    <td>Entrega de alimentos en la sede del banco de bebé.</td>
                    <td class="text-right"><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-pencil</v-icon></v-btn><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-delete</v-icon></v-btn></td>
                  </tr>
                  <tr>
                    <td>05/08/2020</td>
                    <td>Entrega de alimentos en la sede del banco de bebé. Dice que necesita pañales.</td>
                    <td class="text-right"><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-pencil</v-icon></v-btn><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-delete</v-icon></v-btn></td>
                  </tr>
                </tbody>
            </v-simple-table>
          </v-card>
          <v-card class="my-7">
            <v-simple-table>
                <thead>
                  <tr class="teal lighten-3">
                    <th class="text-center">Fecha</th>
                    <th class="text-center">Detalles de llamada telefónica</th>
                    <th class="text-right"><v-btn fab small depressed text dark v-on="on"><v-icon>mdi-plus</v-icon></v-btn></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>08/02/2020</td>
                    <td>Se procede a orientarlo y que asista a la sede.</td>
                    <td class="text-right"><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-pencil</v-icon></v-btn><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-delete</v-icon></v-btn></td>
                  </tr>
                  <tr>
                    <td>22/01/2020</td>
                    <td>Comenta que tiene un inconveniente por el cual necesita ayuda.</td>
                    <td class="text-right"><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-pencil</v-icon></v-btn><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-delete</v-icon></v-btn></td>
                  </tr>
                </tbody>
            </v-simple-table>
          </v-card>
            
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { auth, db } from '../main'

export default {
  name: 'Dashboard',
  data: () => ({
    dialog: false,
    filtro: {
      edad: null,
      nombre: null,
      pais: null,
      hijos: null
    },
    on: false,
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
        telefono: 634000000,
        hijos: 0,
    },
  }),
  mounted() {
    this.obtenerDatos()
  },
  computed: {
    ...mapState(['data', 'id_detalles']),
    lista_personas() {
      let final = this.data;
      this.filtro.nombre ? final = final.filter(element => element.nombre.includes(this.filtro.nombre)) : null;
      this.filtro.pais ? final = final.filter(element => element.paisNac.includes(this.filtro.pais)) : null;
      this.filtro.edad ? final = final.filter(element => element.edad === this.filtro.edad) : null;
      this.filtro.hijos ? final = final.filter(element => element.hijos === this.filtro.hijos) : null;
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
        .then(res => this.data.push({
          docid: res.id,
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
        }))
          .catch(e => console.log("Error creando el dato: ", e.message))
    },
    guardar() {
      if (this.formulario_persona.accion !== 1) {
        this.arrayTable[this.editedIndex].feel = this.editedItem.feel
        this.arrayTable[this.editedIndex].text = this.editedItem.text
        this.arrayTable[this.editedIndex].act = this.editedItem.act
        this.editarDato(this.editedItem)
      } else {
        this.crearDato()
        console.log('crear dato')
      }
      this.dialog = false
    },
  }
}
</script>