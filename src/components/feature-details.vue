<template>
  <v-card
    class="feature-details"
    min-width="400"
    elevation="7"
    hover
  >
    <v-toolbar dense flat>
      <v-toolbar-title>
        {{ feature.locationkey }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        @click="closeFeature"
        icon
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container>

      <div
        v-if="featureDetails.length"
        class="d-flex"
      >

        <!-- HTML Plots -->
        <template v-if="htmlPlots.length">
          <div

            v-for="plot in htmlPlots"
            :key="plot.url"
            class="feature-details__column"
          >
            <iframe
              class="feature-details__iframe"
              :src="plot.url"
            />Tip: Hover over the graph for more details.
          </div>
        </template>

      </div>
      <p v-else-if="!hasLoaded">Loading feature data...</p>
      <p v-else>No data available for this feature</p>

    </v-container>

  </v-card>
</template>

<script>

import featureDetailsRepo from '@/repo/feature-details.repo';
import { wpsDict, locDict } from "../../config/datalayers-config.js";

export default {
  props: {
    feature: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    featureDetails: [],
    hasLoaded: false,
    wpsDictionary: wpsDict,
    locidDict: locDict
  }),

  computed: {
    htmlPlots() {
      var result = this.featureDetails.filter(function (el) {

        return el.id &&
         el.name &&
         el.url;
        });

      return result;
    },
  },


  methods: {
    closeFeature() {
      this.$store.commit('mapbox/SET_ACTIVE_FEATURE', null);
    },

    async fetchDetails() {
      const { layerId } = this.feature;
      const locid = this.locidDict[layerId]
      const wpsIdentifier = this.wpsDictionary[layerId];
      try {
        this.featureDetails = await featureDetailsRepo.getReport(wpsIdentifier, this.feature.layer[locid]);
        this.hasLoaded = true;
      }
      catch(err) {
        console.error('Error getting feature XML: ', err);
      }
    }
  },

  created() {
    this.fetchDetails();
  },

  watch: {
    feature() {
      this.fetchDetails();
    }
  }
};

</script>

<style>
.v-card{

z-index: 2;
}
  .feature-details {
    position: absolute;
    bottom: 2rem;
    left: .5rem;

  }

  .feature-details__column img {
    display: block;

  }

  .feature-details__column:not(:last-child) {
    margin-right: 12px;
  }

  .feature-details__iframe {
    display:flex;
    border: 0;
    width: 810px;
    height: 520px;

  }
</style>
