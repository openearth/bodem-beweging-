<template>
  <!-- <v-dialog
   v-model="tabLocation"
    hide-overlay
    internal-activator
    persistent
    no-click-animation> -->

        <v-card flat tile  >
          <v-card-title>
            <span class="headline">Bodembeweging</span>
          </v-card-title>
          <v-card-text>This web-viewer provides essential geographical information for the subsidence processes in the Netherlands.
           </v-card-text>

            <v-sheet class="mt-5">
                <v-img
                class="spacing-playground"
                src="~@/assets/img/subs.jpg"
                >
                </v-img>
            </v-sheet>


        </v-card>
      <!-- </v-dialog> -->

</template>

<script>


export default {
//   data: () => ({
//     tabLocation:false
//   }),

//   created() {
//     const seen = window.location.hash;

//     if(seen == '#/intro') {
//       this.tabLocation = true;
//     }
//   },
};
</script>
<style>
</style>
