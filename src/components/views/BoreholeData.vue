<template>
  <div>
    <v-card-title>
      {{tabname}}
    </v-card-title>
    <v-card-text>
      This section provides subusrface information based on boreholes.
    </v-card-text>
    <v-sheet class="pa-5">
    <v-treeview
      selectable
      rounded
      hoverable
      transition
      on-icon='mdi-checkbox-multiple-marked-circle'
      off-icon = 'mdi-circle-outline'
      color="blue"
      :items="items"
      v-model="visibleLayers"
    ></v-treeview>
    </v-sheet>
  </div>
</template>

<script>
import arrayDiff from '@/lib/get-arrays-difference';
import formatIdToLabel from '@/lib/format-id-to-label';
import buildWfsLayer from '@/lib/build-wfs-layer';
import { tab1_name, items_tab1 } from "../../config/datalayers-config.js";

export default {
  data: () => ({
    items: items_tab1,
    visibleLayers: [],
  }),

  computed: {
    tabname() {
      return tab1_name;
    },
    // rasterLayers() {
    //   return this.$store.getters['mapbox/rasterLayers'];
    // },
    //  legendLayer() {
    //   return this.$store.getters['mapbox/legendLayer'];
    // }
  },

  methods: {
    async addLayer(layer) {
      const wfsLayer = buildWfsLayer(layer);
      this.$store.commit('mapbox/ADD_GEOJSON_LAYER', wfsLayer);
      // this.$store.commit('mapbox/ADD_RASTER_LAYER', wmsLayer);
    },

    removeLayer(layerId) {
      // this.$store.commit('mapbox/REMOVE_RASTER_LAYER', layerId);
      this.$store.commit('mapbox/REMOVE_GEOJSON_LAYER', layerId);

    },

    formatIdToLabel(id) {
      return formatIdToLabel(id);
    }
  },

  watch: {
    visibleLayers(newArray, oldArray) {
      const removeLayerId = newArray.length < oldArray.length;
      if(removeLayerId) {
        const layerToRemoveId = arrayDiff(oldArray, newArray)[0];
        this.removeLayer(layerToRemoveId);
        // this.$store.commit('mapbox/SET_LEGEND_LAYER', null);
      }
      else {
        const layerToAddId = arrayDiff(newArray, oldArray)[0];
        var layerToAdd;
        for (var i=0; i < this.items.length; i++) {
          var child = this.items[i].children;
          for (var m=0; m < child.length; m++) {
            if (child[m].id == layerToAddId){
               layerToAdd = child[m];
            }
          }
        }
        // const layerToAdd = layers_to_show.find(({ id }) => id === layerToAddId);
        this.addLayer(layerToAdd);
        // this.$store.commit('mapbox/SET_LEGEND_LAYER', layerToAdd.layer);
      }
    }

  }
};
</script>
