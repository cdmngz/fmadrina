<template>
  <div class="pa-12">
    <v-card class="mb-8 pa-8">
      <v-row cols="12">
        <v-col md="3">
          <v-text-field label="Indetificación" prepend-icon="mdi-card-account-details"></v-text-field>
        </v-col>
        <v-col md="3">
          <v-text-field v-model="nombre" label="Nombre" prepend-icon="mdi-account"></v-text-field>
        </v-col>
        <v-col md="3">
          <v-text-field label="Nacionalidad" prepend-icon="mdi-flag"></v-text-field>
        </v-col>
        <v-col md="3">
          <v-text-field label="Edad" prepend-icon="mdi-calendar-account" v-model="edad"></v-text-field>
        </v-col>
      </v-row>
    </v-card>

    <div class="d-inline-block">

    <v-card max-width="434" v-for="(persona, i) in personal" :key="i" class="mb-7 mr-4">
      <v-img height="100%" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg">
        <v-row cols="12">
          <v-avatar tile size="192"><v-img :src="require(`../assets/${persona.foto}`)"></v-img></v-avatar>
          <v-col class="white">
            <span class="subtitle-1 grey--text text--darken-3"><b>Edad:</b> {{persona.edad}} años</span><br>
            <span class="subtitle-1 grey--text text--darken-3"><b>ID:</b> 55220022 (DNI)</span><br>
            <span class="subtitle-1 grey--text text--darken-3"><b>Nacionalidad:</b> {{persona.nacionalidad}}</span><br> 
            <span class="subtitle-1 grey--text text--darken-3"><b>Hijos:</b> 0</span><br> 
            <span class="subtitle-1 grey--text text--darken-3"><b>Inicio Asistencia:</b> 25/11/2018</span><br> 
          </v-col>
        </v-row>
        <v-row class="pl-3">
          <v-list-item color="rgba(0, 0, 0, .4)" dark>
            <v-list-item-content>
              <v-list-item-title class="title">{{persona.apellido1}} {{persona.apellido2}}, {{persona.nombre}} </v-list-item-title>
              <v-list-item-subtitle>Especialidad</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-row>
      </v-img>
      <v-card-actions>
        <v-btn color="indigo" text>Historia</v-btn>
        <v-btn color="indigo" text>Salud</v-btn>
        <v-btn color="indigo" text>Empleo</v-btn>
        <v-btn color="indigo" text>Psicología</v-btn>
      </v-card-actions>
    </v-card>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data: () => ({
    edad: null,
    nombre: null,
    data: [
      { foto: '1.jpg', nombre: 'Andrés', apellido1: 'González', apellido2: 'Rodríguez', edad: '25', nacionalidad: 'ES'},
      { foto: '2.jpg', nombre: 'María', apellido1: 'González', apellido2: 'Rodríguez', edad: '25', nacionalidad: 'ES'},
      { foto: '3.jpg', nombre: 'Marta', apellido1: 'González', apellido2: 'Rodríguez', edad: '40', nacionalidad: 'ES'},
      { foto: '4.jpg', nombre: 'Jhon', apellido1: 'González', apellido2: 'Rodríguez', edad: '25', nacionalidad: 'ES'},
      { foto: '5.jpg', nombre: 'Lyan', apellido1: 'González', apellido2: 'Rodríguez', edad: '25', nacionalidad: 'ES'},
      { foto: '6.jpg', nombre: 'Jen', apellido1: 'González', apellido2: 'Rodríguez', edad: '25', nacionalidad: 'ES'},
      { foto: '7.jpg', nombre: 'Marcos', apellido1: 'González', apellido2: 'Rodríguez', edad: '25', nacionalidad: 'ES'},
      { foto: '8.jpg', nombre: 'Marta', apellido1: 'Sánchez', apellido2: 'Hoyos', edad: '30', nacionalidad: 'ES'},
      { foto: '9.jpg', nombre: 'Jacob', apellido1: 'González', apellido2: 'Rodríguez', edad: '25', nacionalidad: 'ES'},
      { foto: '10.jpg', nombre: 'Andrea', apellido1: 'González', apellido2: 'Rodríguez', edad: '25', nacionalidad: 'ES'},
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
  }
}
</script>