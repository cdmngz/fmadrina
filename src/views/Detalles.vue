<template>
  <div class="text-center">
    <v-avatar size="60" class="ma-3">
      <img :src="detallado.sexo === 'M' ? require(`../assets/MVitalyGorbachev.svg`) : require(`../assets/FVitalyGorbachev.svg`)">
    </v-avatar>

    <v-tabs
      background-color="teal lighten-5"    
      centered
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab>Dis</v-tab>
      <v-tab>Fis</v-tab>
      <v-tab>Informe Psicológico</v-tab>
      <v-tab>CV</v-tab>
      <v-tab>Archivos</v-tab>

      <v-tab-item><br>

      <p class="subtitle-2">1. Datos Preliminares</p>
      <v-card class="mx-12">
          <v-simple-table>
            <thead>
              <tr class="teal lighten-4">
                <th class="text-center">Nombre</th>
                <th class="text-center">Apellidos</th>
                <th class="text-center">Situación de Riesgo</th>
                <th class="text-center">Nacionalidad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{detallado.nombre}}</td>
                <td>{{detallado.apellido1}} {{detallado.apellido2}}</td>
                <td>Riesgo</td>
                <td>{{detallado.pais_nacimiento}}</td>
              </tr>
            </tbody>
            <thead>
              <tr class="teal lighten-4">
                <th class="text-center">Fecha Alta</th>
                <th class="text-center">Hora Alta</th>
                <th class="text-center">Sede Acogida</th>
                <th class="text-center">Fecha Nacimiento</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{detallado.fecha_alta}}</td>
                <td>17:32</td>
                <td>Limoneros 26</td>
                <td>{{detallado.fecha_nacimiento}}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
        <v-card class="my-7 mx-12">
          <v-simple-table>
            <thead>
              <tr class="teal lighten-4">
                <th class="text-center">Domicilio Residencia</th>
                <th class="text-center">Barrio</th>
                <th class="text-center">Domicilio Empradronamiento</th>
                <th class="text-center">Barrio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Moratines 20</td>
                <td>Embajadores</td>
                <td>Moratines 20</td>
                <td>Embajadores</td>
              </tr>
            </tbody>
            <thead>
              <tr class="teal lighten-4">
                <th class="text-center">Teléfono</th>
                <th class="text-center">Mail</th>
                <th class="text-center">Otro Teléfono</th>
                <th class="text-center">Familiar/Amigos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{detallado.telefono}}</td>
                <td>{{detallado.mail}}</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>

      <p class="subtitle-2">2. Datos de Derivación</p>
        <v-card class="mb-6 mx-12">
          <v-simple-table>
            <thead>
              <tr class="teal lighten-4">
                <th class="text-center">¿Cómo nos ha conocido?</th>
                <th class="text-center">Entidad/Persona que deriva</th>
                <th class="text-center">Tiene Ficha Abierta Serv. Soc.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{detallado.nombre}}</td>
                <td>{{detallado.apellido1}} {{detallado.apellido2}}</td>
                <td>Riesgo</td>
              </tr>
            </tbody>
            <thead>
              <tr class="teal lighten-4">
                <th class="text-center">Trabajador Social</th>
                <th class="text-center">Localidad Serv. Soc.</th>
                <th class="text-center">Ayudas recibidas de otras ONG</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{detallado.fecha_alta}}</td>
                <td>17:32</td>
                <td>Limoneros 26</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>

      <p class="subtitle-2">3. Situación Legal</p>
        <v-card class="mb-6 mx-12">
          <v-simple-table>
            <thead>
              <tr class="teal lighten-4">
                <th class="text-center">Permiso de Residencia</th>
                <th class="text-center">Permiso de Trabajo</th>
                <th class="text-center">Permiso de Estudio</th>
                <th class="text-center">Denegaciones</th>
                <th class="text-center">Expulsiones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sí</td>
                <td>Sí</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
            <thead>
              <tr class="teal lighten-4">
                <th class="text-center">Fecha Llegada España</th>
                <th class="text-center">Ciudad Natal</th>
                <th class="text-center">Antecedentes Penales</th>
                <th class="text-center">¿Ha cumplido condena alguna vez?</th>
                <th class="text-center">Valoración Legal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat tile>
          <v-card-text>FIS</v-card-text>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat tile>
          <v-card-text>Informe</v-card-text>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <div id="cv">
          <div class="mainDetails">
            <div id="headshot">
              <v-img src="@/assets/headshot.jpg" />
            </div>
            
            <div id="name">
              <h2>{{detallado.nombre}} {{detallado.apellido1}}</h2>
              <h3>Manualidades</h3>
            </div>
            
            <div id="contactDetails" class="quickFade delayFour">
              <ul>
                <li>Teléfono: {{detallado.telefono}}</li>
                <li>Email: {{detallado.mail}}</li>
                <li>Disponibilidad: Absoluta Movilidad Geofráfica</li>
              </ul>
            </div>
            <div class="clear"></div>
          </div>
          
          <div id="mainArea" class="quickFade delayFive">
            <section>
              <article>
                <div class="sectionTitle">
                  <h1>Personal</h1>
                </div>
                
                <div class="sectionContent">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies massa et erat luctus hendrerit. Curabitur non consequat enim. Vestibulum bibendum mattis dignissim. Proin id sapien quis libero interdum porttitor.</p>
                </div>
              </article>
              <div class="clear"></div>
            </section>
            
            
            <section>
              <div class="sectionTitle">
                <h1>Experiencia Laboral</h1>
              </div>
              
              <div class="sectionContent">
                <article>
                  <h2>Trabajo</h2>
                  <p class="subDetails">Fecha</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies massa et erat luctus hendrerit. Curabitur non consequat enim. Vestibulum bibendum mattis dignissim. Proin id sapien quis libero interdum porttitor.</p>
                </article>
                
                <article>
                  <h2>Trabajo</h2>
                  <p class="subDetails">Fecha</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies massa et erat luctus hendrerit. Curabitur non consequat enim. Vestibulum bibendum mattis dignissim. Proin id sapien quis libero interdum porttitor.</p>
                </article>
                
                <article>
                  <h2>Trabajo</h2>
                  <p class="subDetails">Fecha</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies massa et erat luctus hendrerit. Curabitur non consequat enim. Vestibulum bibendum mattis dignissim. Proin id sapien quis libero interdum porttitor.</p>
                </article>
              </div>
              <div class="clear"></div>
            </section>
            
            
            <section>
              <div class="sectionTitle">
                <h1>Skills</h1>
              </div>
              
              <div class="sectionContent">
                <ul class="keySkills">
                  <li>Skill</li>
                  <li>Skill</li>
                  <li>Skill</li>
                </ul>
              </div>
              <div class="clear"></div>
            </section>
            
            
            <section>
              <div class="sectionTitle">
                <h1>Educación</h1>
              </div>
              
              <div class="sectionContent">
                <article>
                  <h2>Carrera</h2>
                  <p class="subDetails">Institución</p>
                </article>
              </div>
              <div class="clear"></div>
            </section>

            <section>
              <div class="sectionTitle">
                <h1>Otros datos de interés</h1>
              </div>
              
              <div class="sectionContent">
                <article>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies massa et erat luctus hendrerit. Curabitur non consequat enim.</p>
                </article>
              </div>
              <div class="clear"></div>
            </section>
            
          </div>
        </div>
      </v-tab-item>
      <v-tab-item>
        <v-row class="ma-10">
          <v-col v-for="i of 7" :key="i">
        <v-card @click="hey" height="120" width="120">
          <v-card-subtitle primary-title>
            <v-icon>mdi-adobe-acrobat</v-icon>
            archivo{{i}}.pdf
          </v-card-subtitle>
        </v-card>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

  export default {
    data: () => ({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }),
    mounted() {
      this.getValueById()
    },
    computed: {
      ...mapState(['id_detalles', 'detallado'])
    },
    methods: {
      ...mapMutations(['getValueById']),
      hey() {
        console.log('archivos')
      }
    }
  }
</script>

<style scoped>

article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section {
display:block;
}


.clear {clear: both;}

p {
	font-size: 1em;
	line-height: 1.4em;
	margin-bottom: 20px;
	color: #444;
}

#cv {
	width: 80vw;
	background: #f3f3f3;
	margin: 30px auto;
}

.mainDetails {
	padding: 25px 35px;
	border-bottom: 2px solid #cf8a05;
	background: #ededed;
}

#name {
  color: #292521;
}

#mainArea {
	padding: 0 40px;
}

#headshot {
	width: 12.5%;
	float: left;
	margin-right: 30px;
}

#headshot img {
	width: 100%;
	height: auto;
	-webkit-border-radius: 50px;
	border-radius: 50px;
}

#name {
	float: left;
}

#contactDetails {
	float: right;
}

#contactDetails ul {
	list-style-type: none;
	font-size: 0.9em;
	margin-top: 2px;
}

#contactDetails ul li {
	margin-bottom: 3px;
	color: #444;
}

#contactDetails ul li a, a[href^=tel] {
	color: #444; 
	text-decoration: none;
	-webkit-transition: all .3s ease-in;
	-moz-transition: all .3s ease-in;
	-o-transition: all .3s ease-in;
	-ms-transition: all .3s ease-in;
	transition: all .3s ease-in;
}

#contactDetails ul li a:hover { 
	color: #cf8a05;
}


section {
	border-top: 1px solid #dedede;
	padding: 20px 0 0;
}

section:first-child {
	border-top: 0;
}

section:last-child {
	padding: 20px 0 10px;
}

.sectionTitle {
	float: left;
	width: 25%;
}

.sectionContent {
	float: right;
	width: 72.5%;
}

.sectionTitle h1 {
	font-family: 'Rokkitt', Helvetica, Arial, sans-serif;
	font-style: italic;
	font-size: 1.5em;
	color: #cf8a05;
}

.sectionContent h2 {
	font-family: 'Rokkitt', Helvetica, Arial, sans-serif;
	font-size: 1.5em;
	margin-bottom: -2px;
}

.subDetails {
	font-size: 0.8em;
	font-style: italic;
	margin-bottom: 3px;
}

.keySkills {
	list-style-type: none;
	-moz-column-count:3;
	-webkit-column-count:3;
	column-count:3;
	margin-bottom: 20px;
	font-size: 1em;
	color: #444;
}

.keySkills ul li {
	margin-bottom: 3px;
}

@media all and (min-width: 602px) and (max-width: 800px) {
	#headshot {
		display: none;
	}
	
	.keySkills {
	-moz-column-count:2;
	-webkit-column-count:2;
	column-count:2;
	}
}

@media all and (max-width: 601px) {
	#cv {
		width: 95%;
		margin: 10px auto;
		min-width: 280px;
	}
	
	#headshot {
		display: none;
	}
	
	#name, #contactDetails {
		float: none;
		width: 100%;
		text-align: center;
	}
	
	.sectionTitle, .sectionContent {
		float: none;
		width: 100%;
	}
	
	.sectionTitle {
		margin-left: -2px;
		font-size: 1.25em;
	}
	
	.keySkills {
		-moz-column-count:2;
		-webkit-column-count:2;
		column-count:2;
	}
}

@media all and (max-width: 480px) {
	.mainDetails {
		padding: 15px 15px;
	}
	
	section {
		padding: 15px 0 0;
	}
	
	#mainArea {
		padding: 0 25px;
	}

	
	.keySkills {
	-moz-column-count:1;
	-webkit-column-count:1;
	column-count:1;
	}
	
	#name h1 {
		line-height: .8em;
		margin-bottom: 4px;
	}
}

@media print {
    #cv {
        width: 100%;
    }
}

@-webkit-keyframes reset {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 0;
	}
}


@-moz-keyframes reset {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 0;
	}
}


@keyframes reset {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 0;
	}
}

</style>