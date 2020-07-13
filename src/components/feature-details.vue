<template>
  <v-card
    class="feature-details"
    min-width="400"
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
            />
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
    wpsDictionary: {
      'boreholes': 'bodembore_plots',
    }
  }),

  computed: {
    htmlPlots() {
      // console.log("html plots", this.featureDetails)
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
      const { locationkey, layerId } = this.feature;
      const wpsIdentifier = this.wpsDictionary[layerId];
      try {
        this.featureDetails = await featureDetailsRepo.getReport(wpsIdentifier, locationkey);
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
  .feature-details {
    position: absolute;
    bottom: 2rem;
    left: .5rem;
  }

  .feature-details__column img {
    display: block;
    max-width: 1000px;
    max-height: 800px;
  }

  .feature-details__column:not(:last-child) {
    margin-right: 12px;
  }

  .feature-details__iframe {
    display: block;
    border: 0;
    width: 400px;
    height: 530px;

  }
</style>
