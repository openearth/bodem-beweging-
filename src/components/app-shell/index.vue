<template>
  <v-app>
    <sidebar />

    <v-app-bar
      class="app-header"
      app
      color="primary"
      dark
    >
      <v-toolbar-title>
        {{appname}}
      </v-toolbar-title>

      <!-- <welcome-dialog /> -->

      <v-tabs
        background-color="primary"
        dark
        right
        style="width: auto;"
        v-model="selectedTab"
      >
        <v-tab :to="{ name: 'intro' }" >
          {{tab1}}
        </v-tab>
        <v-tab :to="{ name: 'inzichten' }">
          {{tab2}}
        </v-tab>
        <v-tab :to="{ name: 'data' }">
          {{tab3}}
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-content>
      <risk-legend
        v-if="legendLayer"
        :legendLayer="legendLayer"
      />
      <mapbox-map />
      <!-- <mapcontainer/> -->
      <feature-details
        v-if="!!activeFeature"
        :feature="activeFeature"
      />
      <requestData
        v-if="!!requestData"
        :feature="requestData"
      />
    </v-content>



  </v-app>
</template>

<script>
import Sidebar from './sidebar';
import MapboxMap from '@/components/mapbox-map';
// import mapcontainer from  '@/components/mapbox-map/map-slider'
// import WelcomeDialog from './welcome-dialog';
import FeatureDetails from '@/components/feature-details';
import requestData from '@/components/transect-popup';
import RiskLegend from '@/components/legend';
import { app_name,tab1_name,tab2_name, tab3_name } from "../../../config/datalayers-config.js";

export default {
  data: () => ({
    selectedTab:false
  }),


  components: {
    Sidebar,
    MapboxMap,
    FeatureDetails,
    requestData,
    RiskLegend,
    // WelcomeDialog,
    // mapcontainer

  },

  computed: {
    appname () {
      return app_name;
    },
    tab1 () {
      return tab1_name;
    },
    tab2 () {
      return tab2_name;
    },
    tab3 () {
      return tab3_name;
    },
    activeFeature() {
      return this.$store.getters['mapbox/activeFeature'];
    },
    requestData() {
      return this.$store.getters['mapbox/requestData'];
    },
     legendLayer() {
      return this.$store.getters['mapbox/legendLayer'];
    }
  },

  mounted () {
    this.selectedTab = "first";
  }
};
</script>

<style src="@/assets/css/index.css"></style>
