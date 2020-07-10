<template>
  <div>
    <v-card-title>
      {{tabname}}
    </v-card-title>
      <v-card-text>The current section provides some static data related to subsidence.
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
      dense
      :items="items"
      v-model="visibleLayers"
    ></v-treeview>
    </v-sheet>

  </div>
</template>

<script>
import arrayDiff from '@/lib/get-arrays-difference';
import { formatIdToLabel } from '@/lib/format-id-to-label';
import buildWmsLayer from '@/lib/build-wms-layer';
import { tab3_name } from "../../config/datalayers-config.js";

export default {
  data: () => ({
    visibleLayers: [],
    items: [],
  }),
  computed:{
    tabname() {
      return tab3_name;
  }},

  methods: {
    addLayer(layer) {
      const wmsLayer = buildWmsLayer(layer);
      this.$store.commit('mapbox/ADD_RASTER_LAYER', wmsLayer);

    },

    removeLayer(layerId) {
      this.$store.commit('mapbox/REMOVE_RASTER_LAYER', layerId);

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
        this.$store.commit('mapbox/SET_LEGEND_LAYER', null);
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
        this.$store.commit('mapbox/SET_LEGEND_LAYER', layerToAdd.layer);
      }
    }
  }
};
</script>
