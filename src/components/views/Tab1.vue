<template>
  <!-- <v-dialog
   v-model="tabLocation"
    hide-overlay
    internal-activator
    persistent
    no-click-animation> -->

        <v-card flat tile  >
               <v-card-title>
                {{tabname}}
              </v-card-title>
          <v-card-text>Deze web-viewer geeft toegang tot informatie/data die betrekking heeft op bodemdaling in Gouda.
                        Het gaat om datasets die zijn gebruikt, of kunnen worden gebruikt, in bodemdalingsstudies.
                        De viewer is een pilot voor het ontwerp van een veel uitgebreider bodemdalingsinformatiesysteem voor
                        toepassing op regionale en uiteindelijk nationale schaal.
           </v-card-text>

            <v-sheet class="mt-4">
                <v-img
                  class="spacing-playground"
                  src="~@/assets/img/subsidence_pic.jpg"
                  >
                </v-img>
              <v-card-text>Foto: Door bodemdaling in Gouda zakken kades en ondiep gefundeerde woningen ten opzichte van het waterpeil in de grachten.
                 Ingrijpen is noodzakelijk, maar verlagen van het waterpeil draagt bij aan bodemdaling en mag het grondwaterpeil niet verlagen tot onder
                 de koppen van houten funderingen.

            </v-card-text>
            </v-sheet>


        </v-card>
      <!-- </v-dialog> -->

</template>

<script>
import { tab1_name } from "../../../config/datalayers-config";

export default {
  computed:{
    tabname() {
      return tab1_name;
  }},
};
</script>
<style>
</style>
