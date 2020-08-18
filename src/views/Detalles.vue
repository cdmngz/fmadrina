<template>
  <div class="text-center">
    <v-avatar size="60" class="ma-3">
      <img :src="detallado.sexo === 'M' ? require(`../assets/MVitalyGorbachev.svg`) : require(`../assets/FVitalyGorbachev.svg`)">
    </v-avatar>

    <v-tabs
      background-color="teal lighten-4"    
      centered
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab>Dis</v-tab>
      <v-tab>Fis</v-tab>
      <v-tab>Informe Psicológico</v-tab>
      <v-tab>CV</v-tab>

      <v-tab-item>
          <h4 class="ma-3">DIS</h4>
          <v-row cols="12">
            <v-col class="grey white--text">Nombre</v-col>
            <v-col class="grey white--text">Apellidos</v-col>
            <v-col class="grey white--text">Situación de Riesgo</v-col>
            <v-col class="grey white--text">Nacionalidad</v-col>
          </v-row>
          <v-row cols="12">
            <v-col>{{detallado.nombre}}</v-col>
            <v-col>{{detallado.apellido1}} {{detallado.apellido2}}</v-col>
            <v-col></v-col>
            <v-col>{{detallado.paisNac}}</v-col>
          </v-row>
          <v-row cols="12">
            <v-col class="grey white--text">Fecha Alta</v-col>
            <v-col class="grey white--text">Hora Alta</v-col>
            <v-col class="grey white--text">Fecha de Nacimiento</v-col>
            <v-col class="grey white--text">Sede Acogida</v-col>
          </v-row>
          <v-row cols="12">
            <v-col>{{detallado.altaFund}}</v-col>
            <v-col>17:32</v-col>
            <v-col>{{detallado.fechaNac}}</v-col>
            <v-col>Limoneros 26</v-col>
          </v-row>
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
      ...mapMutations(['getValueById'])
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