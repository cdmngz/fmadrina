<template>
  <div class="pa-12">

    <v-card class="mb-8 pa-7">
      <v-row>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
          <v-btn fab small depressed class="teal lighten-4" dark v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2">
            Agregar Persona
          </v-card-title>

          <v-text-field type="file" label="Escoger Foto" class="mx-10 my-2"></v-text-field>
          <v-text-field type="text" label="Nombre" class="mx-10 my-2"></v-text-field>
          <v-text-field type="text" label="Primer Apellido" class="mx-10 my-2"></v-text-field>
          <v-text-field type="text" label="Segundo Apellido" class="mx-10 my-2"></v-text-field>
          <v-text-field type="date" label="Fecha de Nacimiento" class="mx-10 my-2"></v-text-field>
  
          <v-divider></v-divider>
    
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="dialog = false">Cancelar</v-btn>
            <v-btn color="success" text @click="dialog = false">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </v-row>
      <v-row cols="12">
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
                <span class="subtitle-2 font-weight-regular my-1"><b>Ciudad de Nacimiento:</b> Buzios</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>País de Nacimiento:</b> Brasil</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Documento:</b> 19340444</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Pasaporte:</b> X8203A84-T</span>
              </v-card>
            </v-col>
            <v-col xs="12" sm="4">
              <v-card class="pa-3 d-flex flex-column">
                <span class="subtitle-2 font-weight-regular my-1"><b>Fecha Nacimiento:</b> 23/11/1992</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Fecha Llegada España:</b> 14/10/2019</span>
                <span class="subtitle-2 font-weight-regular my-1"><b>Fecha Alta Fundación:</b> 22/11/22019</span>
              </v-card>
            </v-col>
            <v-col xs="12" sm="4">
              <v-card class="pa-3">
                <span class="subtitle-2 font-weight-regular"><b>Nacionalidad:</b> Español</span>
                <span class="subtitle-2 font-weight-regular"><b>Hijos:</b> 0</span>
              </v-card>
            </v-col>
          </v-row>

          <v-btn class="mt-7" small @click="masInfo">Más Info</v-btn>
          
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
                    <td>Asistencia para la entrega de alimentos en la sede del banco de bebé.</td>
                    <td class="text-right"><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-pencil</v-icon></v-btn><v-btn fab x-small depressed text><v-icon color="teal lighten-4">mdi-delete</v-icon></v-btn></td>
                  </tr>
                  <tr>
                    <td>05/08/2020</td>
                    <td>Asistencia para la entrega de alimentos en la sede del banco de bebé.</td>
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