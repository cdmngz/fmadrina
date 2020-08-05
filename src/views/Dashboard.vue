<template>
  <div class="pa-12">

    <v-card class="mb-8 pa-7">
      <v-row>
        <v-spacer></v-spacer>
        <v-btn fab small depressed class="teal lighten-4" dark><v-icon>mdi-plus</v-icon></v-btn>
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
            <v-col><span><b>Nacionalidad:</b> Español</span></v-col>
            <v-col><span><b>Nacionalidad:</b> Español</span></v-col>
            <v-col><span><b>Nacionalidad:</b> Español</span></v-col>
            <v-col><span><b>Nacionalidad:</b> Español</span></v-col>
            <v-col><span><b>Nacionalidad:</b> Español</span></v-col>
            <v-col><span><b>Nacionalidad:</b> Español</span></v-col>
            <v-col><span><b>Nacionalidad:</b> Español</span></v-col>
            <v-col><span><b>Nacionalidad:</b> Español</span></v-col>
            <v-col><span><b>Nacionalidad:</b> Español</span></v-col>
            <v-col><span><b>Nacionalidad:</b> Español</span></v-col>
          </v-row>
          <v-btn class="ma-7" small @click="masInfo">Más Info</v-btn>
          <v-card>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center">Fecha</th>
                    <th class="text-center">Detalles de llamada</th>
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