<template>
<div id="comparison-container" class="comparison-container">
  <div id="before" class="map"></div>
  <div id="after" class="map"></div>


<!-- <map-control-baselayer
  :layers="mapBaseLayers"
  position="bottom-right"
/> -->

Clickable GeoJSON layers -->
  <map-layer
  v-for="layer in geoJsonLayers"
  :key="layer.id"
  :options="layer"
  :clickable="true"
  @click="layerClick"
/>

<!-- Raster layers -->
<map-layer
  v-for="layer in rasterLayers"
  :key="layer.id"
  :options="layer"
/>
</div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import MapboxCompare from 'mapbox-gl-compare';
import { MAP_CENTER, MAP_ZOOM, MAP_BASELAYER_DEFAULT, MAP_BASELAYERS} from '@/lib/constants';
import MapLayer from './map-layer';
// import MapControlBaselayer from './map-control-baselayer';
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

export default {

  components: {
  MapLayer,
  // MapControlBaselayer,
  // MapControlFitbounds,
  },
  data() {
    return {
      accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      style: MAP_BASELAYER_DEFAULT.style
    };
  },

  computed: {
    mapBaseLayers() {
      return MAP_BASELAYERS;
    },
    geoJsonLayers() {
      return this.$store.getters['mapbox/geoJsonLayers'];
    },
    rasterLayers() {
      return this.$store.getters['mapbox/rasterLayers'];
    }
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;

    var beforeMap = new mapboxgl.Map({
      container: "before",
      style: "mapbox://styles/mapbox/dark-v10",
      center: this.center,
      zoom: this.zoom,
      marker:true
    });

      var afterMap = new mapboxgl.Map({
      container: "after",
      style: "mapbox://styles/mapbox/dark-v10",
      center: this.center,
      zoom: this.zoom,
      marker:true
    });

    window.compare = new MapboxCompare(
    beforeMap,
    afterMap,
    '#comparison-container'
);

    const nav = new mapboxgl.NavigationControl();

    // geocoder control
    let geocoder = new MapboxGeocoder({
      accessToken:this.accessToken,
      placeholder: 'SEARCH PLACE',
      mapboxgl: mapboxgl,
      });
    geocoder.on("result", function (ev) {
      // console.log(ev.result);
    });
    afterMap.addControl(geocoder, "top-right");
    afterMap.addControl(nav, "top-right");

    console.log('where is map', this.$root)

    // afterMap.addControl(baselayerswitch, "top-right");
  },

  methods : {
      layerClick(e) {
      var features = this.$root.map.queryRenderedFeatures(e.point, { layers: [e.features[0].layer.source] });
      var feature = features[0];
      const layerId = feature.layer.id;
      // const { locationkey } = feature.properties;
      var layer = feature.properties;
      this.$store.commit('mapbox/SET_ACTIVE_FEATURE', {
        layerId,
        layer
      });
    }
  }
};
</script>

<style scoped lang='scss'>
@import /* webpackPrefetch: true */ '~mapbox-gl/dist/mapbox-gl.css';
@import /* webpackPrefetch: true */ '~mapbox-gl-compare/dist/mapbox-gl-compare.css';
.spacer{
  margin-top: 4vh;
}
.maps{
    position: relative;
    overflow: hidden;
    margin-top: 10px;
    &:after{
      content: "";
      display: block;
      padding-bottom: 100%;
    }
}
.map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
}
#year-text {
  display: flex;
  align-items: center;
  .before-year {
    flex: 1;
    text-align: center;
  }
  .after-year {
    flex: 1;
    text-align: center;
  }
}
.mapcaption{
  margin: 0 auto;
  line-height: 1.4em;
  max-width: 660px;
}
</style>
