<template>
  <div class="pa-12">

    <v-card class="mb-8 pa-7">
      <v-row>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab small depressed class="teal lighten-4" dark v-on="on" v-bind="attrs"><v-icon>mdi-plus</v-icon></v-btn>
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2">
            Agregar Persona
          </v-card-title>

          <v-text-field type="text" label="Nombre" class="mx-10 my-2"></v-text-field>
  
          <v-divider></v-divider>
    
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="dialog = false">Cancelar</v-btn>
            <v-btn color="success" text @click="dialog = false">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </v-row>
      <v-row>
        <v-col xs="12" md="3">
          <v-text-field label="Indetificación" prepend-icon="mdi-card-account-details"></v-text-field>
        </v-col>
        <v-col xs="12" md="3">
          <v-text-field v-model="nombre" label="Nombre" prepend-icon="mdi-account"></v-text-field>
        </v-col>
        <v-col xs="12" md="3">
          <v-text-field label="Nacionalidad" prepend-icon="mdi-flag"></v-text-field>
        </v-col>
        <v-col xs="12" md="3">
          <v-text-field label="Edad" prepend-icon="mdi-calendar-account" v-model="edad"></v-text-field>
        </v-col>
      </v-row>
    </v-card>

    <v-expansion-panels accordion multiple>
      <v-expansion-panel
        v-for="(persona, i) in personal"
        :key="i"
        :class="i%2===0 ? 'white' : 'teal lighten-5'"
      >
        <v-expansion-panel-header class="pa-2">
          <v-avatar size="84">
            <img :src="require(`../assets/${persona.foto}`)">
          </v-avatar>
          <span>{{persona.apellido1}}, {{persona.nombre}}</span>
          <span>{{persona.edad}} años</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="text-center">
          <v-row cols="12">
            <v-col xs="12" sm="4">
              <v-card class="pa-3 d-flex flex-column">
                <span class="subtitle-2 font-weight-regular my-1"><b>Lugar de Nac:</b> España</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Fecha Nac:</b> 23/11/1992</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>DNI (ESP):</b> 55445566D</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Tarjeta Res (ESP):</b> 2343123T</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Pasaporte:</b> X8203A84-T</span>
              </v-card>
            </v-col>
            <v-col xs="12" sm="4">
              <v-card class="pa-3 d-flex flex-column">
                <span class="subtitle-2 font-weight-regular my-1"><b>Fecha Llegada España:</b> 14/10/2019</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Fecha Primera Asistencia:</b> 22/11/22019</span>
              </v-card>
            </v-col>
            <v-col xs="12" sm="4">
              <v-card class="pa-3">
                <span class="subtitle-2 font-weight-regular"><b>Nacionalidad:</b> Español</span>
              </v-card>
            </v-col>          </v-row>
          <v-btn class="ma-7" small @click="masInfo">Más Info</v-btn>
          <v-card>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center teal lighten-4">Fecha</th>
                    <th class="text-center teal lighten-4">Detalles de llamada</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>12/07/2020</td>
                    <td>Buscando información sobre asistencia.</td>
                  </tr>
                  <tr>
                    <td>22/01/2020</td>
                    <td>Averiguando sobre un tema en particular.</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
            
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data: () => ({
    dialog: false,
    edad: null,
    nombre: null,
    data: [
      { foto: '1.jpg', nombre: 'Andrés', apellido1: 'González', apellido2: 'Rodríguez', edad: '25', nacionalidad: 'España'},
      { foto: '2.jpg', nombre: 'María', apellido1: 'Gutiérrez', apellido2: 'Rodríguez', edad: '25', nacionalidad: 'España'},
      { foto: '3.jpg', nombre: 'Marta', apellido1: 'Matim', apellido2: 'Rodríguez', edad: '40', nacionalidad: 'España'},
      { foto: '4.jpg', nombre: 'Jhon', apellido1: 'González', apellido2: 'Rodríguez', edad: '25', nacionalidad: 'España'},
      { foto: '5.jpg', nombre: 'Lyan', apellido1: 'González', apellido2: 'Rodríguez', edad: '25', nacionalidad: 'España'},
      { foto: '6.jpg', nombre: 'Jen', apellido1: 'González', apellido2: 'Rodríguez', edad: '25', nacionalidad: 'España'},
      { foto: '7.jpg', nombre: 'Marcos', apellido1: 'González', apellido2: 'Rodríguez', edad: '25', nacionalidad: 'España'},
      { foto: '8.jpg', nombre: 'Marta', apellido1: 'Sánchez', apellido2: 'Hoyos', edad: '30', nacionalidad: 'España'},
      { foto: '9.jpg', nombre: 'Jacob', apellido1: 'González', apellido2: 'Rodríguez', edad: '25', nacionalidad: 'España'},
      { foto: '10.jpg', nombre: 'Andrea', apellido1: 'González', apellido2: 'Rodríguez', edad: '25', nacionalidad: 'España'},
    ]
  }),
  computed: {
    personal() {
      let final = this.data
      if(this.edad) {
        final = final.filter(element => element.edad === this.edad)
      }
      if(this.nombre) {
        final = final.filter(element => element.nombre.includes(this.nombre))
      }
      if(!this.edad && !this.nombre) {
        final = this.data
      }
      return final
    }
  },
  methods: {
    masInfo() {
      this.$router.push({name: 'Detalles'})
    }
  }
}
</script>