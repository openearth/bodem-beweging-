<template>
  <div>
    <v-card-title>
      {{tabname}}
    </v-card-title>
    <v-card-text>
      This section provides timeseries data related to the subsurface.
    </v-card-text>
    <v-sheet class="pa-5">
    </v-sheet>
    <v-sheet class="pa-5">
      <v-btn
        @click="toggleDrawLine"
        :disabled="isDrawing"
        class="mr-4"
      >
        {{ hasFullyDrawnLine ? 'Re-d' : 'D' }}raw point
      </v-btn>
      <v-btn
        @click="getSection"
        :disabled="!hasFullyDrawnLine"
      >
        Get plot
      </v-btn>
      <!-- <pre>{{ linestring }}</pre> -->
    </v-sheet>


  </div>
</template>

<script>
import arrayDiff from '@/lib/get-arrays-difference';
import formatIdToLabel from '@/lib/format-id-to-label';
import buildWmsLayer from '@/lib/build-wms-layer';
import { tab3_name, items_tab2 } from "../../config/datalayers-config.js";

const DELTARES_BLUE = '#008fc5';
const SOURCE_NAME = 'draw-geojson';
const POINTS_LAYER_ID = 'draw-points';
const LINES_LAYER_ID = 'draw-lines';
const MAX_POINTS = 2;

export default {
  data: () => ({
    // items: items_tab2,
    visibleLayers: [],
    isDrawing: false,
    geojson: {
      'type': 'FeatureCollection',
      'features': []
    },
    added_point: {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': []
      }
    },

  }),

  computed: {
    tabname() {
      return tab3_name;
    },

    hasFullyDrawnLine() {
      return this.geojson.features.length == MAX_POINTS;
    }
    // rasterLayers() {
    //   return this.$store.getters['mapbox/rasterLayers'];
    // },
    //  legendLayer() {
    //   return this.$store.getters['mapbox/legendLayer'];
    // }
  },

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
    },

    async getSection() {
      // console.log('WPS request');
      try {
        this.$store.commit("mapbox/SET_REQUEST_DATA",this.added_point.geometry.coordinates);
      }
      catch(err) {
        console.error('Error getting transect: ', err);
      }
    },
buildLine() {
      this.added_point.geometry.coordinates = this.geojson.features
        .map(point => point.geometry.coordinates);
      // console.log('buildline',this.added_point);
      this.geojson.features.push(this.added_point);
    },

    clickFn_draw(e) {
      const map = this.$root.map;
      const features = map.queryRenderedFeatures(e.point, { layers: [POINTS_LAYER_ID] });

      // Remove the linestring from the group
      // So we can redraw it based on the points collection
      // (linestring is always the last element)
      if(this.geojson.features.length > 1) this.geojson.features.pop();

      // If a feature was clicked, remove it from the map
      if(features.length) {
        const id = features[0].properties.id;
        this.geojson.features = this.geojson.features.filter(point =>
          point.properties.id !== id
        );
      // Otherwise we add a point
      }
      else {
        const point = {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              e.lngLat.lng,
              e.lngLat.lat
            ]
          },
          "properties": {
            "id": String(new Date().getTime())
          }
        };
        this.geojson.features.push(point);
      }

      // Build the line
      if(this.geojson.features.length > 0) {
        this.buildLine();
      }

      map.getSource(SOURCE_NAME).setData(this.geojson);

      // If we reach the maximum amount of points, stop drawing
      if(this.hasFullyDrawnLine) {
        this.cleanListeners_draw();
        this.isDrawing = false;
        this.initAdjustLine();
      }
    },

    mouseMoveFn_draw(e) {
      const map = this.$root.map;
      const features = map.queryRenderedFeatures(e.point, { layers: [POINTS_LAYER_ID] });
      // UI indicator for clicking/hovering a point on the map
      map.getCanvas().style.cursor = features.length ? 'pointer' : 'crosshair';
    },

    mouseDragFn_adjust(e) {
      const map = this.$root.map;
      const coords = e.lngLat;

      // Set a UI indicator for dragging.
      map.getCanvas().style.cursor = 'grabbing';

      // Remove line from stored features
      this.geojson.features.pop();

      // Update the point feature in `geojson` coordinates
      this.geojson.features
        .find(feature => feature.properties.id === this.pointToDragId)
        .geometry.coordinates = [ coords.lng, coords.lat ]
      ;

      // Build the line
      this.buildLine();

      // Re-draw the features on the map
      map.getSource(SOURCE_NAME).setData(this.geojson);
    },

    mouseDownFn_adjust(e) {
        e.preventDefault();
        const map = this.$root.map;
        map.getCanvas().style.cursor = 'grab';

        this.pointToDragId = e.features[0].properties.id;
        map.on('mousemove', this.mouseDragFn_adjust);
        map.once('mouseup', this.mouseUpFn_adjust);
    },

    mouseUpFn_adjust() {
      const map = this.$root.map;

      map.getCanvas().style.cursor = '';
      map.off('mousemove', this.mouseDragFn_adjust);
      this.pointToDragId = null;
    },

    mouseEnterFn_adjust() {
      const map = this.$root.map;
      map.getCanvas().style.cursor = 'pointer';
    },

    mouseLeaveFn_adjust() {
      const map = this.$root.map;
      map.getCanvas().style.cursor = '';
    },

    toggleDrawLine() {
      if(!this.isDrawing) {
        this.initDrawLine();
        this.isDrawing = true;
      }
    },

    initDrawLine() {
      const map = this.$root.map;

      this.cleanListeners_adjust();
      this.removeDrawing();

      map.addSource(SOURCE_NAME, {
        'type': 'geojson',
        'data': this.geojson
      });

      map.addLayer({
        id: POINTS_LAYER_ID,
        type: 'circle',
        source: SOURCE_NAME,
        paint: {
          'circle-radius': 6,
          'circle-color': DELTARES_BLUE
        },
        filter: ['in', '$type', 'Point']
      });

      map.addLayer({
        id: LINES_LAYER_ID,
        type: 'line',
        source: SOURCE_NAME,
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': DELTARES_BLUE,
          'line-width': 2.5
        },
        filter: ['in', '$type', 'Point']
      });

      map.on('click', this.clickFn_draw);
      map.on('mousemove', this.mouseMoveFn_draw);
    },

    initAdjustLine() {
      const map = this.$root.map;
      map.on('mouseenter', POINTS_LAYER_ID, this.mouseEnterFn_adjust);
      map.on('mouseleave', POINTS_LAYER_ID, this.mouseLeaveFn_adjust);
      map.on('mousedown', POINTS_LAYER_ID, this.mouseDownFn_adjust);
    },

    cleanListeners_draw() {
      const map = this.$root.map;
      map.off('click', this.clickFn_draw);
      map.off('mousemove', this.mouseMoveFn_draw);
      map.getCanvas().style.cursor = '';
    },

    cleanListeners_adjust() {
      const map = this.$root.map;
      map.off('mouseenter', POINTS_LAYER_ID, this.mouseEnterFn_adjust);
      map.off('mouseleave', POINTS_LAYER_ID, this.mouseLeaveFn_adjust);
      map.off('mousedown', POINTS_LAYER_ID, this.mouseDownFn_adjust);
    },

    removeDrawing() {
      this.geojson.features = [];
      this.added_point.geometry.coordinates = [];

      const map = this.$root.map;
      if(map.getLayer(POINTS_LAYER_ID)) map.removeLayer(POINTS_LAYER_ID);
      if(map.getLayer(LINES_LAYER_ID)) map.removeLayer(LINES_LAYER_ID);
      if(map.getSource(SOURCE_NAME)) map.removeSource(SOURCE_NAME);
    },

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

  },

  destroyed() {
  this.cleanListeners_draw();
  this.cleanListeners_adjust();
  this.removeDrawing();
  },
};
</script>
