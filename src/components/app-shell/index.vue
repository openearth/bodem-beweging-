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
          {{intro}}
        </v-tab>
        <v-tab :to="{ name: 'Borehole data' }">
          {{first_tab}}
        </v-tab>
        <v-tab :to="{ name: 'Groundwater data' }">
          {{second_tab}}
        </v-tab>
        <v-tab :to="{ name: 'Timeseries data' }">
          {{third_tab}}
        </v-tab>
        <v-tab :to="{ name: 'Static data' }">
          {{fourth_tab}}
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-content>
      <risk-legend
        v-if="legendLayer"
        :legendLayer="legendLayer"
      />
      <mapbox-map />
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
// import json_config from '@/config'
import Sidebar from './sidebar';
import MapboxMap from '@/components/mapbox-map';
// import WelcomeDialog from './welcome-dialog';
import FeatureDetails from '@/components/feature-details';
import requestData from '@/components/transect-popup';
import RiskLegend from '@/components/legend';
import { app_name,intro_tab,tab1_name,tab2_name, tab3_name, tab4_name } from "../../../config/datalayers-config.js";

export default {
  data: () => ({
    selectedTab:false
  }),


  components: {
    Sidebar,
    MapboxMap,
    // WelcomeDialog,
    FeatureDetails,
    requestData,
    RiskLegend

  },

  computed: {
    appname () {
      return app_name;
    },
    intro () {
      return intro_tab;
    },
    first_tab () {
      return tab1_name;
    },
    second_tab () {
      return tab2_name;
    },
    third_tab () {
      return tab3_name;
    },
    fourth_tab () {
      return tab4_name;
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
